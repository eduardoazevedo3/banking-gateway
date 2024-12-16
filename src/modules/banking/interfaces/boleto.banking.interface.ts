import { Account } from '../../../entities/account.entity';
import { Boleto } from '../../../entities/boleto.entity';

export interface IBoletoBanking {
  register(account: Account, boleto: Boleto): Promise<Boleto>;
}
