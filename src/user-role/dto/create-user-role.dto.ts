import { UserRoleDto } from './user-role.dto';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateUserRoleDto extends PickType(UserRoleDto, [
  'userId',
  'roleId',
]) {}
