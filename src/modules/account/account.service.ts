import { Injectable } from '@nestjs/common';
import { DataSource, Equal } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

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
    const account = await this.connection.manager.save(Account, {
      ...accountDto,
    });

    return await this.findOneOrFail(account.id);
  }

  async update(id: number, accountDto: UpdateAccountDto): Promise<Account> {
    const account = await this.findOneOrFail(id);

    await this.connection.manager.save(Account, {
      ...account,
      ...accountDto,
    });

    return await this.findOneOrFail(id);
  }

  async remove(id: number): Promise<void> {
    await this.connection.manager.delete(Account, id);
  }
}
