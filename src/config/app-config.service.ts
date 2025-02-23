import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

type TAppConfig = {
  env: string;
  debug: boolean;
};

type TRedis = {
  host: string;
  port: number;
  db: number;
};

type TDatabaseConfig = {
  host: string;
  port: number;
  name: string;
  username: string;
  password: string;
};

type TBanking = {
  bancoBrasil: TBancoBrasil;
};

type TBancoBrasil = {
  appKey: string;
  clientId: string;
  clientSecret: string;
};

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get app(): TAppConfig {
    return { ...this.configService.get('app') };
  }

  get redis(): TRedis {
    return { ...this.configService.get('redis') };
  }

  get database(): TDatabaseConfig {
    return { ...this.configService.get('database') };
  }

  get banking(): TBanking {
    return { ...this.configService.get('banking') };
  }
}
