import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDate,
  IsDecimal,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Length,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import {
  BoletoEntityTypeEnum,
  BoletoIssuingBankEnum,
  BoletoNegativationAgencyEnum,
  BoletoStatusEnum,
} from '../enums/boleto.enum';

export class CreateBoletoDto {
  @ApiProperty({ example: '123456789' })
  @IsString()
  @MaxLength(20)
  referenceCode: string;

  @ApiProperty({ example: '123456789' })
  @IsString()
  @MaxLength(20)
  ourNumber: string;

  @ApiProperty({
    example: BoletoStatusEnum.PENDING,
    enum: BoletoStatusEnum,
    enumName: 'BoletoStatusEnum',
  })
  @IsEnum(BoletoStatusEnum)
  status: BoletoStatusEnum;

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
  @IsDate()
  issueDate: Date;

  @ApiProperty({ example: '2024-08-10' })
  @IsDate()
  expirationDate: Date;

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
  beneficiaryDocument: string;

  @ApiProperty({ example: 'Alberto Santos' })
  @IsString()
  @Length(3, 255)
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
  payerDocument: string;

  @ApiProperty({ example: 'Alberto Santos' })
  @IsString()
  @Length(3, 255)
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

  @ApiProperty({ example: 'SP' })
  @IsString()
  @Length(2, 2)
  payerState: string;

  @ApiProperty({ example: '(11) 99999-9999' })
  @IsString()
  @Length(14, 15)
  payerPhone: string;
}
