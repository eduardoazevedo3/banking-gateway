import { faker } from '@faker-js/faker';
import { DocumentTypeEnum } from '../../src/core/enums/document-type.enum';
import { Account } from '../../src/entities/account.entity';

export function accountMock(account?: Partial<Account>): Account {
  return {
    id: faker.number.int({ min: 1 }),
    providerAccountId: faker.string.numeric(15),
    referenceCode: faker.string.numeric(15),
    description: 'Banking Gateway LTDA',
    documentType: DocumentTypeEnum.CNPJ,
    documentNumber: '90.890.230/0001-66',
    credentials: '123456',
    issueData: {},
    createdAt: new Date(),
    updatedAt: new Date(),
    ...(account || {}),
  };
}
