import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, Matches, MaxLength } from 'class-validator';
import { BaseAccountDto } from './base-account.dto';

export class UpdateAccountDto extends BaseAccountDto {
  @ApiPropertyOptional({
    example: 'Ab.12345-6789',
    description:
      'Your account reference code identifier.' +
      'Valid characters: a-z, A-Z, 0-9, dot and hyphen',
  })
  @IsString()
  @MaxLength(64)
  @Matches(/^[a-zA-Z0-9.-]+$/, {
    message:
      'providerAccountId can only contain letters, numbers, dots and hyphens',
  })
  providerAccountId?: string;
}
