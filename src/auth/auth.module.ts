import { forwardRef, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConfiguration } from './../config/jwt.config';
import { UsersModule } from './../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth-guard';
import { JwtStrategy } from './jwt-strategy';
import { LocalStrategy } from './local-strategy';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.registerAsync({
      inject: [jwtConfiguration.KEY],
      useFactory: async (jwtConfig: ConfigType<typeof jwtConfiguration>) =>
        jwtConfig,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, LocalAuthGuard, JwtStrategy],
})
export class AuthModule {}
