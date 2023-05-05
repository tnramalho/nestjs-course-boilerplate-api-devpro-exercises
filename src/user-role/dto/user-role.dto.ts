import { RoleDto } from './../../role/dto/role.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { CommonEntityDto } from '../../common/dto/common-entity.dto';
import { UserRoleInterface } from '../interfaces';

export class UserRoleDto extends CommonEntityDto implements UserRoleInterface {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  userId!: string;

  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  roleId!: string;

  @ApiProperty({ type: () => RoleDto, required: false })
  role!: RoleDto;
}
