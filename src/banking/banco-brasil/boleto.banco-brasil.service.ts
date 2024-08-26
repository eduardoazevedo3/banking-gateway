import { Injectable, Logger } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { Boleto } from '../../boleto/entities/boleto.entity';
import { BoletoStatusEnum } from '../../boleto/enums/boleto-status.enum';
import { IBoletoBanking } from '../interfaces/boleto.banking.interface';
import { BancoBrasilService } from './banco-brasil.service';
import { CreateBoletoBancoBrasilTransform } from './transformers/create-boleto.banco-brasil.transform';
import { TIssueDataBoleto } from './types/issue-data-boleto.type';

@Injectable()
export class BoletoBancoBrasilService
  extends BancoBrasilService
  implements IBoletoBanking
{
  async register(boleto: Boleto): Promise<Boleto> {
    Logger.log(
      '[BoletoBancoBrasilService] Registering boleto in Banco do Brasil',
    );

    const createBoletoTransform = new CreateBoletoBancoBrasilTransform();
    const boletoDto = createBoletoTransform.transform(
      boleto as Boleto<TIssueDataBoleto>,
    );
    const payload = instanceToPlain(boletoDto);
    // const responseData = await this.request(
    //   'POST',
    //   '/boleto/register',
    //   payload,
    // );

    console.log(payload);

    boleto.status = BoletoStatusEnum.PENDING;
    return boleto;
  }
}
