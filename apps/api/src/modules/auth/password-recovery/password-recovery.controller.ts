import { Body, Controller, HttpCode, HttpStatus, Param, Post, Query } from '@nestjs/common'
import { Recaptcha } from '@nestlab/google-recaptcha'

import { NewPasswordRequest, ResetPasswordRequest } from './dto'
import { PasswordRecoveryService } from './password-recovery.service'

@Controller('auth/password-recovery')
export class PasswordRecoveryController {
  constructor(private readonly passwordRecoveryService: PasswordRecoveryService) {}

  @Recaptcha()
  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() dto: ResetPasswordRequest) {
    return this.passwordRecoveryService.resetPassword(dto)
  }

  @Recaptcha()
  @Post('new-password/:token')
  @HttpCode(HttpStatus.OK)
  async newPassword(@Body() dto: NewPasswordRequest, @Param('token') token: string) {
    return this.passwordRecoveryService.newPassword(dto, token)
  }
}
