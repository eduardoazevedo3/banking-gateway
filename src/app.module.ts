import { ExpressAdapter } from '@bull-board/express';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullModule } from '@nestjs/bullmq';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from './account/account.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoletoModule } from './boleto/boleto.module';
import { bullAsyncOptions } from './config/bull.config';
import { databaseAsyncOptions } from './config/database.config';
import { CoreModule } from './core/core.module';
import { RequestLoggerMiddleware } from './core/middlewares/request-logger.middleware';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
