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
    credentials: JSON.stringify({
      appKey: faker.string.numeric(15),
      clientId: faker.string.numeric(15),
      clientSecret: faker.string.numeric(15),
    }),
    issueData: {
      agreementNumber: faker.string.numeric(6),
      walletNumber: faker.string.numeric(2),
      walletVariationNumber: faker.string.numeric(6),
      modalityCode: '01',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    ...(account || {}),
  };
}
