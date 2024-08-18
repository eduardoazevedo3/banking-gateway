import { DiscountTypeBoletoEnum } from '../enums/discount-type-boleto.enum';

export type TDiscountBoleto = {
  type: DiscountTypeBoletoEnum;
  percentage?: number;
  amount?: number;
};
