import { PickType } from '@nestjs/swagger';
import { RoleDto } from './role.dto';

export class UpdateRoleDto extends PickType(RoleDto, ['name']) {}
