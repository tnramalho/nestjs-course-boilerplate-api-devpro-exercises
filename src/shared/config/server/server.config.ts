import { registerAs } from '@nestjs/config';
import { SERVER_CONFIG } from '../../constants/token';

export interface ServerConfigInterface {
  environment: string;
  port: number;
}

export const serverConfig = registerAs(
  SERVER_CONFIG,
  (): ServerConfigInterface => ({
    environment: process.env?.NODE_ENV ?? 'development',
    port:
      'string' === typeof process.env.PORT ? Number(process.env.PORT) : 3001,
  }),
);
