import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';
import { Account } from '../../account/entities/account.entity';
import { IsEntityExists, IsUnique } from '../../core/validators';
import { BankingCredential } from '../entities/banking-credential.entity';

export class CreateBankingCredentialDto {
  @ApiProperty({
    example: '123',
    description: 'Unique identifier of the account.',
  })
  @IsNumber()
  @IsEntityExists({
    context: { entity: Account, scope: { id: 'accountId' } },
    message: 'accountId is not a valid account',
  })
  accountId;

  @ApiPropertyOptional({
    example: 'Ab.12345-6789',
    description:
      'Unique reference code identifier of the banking credential by account.' +
      'Valid characters: a-z, A-Z, 0-9, dot and hyphen',
  })
  @IsString()
  @MaxLength(64)
  @Matches(/^[a-zA-Z0-9.-]+$/, {
    message:
      'referenceCode can only contain letters, numbers, dots and hyphens',
  })
  @IsOptional()
  @IsUnique({
    context: {
      entity: BankingCredential,
      scope: ['accountId', 'referenceCode'],
    },
    message: 'referenceCode already exists for this accountId',
  })
  referenceCode?;

  @ApiProperty({ example: 'Ab 12.345-6789' })
  @MaxLength(99_999)
  @IsString()
  credentials;
}
