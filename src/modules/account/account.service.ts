import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource, Equal } from 'typeorm';
import { Account } from '../../entities/account.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

type AccountOptions = {
  encrypted?: boolean;
  findOrFail?: boolean;
};

@Injectable()
export class AccountService {
  constructor(private readonly connection: DataSource) {}

  async findAll(): Promise<Account[]> {
    const accounts = await this.connection.manager.find(Account);

    return accounts.map((a) => {
      a.credentials = a.credentials && '[ENCRYPTED]';
      return a;
    });
  }

  async findOne(id: number, options?: AccountOptions): Promise<Account> {
    const account = await this.connection.manager[
      options?.findOrFail ? 'findOneByOrFail' : 'findOneBy'
    ](Account, { id: Equal(id) });

    if (!account && !options?.findOrFail) return;

    if (options?.encrypted !== false) {
      const credentials = account.credentials;
      account.credentials = credentials && '[ENCRYPTED]';
    }
    return account;
  }

  async create(accountDto: CreateAccountDto): Promise<Account> {
    try {
      const { credentials } = accountDto;
      const account = await this.connection.manager.save(Account, {
        ...accountDto,
        credentials: credentials && JSON.stringify(credentials),
      });

      const createdAccount = await this.findOne(account.id, {
        findOrFail: true,
        encrypted: false,
      });

      return {
        ...createdAccount,
        credentials: JSON.parse(createdAccount.credentials),
      };
    } catch (error) {
      if (error.message.includes('idx_accounts_reference_code')) {
        throw new BadRequestException(['Reference code already exists']);
      }
      throw error;
    }
  }

  async update(id: number, accountDto: UpdateAccountDto): Promise<Account> {
    const account = await this.findOne(id, { findOrFail: true });
    const { credentials } = accountDto;

    try {
      const updatedAccount = await this.connection.manager.save(Account, {
        ...account,
        ...accountDto,
        credentials: credentials && JSON.stringify(credentials),
      });

      return {
        ...updatedAccount,
        credentials: credentials && '[ENCRYPTED]',
      };
    } catch (error) {
      if (error.message.includes('idx_accounts_provider_account_id')) {
        throw new BadRequestException(['providerAccountId already exists']);
      }
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    await this.connection.manager.delete(Account, id);
  }
}
