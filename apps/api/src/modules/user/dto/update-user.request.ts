import { IsBoolean, IsEmail, IsNotEmpty, IsString, Length } from 'class-validator'

export class UpdateUserRequest {
  @IsString()
  @IsNotEmpty()
  @Length(3, 32)
  name: string

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string

  @IsBoolean()
  isTwoFactorEnabled: boolean
}
