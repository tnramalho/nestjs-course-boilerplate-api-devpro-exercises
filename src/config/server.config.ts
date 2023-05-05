import { SERVER_CONFIG } from './../common/constants';
import { registerAs } from '@nestjs/config';

interface serverOptionsConfig {
  env: string;
}

export const serverConfiguration = registerAs(
  SERVER_CONFIG,
  (): serverOptionsConfig => ({
    env: process.env.ENVIRONMENT || 'development',
  }),
);
