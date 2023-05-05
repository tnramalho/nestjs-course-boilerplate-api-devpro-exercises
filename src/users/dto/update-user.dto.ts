import { PartialType, PickType } from '@nestjs/swagger';
import { UserUpdatableInterface } from '../interfaces';
import { UserDto } from './user.dto';

export class UpdateUserDto
  extends PickType(PartialType(UserDto), [
    'firstName',
    'lastName',
    'active',
    'password',
  ])
  implements UserUpdatableInterface {}
