import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { IS_DEV_ENV } from './common/utils'
import { MailModule } from './infra/mail/mail.module'
import { PrismaModule } from './infra/prisma/prisma.module'
import { AuthModule } from './modules/auth/auth.module'
import { EmailConfirmationModule } from './modules/auth/email-confirmation/email-confirmation.module'
import { OAuthModule } from './modules/auth/oauth/oauth.module'
import { PasswordRecoveryModule } from './modules/auth/password-recovery/password-recovery.module'
import { TwoFactorAuthModule } from './modules/auth/two-factor-auth/two-factor-auth.module'
import { UserModule } from './modules/user/user.module'

@Module({
  imports: [
    // Config
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: !IS_DEV_ENV,
      expandVariables: true,
    }),

    // Infra
    PrismaModule,
    MailModule,

    // Modules
    AuthModule,
    UserModule,
    PasswordRecoveryModule,
    OAuthModule,
    EmailConfirmationModule,
    TwoFactorAuthModule,
  ],
})
export class AppModule {}
