import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { DiscountTypeBoletoBancoBrasilEnum } from '../enums/discount-type-boleto.banco-brasil.enum';
import { FineTypeBoletoBancoBrasilEnum } from '../enums/fine-type-boleto.banco-brasil.enum';
import { InterestTypeBoletoBancoBrasilEnum } from '../enums/interest-type-boleto.banco-brasil.enum';
import { ModalityCodeBoletoBancoBrasilEnum } from '../enums/modality-code-boleto.banco-brasil.enum';

class DiscountBoletoBancoBrasilDto {
  @ApiProperty({
    example: DiscountTypeBoletoBancoBrasilEnum.PERCENTAGE,
    enum: DiscountTypeBoletoBancoBrasilEnum,
    enumName: 'DiscountTypeBoletoBancoBrasilEnum',
  })
  @IsEnum(DiscountTypeBoletoBancoBrasilEnum)
  type: DiscountTypeBoletoBancoBrasilEnum;

  @ApiProperty({ example: 0.33 })
  @IsNumber()
  percentage?: number;

  @ApiProperty({ example: 100.0 })
  @IsNumber()
  amount?: number;
}

class InterestBoletoBancoBrasilDto {
  @ApiProperty({
    example: InterestTypeBoletoBancoBrasilEnum.AMOUNT_PER_DAY,
    enum: InterestTypeBoletoBancoBrasilEnum,
    enumName: 'InterestTypeBoletoBancoBrasilEnum',
  })
  @IsEnum(InterestTypeBoletoBancoBrasilEnum)
  type: InterestTypeBoletoBancoBrasilEnum;

  @ApiProperty({ example: 0.33 })
  @IsNumber()
  percentage?: number;

  @ApiProperty({ example: 100.0 })
  @IsNumber()
  amount?: number;
}

class FineBoletoBancoBrasilDto {
  @ApiProperty({
    example: FineTypeBoletoBancoBrasilEnum.PERCENTAGE,
    enum: FineTypeBoletoBancoBrasilEnum,
    enumName: 'FineTypeBoletoBancoBrasilEnum',
  })
  @IsEnum(FineTypeBoletoBancoBrasilEnum)
  type: FineTypeBoletoBancoBrasilEnum;

  @ApiProperty({ example: 0.33 })
  @IsNumber()
  percentage?: number;

  @ApiProperty({ example: 100.0 })
  @IsNumber()
  amount?: number;
}

export class IssueDataBoletoBancoBrasilDto {
  @ApiProperty({ example: '123456789' })
  @MaxLength(9)
  @IsString()
  accountNumber: string;

  @ApiProperty({ example: '1' })
  @MaxLength(1)
  @IsString()
  agencyPrefixCode: string;

  @ApiProperty({ example: '123456789' })
  @MaxLength(9)
  @IsString()
  agreementNumber: string;

  @ApiProperty({
    description: 'Billing wallet number. Indicate the type of billing service',
    example: 17,
  })
  @MaxLength(2)
  @IsString()
  walletNumber: string;

  @ApiProperty({
    description: 'Billing wallet variation number',
    example: 35,
  })
  @IsString()
  walletVariationNumber: string;

  @ApiProperty({
    example: ModalityCodeBoletoBancoBrasilEnum.SIMPLE,
    enum: ModalityCodeBoletoBancoBrasilEnum,
    enumName: 'ModalityCodeBoletoBancoBrasilEnum',
  })
  @IsEnum(ModalityCodeBoletoBancoBrasilEnum)
  modalityCode: ModalityCodeBoletoBancoBrasilEnum;

  @ApiPropertyOptional({ type: DiscountBoletoBancoBrasilDto })
  @Type(() => DiscountBoletoBancoBrasilDto)
  @IsOptional()
  @ValidateNested()
  discount?: DiscountBoletoBancoBrasilDto;

  @ApiPropertyOptional({ type: InterestBoletoBancoBrasilDto })
  @Type(() => InterestBoletoBancoBrasilDto)
  @IsOptional()
  @ValidateNested()
  interest?: InterestBoletoBancoBrasilDto;

  @ApiPropertyOptional({ type: FineBoletoBancoBrasilDto })
  @Type(() => FineBoletoBancoBrasilDto)
  @IsOptional()
  @ValidateNested()
  fine?: FineBoletoBancoBrasilDto;
}
