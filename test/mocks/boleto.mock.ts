import { faker } from '@faker-js/faker';
import { Boleto } from '../../src/entities/boleto.entity';
import { BoletoIssuingBankEnum } from '../../src/modules/boleto/enums/boleto-issuing-bank.enum';
import { BoletoStatusEnum } from '../../src/modules/boleto/enums/boleto-status.enum';

export function boletoMock(boleto?: Partial<Boleto>): Boleto {
  return {
    id: faker.number.int({ min: 1 }),
    accountId: null,
    covenantId: faker.string.numeric(15),
    status: BoletoStatusEnum.PENDING,
    referenceCode: faker.string.numeric(15),
    ourNumber: faker.string.numeric(15),
    issuingBank: BoletoIssuingBankEnum.BANCO_BRASIL,
    issueData: {},
    issueDate: faker.date.recent(),
    dueDate: faker.date.soon({ days: 15 }),
    amount: faker.number.float({ min: 15, max: 1000, fractionDigits: 2 }),
    discountAmount: 0,
    fineAmount: 0,
    interestAmount: 0,
    boletoTypeCode: 99,
    boletoTypeDescription: 'Outros',
    beneficiaryType: 'CNPJ',
    beneficiaryDocument: '90.890.230/0001-66',
    beneficiaryName: 'Banking Gateway LTDA',
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
