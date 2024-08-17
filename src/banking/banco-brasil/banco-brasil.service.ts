import { HttpService } from '@nestjs/axios';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { Method } from 'axios';
import { firstValueFrom } from 'rxjs';
import { AppConfigService } from '../../config/app-config.service';

export abstract class BancoBrasilService {
  private readonly CLIENT_ID = 'client id';
  private readonly CLIENT_SECRET = 'client secret';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: AppConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  protected get apiUrl(): string {
    return {
      sandbox: 'https://api.sandbox.bb.com.br',
      production: 'https://api.bb.com.br',
    }[this.getCurrentEnv];
  }

  protected async request<T>(
    method: Method,
    path: string,
    payload: any,
  ): Promise<T> {
    const credentials = await this.getCredentials();
    const response = await firstValueFrom(
      this.httpService.request({
        method: method,
        url: `${this.apiUrl}${path}?${this.appKeyName}=app_key`, // FIXME: Replace with actual values
        params: payload,
        headers: {
          Authorization: `${credentials.token_type} ${credentials.access_token}`,
        },
      }),
    );

    return response.data;
  }

  // TODO: Type the return of this method
  private async authenticate(): Promise<object> {
    const response = await firstValueFrom(
      this.httpService.post(`${this.oauthUrl}/oauth/token`, this.authPayload, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${this.encodedCredentials}`,
        },
      }),
    );

    const authData = response.data;
    const expiresIn = authData.expires_in - 15;
    await this.cacheManager.set(this.cacheKey, authData, expiresIn);

    return authData;
  }

  // TODO: Type the return of this method
  private async getCredentials(): Promise<any> {
    const accessToken =
      (await this.cacheManager.get<object>(this.cacheKey)) ||
      (await this.authenticate());

    return accessToken;
  }

  private get oauthUrl(): string {
    return {
      sandbox: 'https://oauth.sandbox.bb.com.br',
      production: 'https://oauth.bb.com.br',
    }[this.getCurrentEnv];
  }

  private get getCurrentEnv(): string {
    return this.configService.app.env === 'production'
      ? 'production'
      : 'sandbox';
  }

  private get appKeyName(): string {
    return {
      sandbox: 'gw-dev-app-key',
      production: 'gw-app-key',
    }[this.getCurrentEnv];
  }

  private get encodedCredentials(): string {
    return Buffer.from(`${this.CLIENT_ID}:${this.CLIENT_SECRET}`).toString(
      'base64',
    );
  }

  private get authPayload(): object {
    return {
      grant_type: 'client_credentials',
      scope: 'cobrancas.boletos-info cobrancas.boletos-requisicao',
    };
  }

  private get cacheKey(): string {
    return 'cache-key';
  }
}
