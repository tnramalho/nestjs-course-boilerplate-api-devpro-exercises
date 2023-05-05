import { ConfigType } from '@nestjs/config';
import { jwtConfiguration } from './../config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role]),
    JwtModule.registerAsync({
      inject: [jwtConfiguration.KEY],
      useFactory: async (jwtConfig: ConfigType<typeof jwtConfiguration>) =>
        jwtConfig,
    }),
  ],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
