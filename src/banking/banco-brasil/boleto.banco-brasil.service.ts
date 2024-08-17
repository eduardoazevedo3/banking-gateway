import { Injectable } from '@nestjs/common';
import { Boleto } from '../../boleto/entities/boleto.entity';
import { IBoletoBanking } from '../interfaces/boleto.banking.interface';

@Injectable()
export class BoletoBancoBrasilService implements IBoletoBanking {
  async register(): Promise<Boleto> {
    return null;
  }

  private async getAccessToken(): Promise<string> {
    return 'Access token';
  }
}
