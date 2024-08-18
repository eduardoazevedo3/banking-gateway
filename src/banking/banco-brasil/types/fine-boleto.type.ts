import { FineTypeBoletoEnum } from '../enums/fine-type-boleto.enum';

export type TFineBoleto = {
  type: FineTypeBoletoEnum;
  percentage?: number;
  amount?: number;
};
