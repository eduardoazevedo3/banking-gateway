import { HttpService } from '@nestjs/axios';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { Method } from 'axios';
import { plainToClass } from 'class-transformer';
import * as crypto from 'crypto';
import * as https from 'https';
import { catchError, firstValueFrom } from 'rxjs';
import { AppConfigService } from '../../config/app-config.service';
import { AuthBadRequestException } from '../exceptions/auth-bad-request.exception';
import { AuthApiDto } from './dtos/auth-api.dto';

export abstract class BancoBrasilService {
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
    credentials: string,
  ): Promise<T> {
    const bancoBrasilConfig = this.configService.banking.bancoBrasil;
    const token = await this.getCredentials(credentials);
    const response = await firstValueFrom(
      this.httpService.request<T>({
        method: method,
        url: `${this.apiUrl}${path}?${this.appKeyName}=${bancoBrasilConfig.appKey}`,
        data: payload,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token.tokenType} ${token.accessToken}`,
        },
        httpsAgent: this.getHttpAgent(),
      }),
    );

    return response.data;
  }

  private async authenticate(credentials: string): Promise<AuthApiDto> {
    const response = await firstValueFrom(
      this.httpService
        .post<AuthApiDto>(`${this.oauthUrl}/oauth/token`, this.authPayload, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${this.encodedCredentials(credentials)}`,
          },
          httpsAgent: this.getHttpAgent(),
        })
        .pipe(
          catchError((e) => {
            if (e.code === 'ERR_BAD_REQUEST') {
              throw new AuthBadRequestException(e.response.data);
            }
            throw e;
          }),
        ),
    );

    const authData = plainToClass(AuthApiDto, response.data);
    const expiresIn = (authData.expiresIn - 15) * 1000;
    await this.cacheManager.set(
      this.cacheKey(credentials),
      authData,
      expiresIn,
    );

    return authData;
  }

  private async getCredentials(credentials: string): Promise<AuthApiDto> {
    const accessToken =
      (await this.cacheManager.get<AuthApiDto>(this.cacheKey(credentials))) ||
      (await this.authenticate(credentials));

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

  private encodedCredentials(credentials: string): string {
    const credentialsParsed = JSON.parse(credentials);

    return Buffer.from(
      `${credentialsParsed.clientId}:${credentialsParsed.clientSecret}`,
    ).toString('base64');
  }

  private get authPayload(): object {
    return {
      grant_type: 'client_credentials',
      scope: 'cobrancas.boletos-info cobrancas.boletos-requisicao',
    };
  }

  private cacheKey(credentials: string): string {
    return crypto.createHash('sha256').update(credentials).digest('hex');
  }

  private getHttpAgent(): https.Agent {
    return {
      sandbox: new https.Agent({
        rejectUnauthorized: false,
      }),
      production: undefined,
    }[this.getCurrentEnv];
  }
}
