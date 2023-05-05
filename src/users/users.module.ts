import { ConfigType } from '@nestjs/config';
import { jwtConfiguration } from './../config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './../auth/auth.module';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule),
    JwtModule.registerAsync({
      inject: [jwtConfiguration.KEY],
      useFactory: async (jwtConfig: ConfigType<typeof jwtConfiguration>) =>
        jwtConfig,
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
