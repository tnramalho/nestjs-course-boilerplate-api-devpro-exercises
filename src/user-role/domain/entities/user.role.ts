import { Column, Entity, ManyToOne } from 'typeorm';
import { Role } from '../../../role/domain/entities/role.entity';
import { CommonEntity } from '../../../shared/database/base/common.entity';
import { User } from '../../../user/domain/entities/User.entity';
import { UserRoleInterface } from '../../interfaces/user-role.interface';

@Entity('user_roles')
export class UserRole extends CommonEntity implements UserRoleInterface {
  @Column()
  readonly roleId: string;

  @Column()
  readonly userId: string;

  @ManyToOne(() => User, (user) => user.userRoles)
  readonly user?: User;

  @ManyToOne(() => Role, (role) => role.userRoles)
  readonly role?: Role;
}
