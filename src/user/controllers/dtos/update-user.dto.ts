import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { UpdateUserDtoInterface } from '../../interfaces/update-user-dto.interface';

export class UpdateUserDto implements UpdateUserDtoInterface {
  @ApiProperty()
  @IsString()
  @Length(3, 255)
  @IsOptional()
  readonly name: string;

  @ApiProperty()
  @IsString()
  @Length(3, 255)
  @IsOptional()
  readonly lastName: string;

  @ApiProperty()
  @IsEmail()
  @IsOptional()
  readonly email: string;

  @ApiProperty()
  @IsNumber()
  @Min(18, {
    message: 'Minimum age required is 18',
  })
  @Max(90, {
    message: 'Maximum age required is 90',
  })
  @IsOptional()
  readonly age: number;

  @ApiProperty()
  @IsString()
  @Length(5, 50)
  @IsOptional()
  readonly username: string;
}
