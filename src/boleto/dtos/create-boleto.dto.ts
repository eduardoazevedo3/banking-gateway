import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsDecimal,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Length,
  Matches,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { Account } from '../../account/entities/account.entity';
import { IsEntityExists, IsUnique } from '../../core/validators';
import { Boleto } from '../entities/boleto.entity';
import { BoletoEntityTypeEnum } from '../enums/boleto-entity-type.enum';
import { BoletoIssuingBankEnum } from '../enums/boleto-issuing-bank.enum';
import { BoletoNegativationAgencyEnum } from '../enums/boleto-negativation-agency.enum copy';

export class CreateBoletoDto {
  @ApiProperty({
    example: '123',
    description: 'Unique identifier of the account.',
  })
  @IsNumber()
  @IsEntityExists({
    context: { entity: Account, scope: { id: 'accountId' } },
    message: 'accountId is not a valid account',
  })
  accountId: number;

  @ApiPropertyOptional({
    example: '123',
    description: 'Unique identifier of the account.',
  })
  @IsOptional()
  @IsNumber()
  bankingCredentials?: number;

  @ApiProperty({
    example: 'Ab.12345-6789',
    description:
      'Unique identifier of the account. Valid characters: a-z, A-Z, 0-9, dot and hyphen',
  })
  @IsString()
  @MaxLength(64)
  @Matches(/^[a-zA-Z0-9.-]+$/, {
    message: 'covenantId can only contain letters, numbers, dots and hyphens',
  })
  covenantId: string;

  @ApiPropertyOptional({
    example: 'Ab.12345-6789',
    description:
      'Your unique reference code identifier of the boleto by account.' +
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
      entity: Boleto,
      scope: ['accountId', 'referenceCode'],
    },
    message: 'referenceCode already exists for this accountId',
  })
  referenceCode?: string;

  @ApiProperty({
    example: '123456789',
    description: 'Unique identifier of the boleto. Valid characters: 0-9',
  })
  @IsString()
  @MaxLength(20)
  @Matches(/^[0-9]+$/, { message: 'ourNumber can only contain numbers' })
  @IsUnique({
    context: {
      entity: Boleto,
      scope: ['accountId', 'covenantId', 'ourNumber'],
    },
    message: 'ourNumber already exists for this accountId and covenantId',
  })
  ourNumber: string;

  @ApiProperty({
    example: BoletoIssuingBankEnum.BANCO_BRASIL,
    enum: BoletoIssuingBankEnum,
    enumName: 'BoletoIssuingBankEnum',
  })
  @IsEnum(BoletoIssuingBankEnum)
  issuingBank: BoletoIssuingBankEnum;

  @ApiProperty({ example: { key: 'value' } })
  @IsObject()
  issueData: object;

  @ApiProperty({ example: '2024-08-10' })
  @IsDateString()
  issueDate: Date;

  @ApiProperty({ example: '2024-08-10' })
  @IsDateString()
  dueDate: Date;

  @ApiProperty({ example: 100.0 })
  @IsDecimal()
  amount: number;

  @ApiPropertyOptional({ example: 10.0 })
  @IsDecimal()
  @IsOptional()
  discountAmount?: number;

  @ApiPropertyOptional({ example: 10.0 })
  @IsDecimal()
  @IsOptional()
  fineAmount?: number;

  @ApiPropertyOptional({ example: 10.0 })
  @IsDecimal()
  @IsOptional()
  interestAmount?: number;

  @ApiPropertyOptional({ example: 10.0 })
  @IsDecimal()
  @IsOptional()
  feeAmount?: number;

  @ApiPropertyOptional({ example: 30 })
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(90)
  protestDays?: number;

  @ApiPropertyOptional({ example: 30 })
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(90)
  negativationDays?: number;

  @ApiPropertyOptional({
    enum: BoletoNegativationAgencyEnum,
    enumName: 'BoletoNegativationAgencyEnum',
    example: BoletoNegativationAgencyEnum.SERASA,
  })
  @IsEnum(BoletoNegativationAgencyEnum)
  @IsOptional()
  negativationAgency?: BoletoNegativationAgencyEnum;

  @ApiPropertyOptional({ example: 30 })
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(90)
  receiptDaysLimit?: number;

  @ApiPropertyOptional({ example: '123' })
  @IsNumber()
  @IsOptional()
  boletoTypeCode?: number;

  @ApiPropertyOptional({ example: 'Duplicata Mercantil' })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  boletoTypeDescription?: string;

  @ApiProperty({
    example: BoletoEntityTypeEnum.CNPJ,
    enum: BoletoEntityTypeEnum,
    enumName: 'BoletoEntityTypeEnum',
  })
  @IsEnum(BoletoEntityTypeEnum)
  beneficiaryType: BoletoEntityTypeEnum;

  @ApiProperty({ example: '123.345.567-09' })
  @IsString()
  @Length(14, 18)
  @Matches(/^[0-9.\-/]+$/, {
    message: 'beneficiaryDocument can only contain numbers, dots and hyphens',
  })
  beneficiaryDocument: string;

  @ApiProperty({
    example: 'Alberto Santos',
    description:
      'beneficiaryName can only contain letters and spaces. Max length: 255',
  })
  @IsString()
  @Length(3, 255)
  @Matches(/^[a-zA-Z.\-\s]+$/, {
    message:
      'beneficiaryName can only contain letters, dots, hyphens and spaces',
  })
  beneficiaryName: string;

  @ApiProperty({
    example: BoletoEntityTypeEnum.CPF,
    enum: BoletoEntityTypeEnum,
    enumName: 'BoletoEntityTypeEnum',
  })
  @IsEnum(BoletoEntityTypeEnum)
  payerType: string;

  @ApiProperty({ example: '123.345.567-09' })
  @IsString()
  @Length(14, 18)
  @Matches(/^[0-9.\-/]+$/, {
    message: 'payerDocument can only contain numbers, dots and hyphens',
  })
  payerDocument: string;

  @ApiProperty({ example: 'Alberto Santos' })
  @IsString()
  @Length(3, 255)
  @Matches(/^[a-zA-Z.\-\s]+$/, {
    message: 'payerName can only contain letters, dots, hyphens and spaces',
  })
  payerName: string;

  @ApiProperty({ example: 'Rua Floriano Peixoto' })
  @IsString()
  @Length(3, 255)
  payerAddress: string;

  @ApiProperty({ example: '123 | S/N' })
  @IsString()
  @Length(1, 20)
  payerAddressNumber: string;

  @ApiProperty({ example: '123' })
  @IsString()
  @Length(9, 9)
  payerZipCode: string;

  @ApiProperty({ example: 'São Paulo' })
  @IsString()
  @Length(3, 255)
  payerCity: string;

  @ApiProperty({ example: 'Centro' })
  @IsString()
  @Length(3, 255)
  payerNeighborhood: string;

  @ApiProperty({
    example: 'SP',
    description: 'Valid characters: A-Z. Max length: 2',
  })
  @IsString()
  @Length(2, 2)
  @Matches(/^[A-Z]+$/, {
    message: 'payerState can only contain regex: A-Z',
  })
  payerState: string;

  @ApiProperty({ example: '(11) 99999-9999' })
  @IsString()
  @Length(14, 15)
  @Matches(/^[0-9()-\s]+$/, {
    message: 'payerPhone can only contain regex: 0-9()-/s',
  })
  payerPhone: string;
}
