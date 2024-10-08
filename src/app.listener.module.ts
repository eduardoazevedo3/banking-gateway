import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from './account/account.module';
import { BoletoListenerModule } from './boleto/boleto.listener.module';
import { bullAsyncOptions } from './config/bull.config';
import { databaseAsyncOptions } from './config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(databaseAsyncOptions),
    BullModule.forRootAsync(bullAsyncOptions),
    BoletoListenerModule,
    AccountModule,
  ],
})
export class AppListenerModule {}
