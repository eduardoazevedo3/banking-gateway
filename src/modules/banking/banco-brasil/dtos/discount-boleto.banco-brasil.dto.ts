import { Expose, Transform } from 'class-transformer';
import { formatDate } from 'date-fns';
import { DiscountTypeBoletoBancoBrasilEnum } from '../enums/discount-type-boleto.banco-brasil.enum';

export class DiscountBoletoBancoBrasilDto {
  @Expose({ name: 'tipo' })
  type: DiscountTypeBoletoBancoBrasilEnum;

  @Expose({ name: 'data_expiracao' })
  @Transform(({ value }) => formatDate(new Date(value), 'dd.MM.yyyy'), {
    toPlainOnly: true,
  })
  expirationDate?: Date;

  @Expose({ name: 'porcentagem' })
  percentage?: number;

  @Expose({ name: 'valor' })
  amount?: number;
}
