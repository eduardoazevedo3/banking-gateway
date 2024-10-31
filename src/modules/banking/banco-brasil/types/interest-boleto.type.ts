import { InterestTypeBoletoBancoBrasilEnum } from '../enums/interest-type-boleto.banco-brasil.enum';

export type TInterestBoleto = {
  type: InterestTypeBoletoBancoBrasilEnum;
  percentage?: number;
  amount?: number;
};
