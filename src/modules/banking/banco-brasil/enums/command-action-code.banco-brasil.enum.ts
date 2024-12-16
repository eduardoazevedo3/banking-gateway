export enum CommandActionCodeBancoBrasilEnum {
  /** @description Confirmação de Entrada de Boleto */
  ENTRY_CONFIRMATION = '02',

  /** @description Comando recusado (Motivo indicado na posição 087/088) */
  COMMAND_REJECTED = '03',

  /** @description Liquidado sem registro (carteira 17-tipo4) */
  SETTLED_WITHOUT_REGISTRATION = '05',

  /** @description Liquidação Normal */
  NORMAL_SETTLEMENT = '06',

  /** @description Liquidação por Conta/Parcial */
  PARTIAL_SETTLEMENT = '07',

  /** @description Liquidação por Saldo */
  BALANCE_SETTLEMENT = '08',

  /** @description Baixa de Titulo */
  WRITE_OFF = '09',

  /** @description Baixa Solicitada */
  REQUESTED_WRITE_OFF = '10',

  /** @description Boletos em Ser (constará somente do arquivo de existência de cobrança) */
  OUTSTANDING_BOLETOS = '11',

  /** @description Abatimento Concedido */
  DISCOUNT_CONCESSION = '12',

  /** @description Abatimento Cancelado */
  CANCELED_DISCOUNT = '13',

  /** @description Alteração de Vencimento do boleto */
  DUE_DATE_CHANGE = '14',

  /** @description Liquidação em Cartório */
  COURT_SETTLEMENT = '15',

  /** @description Confirmação de alteração de juros de mora */
  INTEREST_CHANGE_CONFIRMATION = '16',

  /** @description Confirmação de recebimento de instruções para protesto */
  PROTEST_INSTRUCTION_RECEIVED = '19',

  /** @description Débito em Conta */
  ACCOUNT_DEBIT = '20',

  /** @description Alteração do Nome do Sacado */
  PAYER_NAME_CHANGE = '21',

  /** @description Alteração do Endereço do Sacado */
  PAYER_ADDRESS_CHANGE = '22',

  /** @description Indicação de encaminhamento a cartório */
  COURT_FORWARDING = '23',

  /** @description Sustar Protesto */
  CANCEL_PROTEST = '24',

  /** @description Dispensar Juros de mora */
  WAIVE_INTEREST = '25',

  /** @description Alteração do número do boleto dado pelo Cedente (Seu número) */
  CHANGE_OUR_NUMBER = '26',

  /** @description Manutenção de titulo vencido */
  MAINTAIN_OVERDUE_TITLE = '28',

  /** @description Conceder desconto */
  GRANT_DISCOUNT = '31',

  /** @description Não conceder desconto */
  DO_NOT_GRANT_DISCOUNT = '32',

  /** @description Retificar desconto */
  RECTIFY_DISCOUNT = '33',

  /** @description Alterar data para desconto */
  CHANGE_DISCOUNT_DATE = '34',

  /** @description Cobrar Multa */
  APPLY_FINE = '35',

  /** @description Dispensar Multa */
  WAIVE_FINE = '36',

  /** @description Dispensar Indexador */
  WAIVE_INDEXER = '37',

  /** @description Dispensar prazo limite para recebimento */
  WAIVE_DEADLINE = '38',

  /** @description Alterar prazo limite para recebimento */
  CHANGE_DEADLINE = '39',

  /** @description Alteração do número do controle do participante */
  PARTICIPANT_CONTROL_NUMBER_CHANGE = '41',

  /** @description Alteração do número do documento do sacado (CNPJ/CPF) */
  PAYER_DOCUMENT_CHANGE = '42',

  /** @description Boleto pago com cheque devolvido */
  RETURNED_CHECK_PAYMENT = '44',

  /** @description Boleto pago com cheque, aguardando compensação */
  CHECK_AWAITING_COMPENSATION = '46',

  /** @description Registrado QR Code Pix */
  QR_CODE_PIX_REGISTERED = '61',

  /** @description Alteração de tipo de cobrança */
  BILLING_TYPE_CHANGE = '72',

  /** @description Confirmação de Instrução de Parâmetro de Pagamento Parcial */
  PARTIAL_PAYMENT_PARAMETER_CONFIRMATION = '73',

  /** @description Inclusão de Negativação */
  ADD_NEGATIVE_RECORD = '85',

  /** @description Exclusão de Negativação */
  REMOVE_NEGATIVE_RECORD = '86',

  /** @description Baixa Operacional */
  OPERATIONAL_WRITE_OFF = '93',

  /** @description Despesas de Protesto */
  PROTEST_EXPENSES = '96',

  /** @description Despesas de Sustação de Protesto */
  PROTEST_CANCELLATION_EXPENSES = '97',

  /** @description Débito de Custas Antecipadas */
  ANTICIPATED_COSTS_DEBIT = '98',
}
