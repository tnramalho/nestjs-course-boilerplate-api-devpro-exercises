import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfig } from '../../shared/config/database/postgres/postgres.config';
import { UserSubscriber } from '../../user/infrastructure/subscribers/user.subscriber';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [PostgresConfig.KEY],
      useFactory: (configService: ConfigType<typeof PostgresConfig>) => {
        const { host, port, database, username, password } =
          configService.postgres;
        return {
          type: 'postgres',
          host,
          port,
          username,
          password,
          database,
          synchronize: true,
          autoLoadEntities: true,
          logging: true,
          subscribers: [UserSubscriber],
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
