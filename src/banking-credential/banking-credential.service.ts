import { Injectable } from '@nestjs/common';
import { DataSource, Equal } from 'typeorm';
import { AccountService } from '../account/account.service';
import { CreateBankingCredentialDto } from './dto/create-banking-credential.dto';
import { UpdateBankingCredentialDto } from './dto/update-banking-credential.dto';
import { BankingCredential } from './entities/banking-credential.entity';

@Injectable()
export class BankingCredentialService {
  constructor(
    private readonly accountService: AccountService,
    private readonly connection: DataSource,
  ) {}

  async findAll(accountId: number): Promise<Partial<BankingCredential>[]> {
    const bankingCredentials = await this.connection.manager.findBy(
      BankingCredential,
      {
        accountId: Equal(accountId),
      },
    );

    return bankingCredentials.map((bc) => {
      bc.credentials = '[ENCRYPTED]';
      return bc;
    });
  }

  async findOneOrFail(
    accountId: number,
    id: number,
  ): Promise<BankingCredential> {
    const bankingCredential = await this.connection.manager.findOneByOrFail(
      BankingCredential,
      {
        accountId: Equal(accountId),
        id: Equal(id),
      },
    );
    bankingCredential.credentials = '[ENCRYPTED]';
    return bankingCredential;
  }

  async create(
    accountId: number,
    bankingCredentialDto: CreateBankingCredentialDto,
  ): Promise<BankingCredential> {
    const account = await this.accountService.findOneOrFail(accountId);

    return await this.connection.manager.save(BankingCredential, {
      ...bankingCredentialDto,
      accountId: account.id,
    });
  }

  async update(
    accountId: number,
    id: number,
    bankingCredentialDto: UpdateBankingCredentialDto,
  ): Promise<BankingCredential> {
    const bankingCredential = await this.findOneOrFail(accountId, id);

    return await this.connection.manager.save(BankingCredential, {
      ...bankingCredential,
      ...bankingCredentialDto,
    });
  }

  async remove(accountId: number, id: number): Promise<void> {
    await this.findOneOrFail(accountId, id);
    await this.connection.manager.delete(BankingCredential, id);
  }
}
