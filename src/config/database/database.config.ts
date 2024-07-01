import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { AppConfigModule } from '../app-config.module';
import { AppConfigService } from '../app-config.service';

export const databaseAsyncOptions: TypeOrmModuleAsyncOptions = {
  imports: [AppConfigModule],
  inject: [AppConfigService],
  useFactory: async (config: AppConfigService) => {
    const { host, port, username, password, name } = config.database;

    return {
      type: 'mysql',
      host,
      port,
      username,
      password,
      database: name,
      logging: true,
      synchronize: false,
      entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
    };
  },
};
