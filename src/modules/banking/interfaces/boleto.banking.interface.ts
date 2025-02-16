import { Account } from '../../../entities/account.entity';
import { Boleto } from '../../../entities/boleto.entity';
import {
  BoletoConciliationParams,
  BoletoPageParams,
} from '../../boleto/types/boleto-params.type';

export interface IBoletoBanking {
  register(account: Account, boleto: Boleto): Promise<Boleto>;

  conciliation(
    account: Account,
    params: BoletoConciliationParams & BoletoPageParams,
  ): Promise<Boleto[]>;
}
