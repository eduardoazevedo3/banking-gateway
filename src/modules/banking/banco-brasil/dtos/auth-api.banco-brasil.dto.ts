import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class AuthApiBancoBrasilDto {
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

export class AuthApiCredentialsBancoBrasilDto {
  @ApiProperty({
    example: 'A1234567890',
    description: 'Your app key identifier',
  })
  @IsString()
  appKey: string;

  @ApiProperty({
    example: 'eyJpZCI6WRkIjQ0OjJhYNmQtNiIsGlnImNvZb1pY2Fkb3',
    description: 'Your client id',
  })
  @IsString()
  clientId: string;

  @ApiProperty({
    example: 'eyJpZCI6WRkIjQ0OjJhYNmQtNiIsGlnImNvZb1pY2Fkb3',
    description: 'Your client secret',
  })
  @IsString()
  clientSecret: string;
}
