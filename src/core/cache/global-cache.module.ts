import { CacheModule } from '@nestjs/cache-manager';
import { Global, Module } from '@nestjs/common';
import { redisStore } from 'cache-manager-redis-yet';
import { AppConfigModule } from '../../config/app-config.module';
import { AppConfigService } from '../../config/app-config.service';

@Global()
@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: async (appConfigService: AppConfigService) => {
        const { host, port, db: database, username, password } = appConfigService.redis;

        const store = await redisStore({
          socket: { host, port },
          database,
          username,
          password,
          ttl: 60 * 60 * 24, // 24 hours
        });
        return { store };
      },
    }),
  ],
  exports: [CacheModule],
})
export class GlobalCacheModule {}
