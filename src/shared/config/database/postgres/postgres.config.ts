import { registerAs } from '@nestjs/config';
import { TYPEORM_POSTGRES_CONFIG } from '../../../constants/token';

interface PostgresConfigInterface {
  database: string;
  port: number;
  host: string;
  username: string;
  password: string;
}

export const PostgresConfig = registerAs(TYPEORM_POSTGRES_CONFIG, () => ({
  postgres: {
    database: process.env.DATABASE,
    port: Number(process.env.PORT),
    host: process.env.HOST,
    username: process.env.DB_USERNAME,
    password: process.env.PASSWORD,
  } as PostgresConfigInterface,
}));
