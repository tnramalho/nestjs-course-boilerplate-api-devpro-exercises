import { PickType } from '@nestjs/swagger';
import { UserRoleDto } from './user-role.dto';

export class CreateUserRoleDto extends PickType(UserRoleDto, [
  'userId',
  'roleId',
]) {}
