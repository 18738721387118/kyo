import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator'

export class LoginRequest {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  @Length(6, 128)
  password: string

  @IsString()
  @IsOptional()
  code?: string
}
