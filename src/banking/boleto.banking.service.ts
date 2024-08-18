import { Injectable } from '@nestjs/common';
import { Boleto } from '../boleto/entities/boleto.entity';
import { BoletoBancoBrasilService } from './banco-brasil/boleto.banco-brasil.service';
import { IBoletoBanking } from './interfaces/boleto.banking.interface';

@Injectable()
export class BoletoBankingService implements IBoletoBanking {
  constructor(private readonly bancoBrasilService: BoletoBancoBrasilService) {}

  async register(boleto: Boleto): Promise<Boleto> {
    return await this.bancoBrasilService.register(boleto);
  }
}
