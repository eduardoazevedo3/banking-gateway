import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource, Equal } from 'typeorm';
import { Account } from '../../entities/account.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

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

  async findOneOrFail(id: number): Promise<Account> {
    const account = await this.connection.manager.findOneByOrFail(Account, {
      id: Equal(id),
    });

    // const credentials = account.credentials;
    // account.credentials = credentials && '[ENCRYPTED]';
    return account;
  }

  async findOne(id: number): Promise<Account> {
    const account = await this.connection.manager.findOneBy(Account, {
      id: Equal(id),
    });
    if (!account) return;

    const credentials = account.credentials;
    account.credentials = credentials && '[ENCRYPTED]';
    return account;
  }

  async create(accountDto: CreateAccountDto): Promise<Account> {
    const { credentials } = accountDto;
    const account = await this.connection.manager.save(Account, {
      ...accountDto,
      credentials: credentials && JSON.stringify(credentials),
    });
    const createdAccount = await this.findOneOrFail(account.id);

    return {
      ...createdAccount,
      credentials: JSON.parse(createdAccount.credentials),
    };
  }

  async update(id: number, accountDto: UpdateAccountDto): Promise<Account> {
    const account = await this.findOneOrFail(id);
    const { credentials } = accountDto;

    try {
      await this.connection.manager.save(Account, {
        ...account,
        ...accountDto,
        credentials: credentials && JSON.stringify(credentials),
      });

      return await this.findOneOrFail(id);
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
