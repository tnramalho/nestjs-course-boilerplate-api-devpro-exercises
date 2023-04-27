import { registerAs } from '@nestjs/config';

interface serverOptionsConfig {
  env: string;
}

export const serverConfiguration = registerAs(
  'server',
  (): serverOptionsConfig => ({
    env: 'development',
  }),
);
