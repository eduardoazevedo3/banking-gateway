import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { bullAsyncOptions } from './config/bull.config';
import { databaseAsyncOptions } from './config/database.config';
import { GlobalCacheModule } from './core/cache/global-cache.module';
import { BoletoListenerModule } from './modules/boleto/boleto.listener.module';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(databaseAsyncOptions),
    BullModule.forRootAsync(bullAsyncOptions),
    ScheduleModule.forRoot(),
    GlobalCacheModule,
    BoletoListenerModule,
    HealthModule,
  ],
})
export class AppListenerModule {}
