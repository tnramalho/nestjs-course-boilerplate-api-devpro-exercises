import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostgresConfig } from '../shared/config/database/postgres/postgres.config';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [PostgresConfig],
      isGlobal: true,
    }),
    SharedModule,
  ],
})
export class AppModule {}
