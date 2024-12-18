export type BoletoOperationParams = {
  boletoId: number;
};

export type BoletoConciliationParams = {
  accountId: number;
  agreementNumber: string;
  startDate: Date;
  endDate: Date;
  accountNumber: number;
  agencyPrefixCode: number;
  billingWalletNumber: number;
  billingWalletVariationNumber: number;
};

export type BoletoPageParams = {
  page: number;
  perPage: number;
};

export type BoletoGenericParams = BoletoConciliationParams &
  BoletoOperationParams;
