import { NestFactory } from '@nestjs/core';
import { AppListenerModule } from './app.listener.module';

async function bootstrap() {
  const app = await NestFactory.create(AppListenerModule);
  await app.listen(3001);
}
bootstrap();
