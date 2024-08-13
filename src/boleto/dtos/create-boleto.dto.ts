import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDate,
  IsDecimal,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import {
  BoletoEntityTypeEnum,
  BoletoIssuingBankEnum,
  BoletoStatusEnum,
} from '../interfaces/boleto.interface';

export class CreateBoletoDto {
  @ApiProperty({ example: '123456789' })
  @IsString()
  referenceCode: string;

  @ApiProperty({ example: '123456789' })
  @IsString()
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
  @Min(90)
  protestDays?: number;

  @ApiPropertyOptional({ example: 30 })
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Min(90)
  negativationDays?: number;

  @ApiPropertyOptional({ example: 'SERASA' })
  @IsString()
  @IsOptional()
  negativationAgency?: string;

  @ApiPropertyOptional({ example: 30 })
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Min(90)
  receiptDaysLimit?: number;

  @ApiPropertyOptional({ example: '123' })
  @IsNumber()
  @IsOptional()
  boletoTypeCode?: number;

  @ApiPropertyOptional({ example: 'Duplicata Mercantil' })
  @IsString()
  @IsOptional()
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
  beneficiaryDocument: string;

  @ApiProperty({ example: 'Alberto Santos' })
  @IsString()
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
  payerDocument: string;

  @ApiProperty({ example: 'Alberto Santos' })
  @IsString()
  payerName: string;

  @ApiProperty({ example: 'Rua Floriano Peixoto' })
  @IsString()
  payerAddress: string;

  @ApiProperty({ example: '123 | S/N' })
  @IsString()
  payerAddressNumber: string;

  @ApiProperty({ example: '123' })
  @IsString()
  payerZipCode: string;

  @ApiProperty({ example: 'São Paulo' })
  @IsString()
  payerCity: string;

  @ApiProperty({ example: 'Centro' })
  @IsString()
  payerNeighborhood: string;

  @ApiProperty({ example: 'SP' })
  @IsString()
  payerState: string;

  @ApiProperty({ example: '(11) 99999-9999' })
  @IsString()
  payerPhone: string;
}
