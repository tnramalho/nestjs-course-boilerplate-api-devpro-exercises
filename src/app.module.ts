import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConfiguration } from 'src/config/jwt.config';
import { AuthModule } from './auth/auth.module';
import { serverConfiguration } from './config/server.config';
import { typeormConfiguration } from './config/typeorm.config';
import { RoleModule } from './role/role.module';
import { UserRoleModule } from './user-role/user-role.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeormConfiguration, serverConfiguration, jwtConfiguration],
    }),
    TypeOrmModule.forRootAsync({
      inject: [typeormConfiguration.KEY],
      useFactory: async (
        typeOrmConfig: ConfigType<typeof typeormConfiguration>,
      ) => typeOrmConfig,
    }),
    UsersModule,
    UserRoleModule,
    RoleModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
