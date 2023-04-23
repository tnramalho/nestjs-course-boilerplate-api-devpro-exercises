import { Column, Entity, OneToMany } from 'typeorm';
import { CommonEntity } from '../../../shared/database/base/common.entity';
import { UserRole } from '../../../user-role/domain/entities/user.role';
import { UserInterface } from '../../interfaces/user.interface';

@Entity('user')
export class User extends CommonEntity implements UserInterface {
  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: true })
  username: string;

  @Column({ type: 'text', nullable: true, default: null })
  salt?: string;

  @Column({ nullable: true })
  password?: string;

  @OneToMany(() => UserRole, (userRole) => userRole.user)
  userRoles?: UserRole[];
}
