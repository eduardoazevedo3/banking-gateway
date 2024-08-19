import { Expose } from 'class-transformer';
import { FineTypeBoletoBancoBrasilEnum } from '../enums/fine-type-boleto.banco-brasil.enum';

export class FineBoletoBancoBrasilDto {
  @Expose({ name: 'tipo' })
  type: FineTypeBoletoBancoBrasilEnum;

  @Expose({ name: 'data' })
  date?: string;

  @Expose({ name: 'porcentagem' })
  percentage?: number;

  @Expose({ name: 'valor' })
  amount?: number;
}
