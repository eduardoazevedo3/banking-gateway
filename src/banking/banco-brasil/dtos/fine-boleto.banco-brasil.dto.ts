import { Expose, Transform } from 'class-transformer';
import { formatDate } from 'date-fns';
import { FineTypeBoletoBancoBrasilEnum } from '../enums/fine-type-boleto.banco-brasil.enum';

export class FineBoletoBancoBrasilDto {
  @Expose({ name: 'tipo' })
  type: FineTypeBoletoBancoBrasilEnum;

  @Expose({ name: 'data' })
  @Transform(({ value }) => formatDate(new Date(value), 'dd.MM.yyyy'), {
    toPlainOnly: true,
  })
  date?: Date;

  @Expose({ name: 'porcentagem' })
  percentage?: number;

  @Expose({ name: 'valor' })
  amount?: number;
}
