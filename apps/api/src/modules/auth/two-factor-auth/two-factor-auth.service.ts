import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TokenType } from 'prisma/generated/client'

import { toMs } from '@/common/utils'
import { MailService } from '@/infra/mail/mail.service'
import { PrismaService } from '@/infra/prisma/prisma.service'

@Injectable()
export class TwoFactorAuthService {
  private readonly TWO_FACTOR_TOKEN_TTL: string

  constructor(
    private readonly prismaService: PrismaService,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) {
    this.TWO_FACTOR_TOKEN_TTL =
      this.configService.getOrThrow<string>('TWO_FACTOR_TOKEN_TTL')
  }

  async validateTwoFactorToken(email: string, code: string) {
    const exists = await this.prismaService.token.findFirst({
      where: {
        email,
        type: TokenType.TWO_FACTOR,
      },
    })

    if (!exists) {
      throw new NotFoundException('Two factor token not found')
    }

    if (exists.token !== code) {
      throw new BadRequestException('Invalid code')
    }

    const hasExpired = new Date(exists.expiresIn) < new Date()

    if (hasExpired) {
      throw new BadRequestException('Two factor token expired')
    }

    await this.prismaService.token.delete({
      where: { id: exists.id, type: TokenType.TWO_FACTOR },
    })

    return true
  }

  async sendTwoFactorToken(email: string) {
    const twoFactorToken = await this.generateTwoFactorToken(email)

    await this.mailService.sendTwoFactorTokenEmail(
      twoFactorToken.email,
      twoFactorToken.token,
    )

    return true
  }

  private async generateTwoFactorToken(email: string) {
    const token = Math.floor(100000 + Math.random() * (1000000 - 100000)).toString()
    const expiresIn = new Date(Date.now() + toMs(this.TWO_FACTOR_TOKEN_TTL))

    const exists = await this.prismaService.token.findFirst({
      where: {
        email,
        type: TokenType.TWO_FACTOR,
      },
    })

    if (exists) {
      await this.prismaService.token.delete({ where: { id: exists.id } })
    }

    const twoFactorToken = await this.prismaService.token.create({
      data: {
        email,
        token,
        type: TokenType.VERIFICATION,
        expiresIn,
      },
    })

    return twoFactorToken
  }
}
