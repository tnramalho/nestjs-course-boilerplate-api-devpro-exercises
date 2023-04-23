import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { CommonEntity } from '../../../shared/database/base/common.entity';
import { UserRole } from '../../../user-role/domain/entities/user.role';

@Entity('role')
@Unique(['name'])
export class Role extends CommonEntity {
  @Column()
  readonly name: string;

  @OneToMany(() => UserRole, (userRole) => userRole.role)
  readonly userRoles?: UserRole;
}
