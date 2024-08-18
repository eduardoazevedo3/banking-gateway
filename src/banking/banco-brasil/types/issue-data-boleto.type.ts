import { TDiscountBoleto } from './discount-boleto.type';
import { TFineBoleto } from './fine-boleto.type';
import { TInterestBoleto } from './interest-boleto.type';

export type TIssueDataBoleto = {
  agreementNumber: string;
  walletNumber: string;
  walletVariationNumber: string;
  modalityCode: string;
  discount: TDiscountBoleto;
  interest: TInterestBoleto;
  fine: TFineBoleto;
};
