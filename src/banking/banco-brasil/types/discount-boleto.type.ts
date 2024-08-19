import { DiscountTypeBoletoBancoBrasilEnum } from '../enums/discount-type-boleto.banco-brasil.enum';

export type TDiscountBoleto = {
  type: DiscountTypeBoletoBancoBrasilEnum;
  percentage?: number;
  amount?: number;
};
