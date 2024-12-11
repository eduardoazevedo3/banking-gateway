import { Account } from '../../account/entities/account.entity';
import { Boleto } from '../../boleto/entities/boleto.entity';

export interface IBoletoBanking {
  register(account: Account, boleto: Boleto): Promise<Boleto>;
}
