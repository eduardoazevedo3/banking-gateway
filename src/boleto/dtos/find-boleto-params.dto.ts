import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumberString } from 'class-validator';
import { BoletoIssuingBankEnum } from '../enums/boleto-issuing-bank.enum';

export class FindBoletoParamsDto {
  @ApiProperty({
    example: BoletoIssuingBankEnum.BANCO_BRASIL,
    enum: BoletoIssuingBankEnum,
    enumName: 'BoletoIssuingBankEnum',
  })
  @IsEnum(BoletoIssuingBankEnum)
  issuingBank: BoletoIssuingBankEnum;

  @ApiProperty({ example: 1, type: 'integer' })
  @IsNumberString()
  id: number;
}
