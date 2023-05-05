import { IS_PUBLIC_KEY } from './../../role/decorator/public.decorator';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { Injectable, ExecutionContext, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);
  constructor(private reflector: Reflector, private jwtService: JwtService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      try {
        const req = context.switchToHttp().getRequest();
        const authHeader: string = req.headers['authorization'];
        if (authHeader?.startsWith('Bearer ')) {
          const token = authHeader.substring(7);
          const user = this.jwtService.verify(token)?.user;

          if (user) {
            req.user = user;
          }
        }
      } catch (error) {
        this.logger.error(error);
      }

      return true;
    }

    return super.canActivate(context);
  }
}
