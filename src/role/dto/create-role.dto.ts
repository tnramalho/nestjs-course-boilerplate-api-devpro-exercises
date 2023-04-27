import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    type: 'string',
    description: 'Name of the role',
    example: 'Admin',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;
}
