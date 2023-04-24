import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { BaseDto } from '../../../shared/controllers/dto/base.dto';

export class UserRoleDto extends BaseDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  userId: string;

  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  roleId: string;
}
