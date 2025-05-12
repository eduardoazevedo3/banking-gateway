import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Matches, MaxLength } from 'class-validator';
import { IsUnique } from '../../../core/validators';
import { Account } from '../../../entities/account.entity';
import { BaseAccountDto } from './base-account.dto';

export class CreateAccountDto extends BaseAccountDto {
  @ApiPropertyOptional({
    example: 'Ab.12345-6789',
    description:
      'Your account reference code identifier.' +
      'Valid characters: a-z, A-Z, 0-9, dot and hyphen',
  })
  @IsOptional()
  @IsString()
  @MaxLength(64)
  @Matches(/^[a-zA-Z0-9.-]+$/, {
    message:
      'providerAccountId can only contain letters, numbers, dots and hyphens',
  })
  @IsUnique({
    context: {
      entity: Account,
      scope: ['providerAccountId'],
    },
    message: 'providerAccountId already exists',
  })
  providerAccountId: string;
}
