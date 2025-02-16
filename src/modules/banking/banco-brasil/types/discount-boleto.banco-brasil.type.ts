import { DiscountTypeBoletoBancoBrasilEnum } from '../enums/discount-type-boleto.banco-brasil.enum';

export type TDiscountBoletoBancoBrasil = {
  type: DiscountTypeBoletoBancoBrasilEnum;
  percentage?: number;
  amount?: number;
};
