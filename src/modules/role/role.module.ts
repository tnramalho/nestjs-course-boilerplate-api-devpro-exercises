import { Module } from '@nestjs/common';
import { RoleController } from '../../role/controllers/role.controller';
import { RoleService } from '../../role/domain/services/role.service';

@Module({
  providers: [RoleService],
  controllers: [RoleController],
})
export class RoleModule {}
