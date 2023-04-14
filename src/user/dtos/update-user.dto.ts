import { IsEmail, IsNumber, IsOptional, IsString, Length, Max, Min } from 'class-validator';
import { UpdateUserDtoInterface } from '../shared/interfaces/update-user-dto.interface';

export class UpdateUserDto implements UpdateUserDtoInterface {
  @IsString()
  @Length(3, 255)
  @IsOptional()
  readonly name?: string;

  @IsString()
  @Length(3, 255)
  @IsOptional()
  readonly lastName?: string;

  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @IsNumber()
  @Min(18, {
    message: 'Minimum age required is 18'
  })
  @Max(90, {
    message: 'Maximum age required is 90'
  })
  @IsOptional()
  readonly age?: number;

  @IsString()
  @Length(5, 50)
  @IsOptional()
  readonly username?: string;
}