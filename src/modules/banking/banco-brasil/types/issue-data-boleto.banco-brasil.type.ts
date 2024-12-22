import { TDiscountBoletoBancoBrasil } from './discount-boleto.banco-brasil.type';
import { TFineBoletoBancoBrasil } from './fine-boleto.banco-brasil.type';
import { TInterestBoletoBancoBrasil } from './interest-boleto.banco-brasil.type';

export type TIssueDataBoletoBancoBrasil = {
  agreementNumber: string;
  walletNumber: string;
  walletVariationNumber: string;
  modalityCode: string;
  discount?: TDiscountBoletoBancoBrasil;
  interest?: TInterestBoletoBancoBrasil;
  fine?: TFineBoletoBancoBrasil;
};
