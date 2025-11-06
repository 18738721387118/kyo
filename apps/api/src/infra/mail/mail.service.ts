import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { render } from '@react-email/components'

import { EmailVerificationTemplate, ResetPasswordTemplate } from './templates'

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendConfirmationEmail(email: string, token: string) {
    const domain = this.configService.getOrThrow<string>('ALLOWED_ORIGIN')
    const html = await render(EmailVerificationTemplate({ domain, token }))

    return this.sendEmail(email, 'Подтверждение почты', html)
  }

  async sendPasswordResetEmail(email: string, token: string) {
    const domain = this.configService.getOrThrow<string>('ALLOWED_ORIGIN')
    const html = await render(ResetPasswordTemplate({ domain, token }))

    return this.sendEmail(email, 'Сброс пароля', html)
  }

  private async sendEmail(email: string, subject: string, html: string) {
    return this.mailerService.sendMail({
      to: email,
      subject,
      html,
    })
  }
}
