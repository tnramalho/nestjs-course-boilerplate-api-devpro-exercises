import { IsEmail, IsNotEmpty, IsNumber, IsString, Length, Max, Min } from 'class-validator';
import { CreateUserDtoInterface } from '../shared/interfaces/create-user-dto.interface';

export class CreateUserDto implements CreateUserDtoInterface {
  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  readonly lastName: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(18, {
    message: 'Minimum age required is 18'
  })
  @Max(90, {
    message: 'Maximum age required is 90'
  })
  readonly age: number;

  @IsString()
  @IsNotEmpty()
  @Length(5, 50)
  readonly username: string;
}