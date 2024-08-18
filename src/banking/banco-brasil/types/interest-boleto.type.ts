import { InterestTypeBoletoEnum } from '../enums/interest-type-boleto.enum';

export type TInterestBoleto = {
  type: InterestTypeBoletoEnum;
  percentage?: number;
  amount?: number;
};
