import { InjectQueue } from '@nestjs/bullmq';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Job, Queue } from 'bullmq';
import { DataSource, Equal, FindOptionsRelations } from 'typeorm';
import { Account } from '../../entities/account.entity';
import { Boleto } from '../../entities/boleto.entity';
import { CreateBoletoDto } from './dtos/create-boleto.dto';
import { UpdateBoletoDto } from './dtos/update-boleto.dto';
import { BoletoGenericParams } from './types/boleto-params.type';

type BoletoOptions = {
  skipFind?: boolean;
  findOrFail?: boolean;
};

@Injectable()
export class BoletoService {
  constructor(
    private readonly connection: DataSource,

    @InjectQueue('boleto')
    private boletoQueue: Queue<Partial<BoletoGenericParams>>,
  ) {}

  async findAll(boleto: Partial<Boleto>): Promise<Boleto[]> {
    return await this.connection.manager.findBy(Boleto<object>, boleto);
  }

  async findOne(
    boleto: Partial<Pick<Boleto, 'id' | 'accountId' | 'referenceCode'>>,
    options?: BoletoOptions,
    relations: FindOptionsRelations<Boleto> | string[] = [],
  ): Promise<Boleto> {
    return await this.connection.manager[
      options?.findOrFail ? 'findOneOrFail' : 'findOne'
    ](Boleto<object>, {
      where: {
        ...(boleto.accountId && { accountId: Equal(boleto.accountId) }),
        ...(boleto.id && { id: Equal(boleto.id) }),
        ...(boleto.referenceCode && {
          referenceCode: Equal(boleto.referenceCode),
        }),
      },
      relations,
    });
  }

  async create(
    boletoDto: CreateBoletoDto,
    options?: BoletoOptions,
  ): Promise<Boleto> {
    try {
      const boleto = await this.connection.manager.save(Boleto, boletoDto);
      if (options?.skipFind) return boleto;
      return await this.findOne({ id: boleto.id });
    } catch (error) {
      if (
        error.message.includes('idx_boletos_account_id_covenant_id_our_number')
      ) {
        throw new BadRequestException(['Reference code already exists']);
      }
      throw error;
    }
  }

  async update(
    id: number,
    boletoDto: UpdateBoletoDto,
    options?: BoletoOptions,
  ): Promise<Boleto> {
    await this.connection.manager.save(Boleto, { id, ...boletoDto });
    if (options?.skipFind) return;
    return await this.findOne({ id });
  }

  async register(boleto: Boleto): Promise<Job> {
    return await this.boletoQueue.add('register', { boletoId: boleto.id });
  }

  async conciliation(account: Account): Promise<Job> {
    return await this.boletoQueue.add('conciliation', {
      accountId: account.id,
      agreementNumber: account.providerAccountId,
      startDate: new Date('2024-11-01 00:00:00 -03:00'),
      endDate: new Date('2024-11-01 00:00:00 -03:00'),
    });
  }
}
