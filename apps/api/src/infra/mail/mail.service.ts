import { MailerService } from '@nestjs-modules/mailer'
import { InjectQueue } from '@nestjs/bullmq'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { render } from '@react-email/components'
import { Queue } from 'bullmq'

import { MAIL_QUEUE_NAME, MailJobs } from '@/common/constants'

import {
  EmailVerificationTemplate,
  ResetPasswordTemplate,
  TwoFactorAuthTemplate,
} from './templates'

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,

    @InjectQueue(MAIL_QUEUE_NAME) private readonly mailQueue: Queue,
  ) {}

  async sendConfirmationEmail(email: string, token: string) {
    const domain = this.configService.getOrThrow<string>('ALLOWED_ORIGIN')
    const html = await render(EmailVerificationTemplate({ domain, token }))

    return this.mailQueue.add(MailJobs.SEND_CONFIRMATION_EMAIL, {
      to: email,
      subject: 'Подтверждение почты',
      html,
    })
  }

  async sendPasswordResetEmail(email: string, token: string) {
    const domain = this.configService.getOrThrow<string>('ALLOWED_ORIGIN')
    const html = await render(ResetPasswordTemplate({ domain, token }))

    return this.mailQueue.add(MailJobs.SEND_PASSWORD_RESET_EMAIL, {
      to: email,
      subject: 'Сброс пароля',
      html,
    })
  }

  async sendTwoFactorTokenEmail(email: string, token: string) {
    const html = await render(TwoFactorAuthTemplate({ token }))

    return this.mailQueue.add(MailJobs.SEND_TWO_FACTOR_TOKEN_EMAIL, {
      to: email,
      subject: 'Двухфакторная аутентификация',
      html,
    })
  }

  public async sendMail(email: string, subject: string, html: string) {
    return this.mailerService.sendMail({
      to: email,
      subject,
      html,
    })
  }
}
