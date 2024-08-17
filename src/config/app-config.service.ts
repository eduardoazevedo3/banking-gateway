import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

type TAppConfig = {
  env: string;
};

type TDatabaseConfig = {
  host: string;
  port: number;
  name: string;
  username: string;
  password: string;
};

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get app(): TAppConfig {
    return { ...this.configService.get('app') };
  }

  get database(): TDatabaseConfig {
    return { ...this.configService.get('database') };
  }
}
