import { FineTypeBoletoBancoBrasilEnum } from '../enums/fine-type-boleto.banco-brasil.enum';

export type TFineBoleto = {
  type: FineTypeBoletoBancoBrasilEnum;
  percentage?: number;
  amount?: number;
};
