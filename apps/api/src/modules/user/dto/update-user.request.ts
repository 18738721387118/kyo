import { PartialType } from '@nestjs/swagger'
import { IsBoolean, IsEmail, IsNotEmpty, IsString, Length } from 'class-validator'

import { CreateUserRequest } from './create-user.request'

export class UpdateUserRequest extends PartialType(CreateUserRequest) {}
