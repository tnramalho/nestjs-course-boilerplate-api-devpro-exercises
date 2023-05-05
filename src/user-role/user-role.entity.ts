import { User } from './../users/entities/user.entity';
import { Entity, Column, Unique, ManyToOne } from 'typeorm';
import { UserRoleInterface } from './interfaces';
import { CommonEntity } from '../common/common.entity';
import { Role } from '../role/role.entity';

@Entity()
@Unique(['userId', 'roleId'])
export class UserRole extends CommonEntity implements UserRoleInterface {
  @Column()
  userId!: string;

  @Column()
  roleId!: string;

  @ManyToOne(() => User, (user) => user.userRoles)
  user!: User;

  @ManyToOne(() => Role, (role) => role.userRoles)
  role!: Role;
}
