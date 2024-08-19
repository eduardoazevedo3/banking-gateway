import { Expose } from 'class-transformer';
import { InterestTypeBoletoBancoBrasilEnum } from '../enums/interest-type-boleto.banco-brasil.enum';

export class InterestBoletoBancoBrasilDto {
  @Expose({ name: 'tipo' })
  type: InterestTypeBoletoBancoBrasilEnum;

  @Expose({ name: 'porcentagem' })
  percentage?: number;

  @Expose({ name: 'valor' })
  amount?: number;
}
