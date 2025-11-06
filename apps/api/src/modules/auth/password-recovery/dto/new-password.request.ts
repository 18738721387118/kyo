import { IsNotEmpty, IsString, Length } from 'class-validator'

export class NewPasswordRequest {
  @IsString()
  @Length(6, 128)
  @IsNotEmpty()
  password: string
}
