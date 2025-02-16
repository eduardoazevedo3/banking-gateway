export type BoletoOperationParams = {
  boletoId: number;
};

export type BoletoConciliationParams = {
  accountId: number;
  startDate: Date;
  endDate: Date;
};

export type BoletoPageParams = {
  page: number;
  perPage: number;
};

export type BoletoGenericParams = BoletoConciliationParams &
  BoletoOperationParams;
