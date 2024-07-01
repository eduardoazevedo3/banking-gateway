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
    return {
      host: this.configService.get('database.host'),
      port: this.configService.get('database.port'),
      name: this.configService.get('database.name'),
      username: this.configService.get('database.username'),
      password: this.configService.get('database.password'),
    };
  }
}
