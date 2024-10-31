import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { BoletoIssuingBankEnum } from '../enums/boleto-issuing-bank.enum';

export class BoletoParamsDto {
  @ApiProperty({
    example: BoletoIssuingBankEnum.BANCO_BRASIL,
    enum: BoletoIssuingBankEnum,
    enumName: 'BoletoIssuingBankEnum',
  })
  @IsEnum(BoletoIssuingBankEnum)
  issuingBank: BoletoIssuingBankEnum;
}
