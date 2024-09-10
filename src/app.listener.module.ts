import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoletoListenerModule } from './boleto/boleto.listener.module';
import { AppConfigModule } from './config/app-config.module';
import { AppConfigService } from './config/app-config.service';
import { databaseAsyncOptions } from './config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(databaseAsyncOptions),
    BullModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: async (configService: AppConfigService) => ({
        connection: {
          host: configService.redis.host,
          port: configService.redis.port,
        },
      }),
      inject: [AppConfigService],
    }),
    BoletoListenerModule,
  ],
})
export class AppListenerModule {}
