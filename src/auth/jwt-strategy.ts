import { serverConfiguration } from './../config/server.config';
import { UsersService } from './../users/users.service';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { jwtConfiguration } from '../config/jwt.config';
import { UserDto } from '../users/dto/user.dto';
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(jwtConfiguration.KEY)
    private jwtConfig: ConfigType<typeof jwtConfiguration>,
    @Inject(serverConfiguration.KEY)
    private serverConfig: ConfigType<typeof serverConfiguration>,
    private userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: serverConfig.env === 'development' ? true : false,
      secretOrKey: jwtConfig.secret,
    });
  }

  async validate(payload: JwtPayload): Promise<UserDto> {
    const { sub } = payload;
    const user = await this.userService.findOne(sub);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
