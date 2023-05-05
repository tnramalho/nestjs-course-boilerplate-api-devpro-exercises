import { UserDto } from './user.dto';
import {
  USER_NAME_MAX_LENGTH,
  USER_NAME_MIN_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
} from './../constants';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserCreatableInterface } from '../interfaces';
import { PickType } from '@nestjs/swagger';

export class CreateUserDto
  extends PickType(UserDto, [
    'username',
    'firstName',
    'lastName',
    'email',
    'password',
  ])
  implements UserCreatableInterface {}
