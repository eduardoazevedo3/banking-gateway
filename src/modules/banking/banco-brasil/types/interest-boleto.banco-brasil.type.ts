import { InterestTypeBoletoBancoBrasilEnum } from '../enums/interest-type-boleto.banco-brasil.enum';

export type TInterestBoletoBancoBrasil = {
  type: InterestTypeBoletoBancoBrasilEnum;
  percentage?: number;
  amount?: number;
};
