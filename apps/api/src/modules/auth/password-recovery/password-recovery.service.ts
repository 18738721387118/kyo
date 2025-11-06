import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TokenType } from 'prisma/generated/enums'
import { v4 as uuidv4 } from 'uuid'

import { toMs } from '@/common/utils'
import { MailService } from '@/infra/mail/mail.service'
import { PrismaService } from '@/infra/prisma/prisma.service'
import { UserService } from '@/modules/user/user.service'

import { NewPasswordRequest, ResetPasswordRequest } from './dto'

@Injectable()
export class PasswordRecoveryService {
  private readonly PASSWORD_RESET_TOKEN_TTL: string

  constructor(
    private readonly prismaService: PrismaService,
    private readonly mailService: MailService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    this.PASSWORD_RESET_TOKEN_TTL = this.configService.getOrThrow<string>(
      'PASSWORD_RESET_TOKEN_TTL',
    )
  }

  async resetPassword(dto: ResetPasswordRequest) {
    const existingUser = await this.userService.findByEmail(dto.email)

    if (!existingUser) {
      throw new NotFoundException('User not found')
    }

    const passwordResetToken = await this.generatePasswordResetToken(existingUser.email)

    await this.mailService.sendPasswordResetEmail(
      existingUser.email,
      passwordResetToken.token,
    )
  }

  async newPassword(dto: NewPasswordRequest, token: string) {
    const existingToken = await this.prismaService.token.findFirst({
      where: {
        token,
        type: TokenType.PASSWORD_RESET,
      },
    })

    if (!existingToken) {
      throw new NotFoundException('Token not found')
    }

    const hasExpired = new Date(existingToken.expiresIn) < new Date()

    if (hasExpired) {
      throw new BadRequestException('Token expired')
    }

    const existingUser = await this.userService.findByEmail(existingToken.email)

    if (!existingUser) {
      throw new NotFoundException('User not found')
    }

    await this.userService.update(existingUser.id, { password: dto.password })

    await this.prismaService.token.delete({
      where: { id: existingToken.id, type: TokenType.PASSWORD_RESET },
    })

    return true
  }

  private async generatePasswordResetToken(email: string) {
    const token = uuidv4()
    const expiresIn = new Date(Date.now() + toMs(this.PASSWORD_RESET_TOKEN_TTL))

    const existingToken = await this.prismaService.token.findFirst({
      where: {
        email,
        type: TokenType.VERIFICATION,
      },
    })

    if (existingToken) {
      await this.prismaService.token.delete({ where: { id: existingToken.id } })
    }

    const passwordResetToken = await this.prismaService.token.create({
      data: {
        email,
        token,
        type: TokenType.PASSWORD_RESET,
        expiresIn,
      },
    })

    return passwordResetToken
  }
}
