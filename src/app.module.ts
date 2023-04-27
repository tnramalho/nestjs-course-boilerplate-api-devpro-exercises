import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { serverConfiguration } from './config/server.config';
import { typeormConfiguration } from './config/typeorm.config';
import { RoleModule } from './role/role.module';
import { UserRoleModule } from './user-role/user-role.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeormConfiguration, serverConfiguration],
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
