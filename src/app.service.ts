import { serverConfiguration } from './config/server.config';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    @Inject(serverConfiguration.KEY)
    private serverConfig: ConfigType<typeof serverConfiguration>,
  ) {}
  getHello(): string {
    return this.serverConfig.env;
  }
}
