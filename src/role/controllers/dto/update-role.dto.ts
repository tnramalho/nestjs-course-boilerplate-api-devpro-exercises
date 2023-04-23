import { OmitType } from '@nestjs/swagger';
import { RoleDto } from './role.dto';

export class UpdateRoleDto extends OmitType(RoleDto, [
  'id',
  'updatedAt',
  'createdAt',
] as const) {}
