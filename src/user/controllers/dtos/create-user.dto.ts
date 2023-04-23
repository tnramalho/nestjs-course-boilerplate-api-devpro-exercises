import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { IsStrongPassword } from '../../infrastructure/decorators/is-strong-password';
import { CreateUserDtoInterface } from '../../interfaces/create-user-dto.interface';

export class CreateUserDto implements CreateUserDtoInterface {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  readonly name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  readonly lastName: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(18, {
    message: 'Minimum age required is 18',
  })
  @Max(90, {
    message: 'Maximum age required is 90',
  })
  readonly age: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(5, 50)
  readonly username: string;

  @ApiProperty()
  @IsString()
  @IsStrongPassword()
  readonly password: string;
}
