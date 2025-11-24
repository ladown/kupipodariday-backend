import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';

import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const httpAdapterHost = app.get(HttpAdapterHost);

  app.useGlobalFilters(new GlobalExceptionFilter(httpAdapterHost));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      skipMissingProperties: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
