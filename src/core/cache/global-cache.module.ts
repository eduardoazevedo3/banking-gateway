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
        const store = await redisStore({ socket: appConfigService.redis });
        return { store };
      },
    }),
  ],
  exports: [CacheModule],
})
export class GlobalCacheModule {}
