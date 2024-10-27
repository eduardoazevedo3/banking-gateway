import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Job, Queue } from 'bullmq';
import { DataSource, Equal, FindOptionsRelations } from 'typeorm';
import { CreateBoletoDto } from './dtos/create-boleto.dto';
import { UpdateBoletoDto } from './dtos/update-boleto.dto';
import { Boleto } from './entities/boleto.entity';

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

  async findOneOrFail(
    boleto: Partial<Boleto>,
    relations: FindOptionsRelations<Boleto> | string[] = [],
  ): Promise<Boleto> {
    return await this.connection.manager.findOneOrFail(Boleto<object>, {
      where: {
        ...(boleto.accountId ? { accountId: Equal(boleto.accountId) } : {}),
        id: Equal(boleto.id),
      },
      relations,
    });
  }

  async create(boletoDto: CreateBoletoDto): Promise<Boleto> {
    const boleto = await this.connection.manager.save(Boleto, boletoDto);
    return await this.findOneOrFail({ id: boleto.id });
  }

  async update(id: number, boletoDto: UpdateBoletoDto): Promise<Boleto> {
    await this.connection.manager.save(Boleto, {
      id,
      ...boletoDto,
    });
    return await this.findOneOrFail({ id });
  }

  async register(boleto): Promise<Job> {
    return await this.boletoQueue.add('register', { boletoId: boleto.id });
  }
}
