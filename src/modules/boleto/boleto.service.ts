import { InjectQueue } from '@nestjs/bullmq';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Job, Queue } from 'bullmq';
import { DataSource, Equal, FindOptionsRelations } from 'typeorm';
import { CreateBoletoDto } from './dtos/create-boleto.dto';
import { UpdateBoletoDto } from './dtos/update-boleto.dto';
import { Boleto } from './entities/boleto.entity';

type BoletoOptions = {
  skipFind?: boolean;
  findOrFail?: boolean;
};

@Injectable()
export class BoletoService {
  constructor(
    private readonly connection: DataSource,

    @InjectQueue('boleto')
    private boletoQueue: Queue,
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
    const boletoExisting =
      boletoDto.referenceCode &&
      (await this.findOne({
        accountId: boletoDto.accountId,
        referenceCode: boletoDto.referenceCode,
      }));

    if (boletoExisting) {
      throw new BadRequestException(['Reference code already exists']);
    }

    const boleto = await this.connection.manager.save(Boleto, boletoDto);
    if (options?.skipFind) return boleto;
    return await this.findOne({ id: boleto.id });
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

  async register(boleto): Promise<Job> {
    return await this.boletoQueue.add('register', { boletoId: boleto.id });
  }
}
