import { Public } from './../role/decorator/public.decorator';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthUser } from './decorator/auth-user.decorator';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRefreshDto } from './dto/auth-refresh.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { JwtAuthGuard } from './guards/jwt-auth-guard';
import { LocalAuthGuard } from './guards/local-auth-guard';
import { UserDto } from '../users/dto/user.dto';
@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @ApiBody({
    type: AuthLoginDto,
    description: 'Authenticate user with username and password',
  })
  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  login(@AuthUser() user: UserDto) {
    return this.authService.jwtSign(user);
  }

  @Public()
  @Post('/refresh')
  @ApiOperation({ operationId: 'auth_refresh' })
  @ApiCreatedResponse({
    type: AuthResponseDto,
  })
  refresh(@Body() authRefreshDto: AuthRefreshDto): Promise<AuthResponseDto> {
    return this.authService.jwtRefresh(authRefreshDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@AuthUser() user: UserDto) {
    return user;
  }
}
