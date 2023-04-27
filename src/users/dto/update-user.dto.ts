import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNotEmpty, IsBoolean } from 'class-validator';
import { UserUpdatableInterface } from '../interfaces';

export class UpdateUserDto implements UserUpdatableInterface {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    example: 'Jonas',
    description: 'Name of user',
    type: 'string',
    required: false,
  })
  firstName?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    example: 'Cunha',
    description: 'lastName of user',
    type: 'string',
    required: false,
  })
  lastName?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    example: false,
    type: 'boolean',
    description: 'if user is active or not.',
    required: false,
  })
  active?: boolean;
}
