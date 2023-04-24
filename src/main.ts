import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { serverConfig } from './shared/config/server/server.config';
import { swaggerConfig } from './shared/config/swagger/swagger.config';
import { GlobalExceptionFilter } from './shared/exceptions/global-filter.exception';

const PORT = 3000;
async function bootstrap() {
  const appServerConfig = serverConfig();
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new GlobalExceptionFilter());

  await swaggerConfig(app, appServerConfig.environment);

  await app.listen(PORT, () => {
    Logger.log('Open server with swagger: http://localhost:3000');
    Logger.log(`To health check visit http://localhost:3000/check`);
  });
}

bootstrap().then();
