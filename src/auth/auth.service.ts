import { AuthResponseDto } from './dto/auth-response.dto';
import { AuthRefreshDto } from './dto/auth-refresh.dto';
import { JwtPayload } from 'jsonwebtoken';
import { UsersService } from './../users/users.service';
import { ConfigType } from '@nestjs/config';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConfiguration } from 'src/config/jwt.config';
import { UserDto } from 'src/users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    @Inject(jwtConfiguration.KEY)
    private jwtConfig: ConfigType<typeof jwtConfiguration>,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserDto | null> {
    const user = await this.userService.validateUserPassword(
      username,
      password,
    );
    if (!user || !user.active) null;
    return user;
  }

  async jwtSign(user: UserDto): Promise<AuthResponseDto> {
    const accessConfig = this.jwtConfig.access;
    const refreshConfig = this.jwtConfig.refresh;

    const payload: JwtPayload = { sub: user.id };

    const accessToken = await this.jwtService.sign(
      payload,
      accessConfig?.signOptions,
    );

    const refreshToken = await this.jwtService.sign(
      payload,
      refreshConfig?.signOptions,
    );

    return new AuthResponseDto(accessToken, refreshToken);
  }

  async jwtRefresh(authRefreshDto: AuthRefreshDto): Promise<AuthResponseDto> {
    const refreshConfig = this.jwtConfig.refresh;

    const verified = await this.jwtService.verifyAsync<JwtPayload>(
      authRefreshDto.refreshToken,
      refreshConfig?.verifyOptions,
    );

    if (verified) {
      const id = verified.sub;
      const user = await this.userService.findOne(id);
      return this.jwtSign(user);
    }

    throw new UnauthorizedException();
  }
}
