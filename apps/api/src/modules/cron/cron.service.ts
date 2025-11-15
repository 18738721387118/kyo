import { Injectable } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'

import { toMs } from '@/common/utils'
import { PrismaService } from '@/infra/prisma/prisma.service'

@Injectable()
export class CronService {
  constructor(private readonly prismaService: PrismaService) {}

  @Cron(CronExpression.EVERY_DAY_AT_NOON)
  async deleteExpiredTokens() {
    await this.prismaService.token.deleteMany({
      where: {
        expiresIn: {
          lt: new Date(Date.now() - toMs('1d')),
        },
      },
    })
  }
}
