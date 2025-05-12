import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, MaxLength } from 'class-validator';
import { ModalityCodeBoletoBancoBrasilEnum } from '../enums/modality-code-boleto.banco-brasil.enum';

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
}
