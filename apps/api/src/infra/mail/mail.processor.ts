import { Processor, WorkerHost } from '@nestjs/bullmq'
import { Logger } from '@nestjs/common'
import { Job } from 'bullmq'

import { MAIL_QUEUE_NAME } from '@/common/constants'

import { MailService } from './mail.service'
import { MailJob } from './types'

@Processor(MAIL_QUEUE_NAME)
export class MailProcessor extends WorkerHost {
  private readonly logger = new Logger(MailProcessor.name)

  constructor(private readonly mailService: MailService) {
    super()
  }

  async process(job: Job<MailJob>) {
    console.log(`Processing mail job ${job.id} for ${job.data.to}`)
    try {
      const result = await this.mailService.sendMail(
        job.data.to,
        job.data.subject,
        job.data.html,
      )

      this.logger.log(`Mail sent successfully to ${job.data.to}`)

      return result
    } catch (error) {
      this.logger.error(`Failed to send mail to ${job.data.to}:`, error)

      throw error
    }
  }
}
