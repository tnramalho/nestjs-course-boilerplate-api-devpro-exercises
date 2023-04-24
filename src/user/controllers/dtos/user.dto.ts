import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { BaseDto } from '../../../shared/controllers/dto/base.dto';
import { UserRoleDto } from '../../../user-role/controllers/dto/user-role.dto';
import { UserInterface } from '../../interfaces/user.interface';

@Exclude()
export class UserDto
  extends BaseDto
  implements Omit<UserInterface, 'salt' | 'password'>
{
  @Expose()
  name!: string;

  @Expose()
  lastName!: string;

  @Expose()
  email!: string;

  @Expose()
  age!: number;

  @Expose()
  username!: string;

  @ApiProperty({
    type: [UserRoleDto],
    description: 'roles',
  })
  @Expose()
  userRoles?: UserRoleDto[];
}
