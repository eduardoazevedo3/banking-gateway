import {
  RegisterQueueOptions,
  SharedBullAsyncConfiguration,
} from '@nestjs/bullmq';
import { AppConfigModule } from './app-config.module';
import { AppConfigService } from './app-config.service';

export const bullAsyncOptions: SharedBullAsyncConfiguration = {
  imports: [AppConfigModule],
  useFactory: async (configService: AppConfigService) => ({
    connection: {
      host: configService.redis.host,
      port: configService.redis.port,
      db: configService.redis.db,
    },
  }),
  inject: [AppConfigService],
};

export const bullQueueDefaultOptions: RegisterQueueOptions = {
  defaultJobOptions: {
    removeOnComplete: true,
    removeOnFail: true,
    attempts: 6,
    backoff: {
      type: 'exponential',
      delay: 10_000,
    },
  },
};
