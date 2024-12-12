import { Injectable } from '@nestjs/common';
import { Account } from '../account/entities/account.entity';
import { Boleto } from '../boleto/entities/boleto.entity';
import { BoletoFilterParams } from '../boleto/processors/boleto.processor';
import { BoletoBancoBrasilService } from './banco-brasil/boleto.banco-brasil.service';
import { IBoletoBanking } from './interfaces/boleto.banking.interface';

@Injectable()
export class BoletoBankingService implements IBoletoBanking {
  constructor(private readonly bancoBrasilService: BoletoBancoBrasilService) {}

  async register(account: Account, boleto: Boleto): Promise<Boleto> {
    return await this.bancoBrasilService.register(account, boleto);
  }

  async conciliation(
    account: Account,
    params: BoletoFilterParams,
  ): Promise<Boleto[]> {
    return await this.bancoBrasilService.conciliation(account, params);
  }
}
