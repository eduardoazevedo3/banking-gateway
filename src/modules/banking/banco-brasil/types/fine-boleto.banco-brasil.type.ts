import { FineTypeBoletoBancoBrasilEnum } from '../enums/fine-type-boleto.banco-brasil.enum';

export type TFineBoletoBancoBrasil = {
  type: FineTypeBoletoBancoBrasilEnum;
  percentage?: number;
  amount?: number;
};
