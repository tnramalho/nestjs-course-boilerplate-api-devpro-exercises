import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../../role/domain/entities/role.entity';
import { RoleRepository } from '../../role/repositories/role.repository';
import { RepositoryToken } from '../../shared/constants/repository-token';
import { UserRole } from '../../user-role/domain/entities/user.role';
import { UserRoleRepository } from '../../user-role/repositories/user-role.repository';
import { User } from '../../user/domain/entities/User.entity';
import { UserRepository } from '../../user/repositories/user-repository';
import { DatabaseModule } from '../database/database.module';
import { RoleModule } from '../role/role.module';
import { UserRoleModule } from '../user-role/user-role.module';
import { UserModule } from '../user/user.module';

@Global()
@Module({
  imports: [
    UserModule,
    DatabaseModule,
    RoleModule,
    UserRoleModule,
    TypeOrmModule.forFeature([User, Role, UserRole]),
  ],
  providers: [
    { provide: RepositoryToken.USER, useClass: UserRepository },
    { provide: RepositoryToken.ROLE, useClass: RoleRepository },
    { provide: RepositoryToken.USER_ROLE, useClass: UserRoleRepository },
  ],
  exports: [
    TypeOrmModule,
    RepositoryToken.USER,
    RepositoryToken.ROLE,
    RepositoryToken.USER_ROLE,
  ],
})
export class SharedModule {}
