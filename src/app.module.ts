import { ExpressAdapter } from '@bull-board/express';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullModule } from '@nestjs/bullmq';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { bullAsyncOptions } from './config/bull.config';
import { databaseAsyncOptions } from './config/database.config';
import { CoreModule } from './core/core.module';
import { RequestLoggerMiddleware } from './core/middlewares/request-logger.middleware';
import { AccountModule } from './modules/account/account.module';
import { BoletoModule } from './modules/boleto/boleto.module';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(databaseAsyncOptions),
    BullModule.forRootAsync(bullAsyncOptions),
    BullBoardModule.forRoot({
      route: '/queues',
      adapter: ExpressAdapter,
    }),
    CoreModule,
    AccountModule,
    BoletoModule,
    HealthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
