import { Injectable } from '@nestjs/common';
import { DataSource, Equal } from 'typeorm';
import { CreateBankingCredentialDto } from './dto/create-banking-credential.dto';
import { UpdateBankingCredentialDto } from './dto/update-banking-credential.dto';
import { BankingCredential } from './entities/banking-credential.entity';

@Injectable()
export class BankingCredentialService {
  constructor(private readonly connection: DataSource) {}

  async findAll(): Promise<BankingCredential[]> {
    return await this.connection.manager.find(BankingCredential);
  }

  async findOne(id: number): Promise<BankingCredential> {
    return await this.connection.manager.findOneByOrFail(BankingCredential, {
      id: Equal(id),
    });
  }

  async create(
    bankingCredentialDto: CreateBankingCredentialDto,
  ): Promise<BankingCredential> {
    return await this.connection.manager.save(BankingCredential, {
      ...bankingCredentialDto,
    });
  }

  async update(
    id: number,
    bankingCredentialDto: UpdateBankingCredentialDto,
  ): Promise<BankingCredential> {
    const bankingCredential = await this.findOne(id);

    return await this.connection.manager.save(BankingCredential, {
      ...bankingCredential,
      ...bankingCredentialDto,
    });
  }

  async remove(id: number): Promise<void> {
    await this.connection.manager.delete(BankingCredential, id);
  }
}
