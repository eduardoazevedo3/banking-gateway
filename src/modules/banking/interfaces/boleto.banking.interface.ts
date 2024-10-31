import { Boleto } from '../../boleto/entities/boleto.entity';

export interface IBoletoBanking {
  register(boleto: Boleto): Promise<Boleto>;
}
