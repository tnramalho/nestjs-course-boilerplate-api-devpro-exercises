import { Module } from '@nestjs/common';
import { UserRoleController } from '../../user-role/controllers/user-role.controller';
import { UserRoleService } from '../../user-role/domain/services/user-role.service';
import { UserRoleRepository } from '../../user-role/repositories/user-role.repository';

@Module({
  providers: [UserRoleService, UserRoleRepository],
  controllers: [UserRoleController],
})
export class UserRoleModule {}
