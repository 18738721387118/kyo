import { forwardRef, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { GoogleRecaptchaModule } from '@nestlab/google-recaptcha'

import { getJwtConfig, getOAuthConfig, getRecaptchaConfig } from '@/config'

import { UserService } from '../user/user.service'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { EmailConfirmationModule } from './email-confirmation/email-confirmation.module'
import { OAuthModule } from './oauth/oauth.module'
import { JwtStrategy } from './strategies/jwt.strategy'
import { TwoFactorAuthModule } from './two-factor-auth/two-factor-auth.module'
import { TwoFactorAuthService } from './two-factor-auth/two-factor-auth.service'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
    GoogleRecaptchaModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getRecaptchaConfig,
    }),
    OAuthModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getOAuthConfig,
    }),
    forwardRef(() => EmailConfirmationModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UserService, TwoFactorAuthService],
  exports: [AuthService],
})
export class AuthModule {}
