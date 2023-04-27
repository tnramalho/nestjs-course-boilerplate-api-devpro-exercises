import {
  USER_NAME_MAX_LENGTH,
  USER_NAME_MIN_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
} from './../constants';
import { ApiProperty } from '@nestjs/swagger/dist';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserCreatableInterface } from '../interfaces';

export class CreateUserDto implements UserCreatableInterface {
  @MinLength(USER_NAME_MIN_LENGTH)
  @MaxLength(USER_NAME_MAX_LENGTH)
  @ApiProperty({
    example: 'Jihgs',
    description: 'username of the user',
    minLength: USER_NAME_MIN_LENGTH,
    maxLength: USER_NAME_MAX_LENGTH,
    type: 'string',
  })
  username!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Paulo',
    description: 'Name of user',
    type: 'string',
  })
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Bastos',
    description: 'lastName of user',
    type: 'string',
  })
  lastName!: string;

  @IsEmail()
  @ApiProperty({
    example: 'pBastos@gmail.com',
    description: 'Email of user',
    type: 'string',
  })
  email!: string;

  @MinLength(PASSWORD_MIN_LENGTH)
  @MaxLength(PASSWORD_MAX_LENGTH)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'password needs to contain at least one lowercase letter, one uppercase letter and one number or special character.',
  })
  @ApiProperty({
    example: 'sA109283',
    description:
      'Password of user, minimum 8 characters, maximum 32 characters. Needs to contain at least one lowercase letter, one uppercase letter and one number or special character.',
    type: 'string',
  })
  password!: string;
}
