import { Boleto } from '../../src/boleto/entities/boleto.entity';
import { BoletoIssuingBankEnum } from '../../src/boleto/enums/boleto-issuing-bank.enum';
import { BoletoStatusEnum } from '../../src/boleto/enums/boleto-status.enum';

export function boletoMock(boleto?: Partial<Boleto>): Boleto {
  return {
    id: 123,
    status: BoletoStatusEnum.PENDING,
    referenceCode: '1234',
    ourNumber: '98765',
    issuingBank: BoletoIssuingBankEnum.BANCO_BRASIL,
    issueData: {},
    issueDate: new Date('2024-08-25'),
    dueDate: new Date('2024-09-10'),
    amount: 100,
    discountAmount: 0,
    fineAmount: 0,
    interestAmount: 0,
    boletoTypeCode: 99,
    boletoTypeDescription: 'Outros',
    beneficiaryType: 'CNPJ',
    beneficiaryDocument: '90.890.230/0001-66',
    beneficiaryName: 'Sacador Cobrancas LTDA',
    payerType: 'CPF',
    payerDocument: '863.829.147-70',
    payerName: 'Jose da Silva',
    payerAddress: 'Rua das Flores',
    payerAddressNumber: '123',
    payerZipCode: '14340-000',
    payerCity: 'Brodowski',
    payerNeighborhood: 'Centro',
    payerState: 'SP',
    payerPhone: '(11) 91234-0192',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...(boleto || {}),
  };
}
