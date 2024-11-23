import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNumber } from 'class-validator';
import { BoletoStatusEnum } from '../enums/boleto-status.enum';

export class UpdateBoletoDto {
  @ApiPropertyOptional({ example: '2024-08-10' })
  @IsDateString()
  dueDate?: Date;

  @ApiPropertyOptional({ example: 100.0 })
  @IsNumber()
  amount?: number;

  @ApiPropertyOptional({
    enum: BoletoStatusEnum,
    enumName: 'BoletoStatusEnum',
    example: BoletoStatusEnum.CANCELED,
  })
  @IsEnum(BoletoStatusEnum)
  status?: BoletoStatusEnum;
}
