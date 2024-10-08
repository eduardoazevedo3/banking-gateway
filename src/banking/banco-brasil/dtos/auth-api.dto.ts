import { Expose } from 'class-transformer';

export class AuthApiDto {
  @Expose({ name: 'access_token' })
  accessToken: string;

  @Expose({ name: 'token_type' })
  tokenType: string;

  @Expose({ name: 'expires_in' })
  expiresIn: number;

  @Expose({ name: 'refresh_token' })
  refreshToken: string;

  @Expose({ name: 'id_token' })
  idToken: string;

  @Expose()
  scope: string;
}
