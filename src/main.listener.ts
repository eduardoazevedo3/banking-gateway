import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppListenerModule } from './app.listener.module';

async function bootstrap() {
  const port = process.env.LISTENER_PORT || 3000;
  const app = await NestFactory.create(AppListenerModule);

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  await app.listen(port);
}
bootstrap();
