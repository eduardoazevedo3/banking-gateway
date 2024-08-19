import { Expose } from 'class-transformer';
import { DiscountTypeBoletoBancoBrasilEnum } from '../enums/discount-type-boleto.banco-brasil.enum';

export class DiscountBoletoBancoBrasilDto {
  @Expose({ name: 'tipo' })
  type: DiscountTypeBoletoBancoBrasilEnum;

  @Expose({ name: 'data_expiracao' })
  expirationDate?: string;

  @Expose({ name: 'porcentagem' })
  percentage?: number;

  @Expose({ name: 'valor' })
  amount?: number;
}
