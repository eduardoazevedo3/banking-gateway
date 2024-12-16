export type BoletoOperationParams = {
  boletoId: number;
};

export type BoletoConciliationParams = {
  accountId: number;
  agreementNumber: string;
  startDate: Date;
  endDate: Date;
};

export type BoletoPageParams = {
  page: number;
  perPage: number;
};

export type BoletoGenericParams = BoletoConciliationParams &
  BoletoOperationParams;
