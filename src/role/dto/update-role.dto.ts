import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateRoleDto {
  @ApiProperty({
    type: 'string',
    description: 'Name of the role',
    example: 'Admin',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;
}
