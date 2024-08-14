import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

type DatabaseConfig = {
  host: string;
  port: number;
  name: string;
  username: string;
  password: string;
};

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get database(): DatabaseConfig {
    return { ...this.configService.get('database') };
  }
}
