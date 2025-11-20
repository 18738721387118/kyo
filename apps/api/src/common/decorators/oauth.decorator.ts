import { applyDecorators, UseGuards } from '@nestjs/common'

import { OAuthGuard } from '@/modules/auth/guards'

export const OAuth = () => {
  return applyDecorators(UseGuards(OAuthGuard))
}
