import { Injectable } from '@nestjs/common';
import { DataSource, Equal } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountService {
  constructor(private readonly connection: DataSource) {}

  async findAll(): Promise<Account[]> {
    return await this.connection.manager.find(Account);
  }

  async findOneOrFail(id: number): Promise<Account> {
    return await this.connection.manager.findOneByOrFail(Account, {
      id: Equal(id),
    });
  }

  async create(accountDto: CreateAccountDto): Promise<Account> {
    return await this.connection.manager.save(Account, {
      ...accountDto,
    });
  }

  async update(id: number, accountDto: UpdateAccountDto): Promise<Account> {
    const account = await this.findOneOrFail(id);

    return await this.connection.manager.save(Account, {
      ...account,
      ...accountDto,
    });
  }

  async remove(id: number): Promise<void> {
    await this.connection.manager.delete(Account, id);
  }
}
