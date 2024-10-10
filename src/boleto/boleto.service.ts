import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Job, Queue } from 'bullmq';
import { DataSource, Equal } from 'typeorm';
import { CreateBoletoDto } from './dtos/create-boleto.dto';
import { Boleto } from './entities/boleto.entity';
import { BoletoIssuingBankEnum } from './enums/boleto-issuing-bank.enum';

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

  async findOneOrFail(boleto: Partial<Boleto>): Promise<Boleto> {
    return await this.connection.manager.findOneByOrFail(Boleto<object>, {
      issuingBank: Equal(boleto.issuingBank),
      id: Equal(boleto.id),
    });
  }

  async create(
    issuingBank: BoletoIssuingBankEnum,
    boletoDto: CreateBoletoDto,
  ): Promise<Boleto> {
    return await this.connection.manager.save(Boleto, {
      ...boletoDto,
      issuingBank,
    });
  }

  async register(boleto): Promise<Job> {
    return await this.boletoQueue.add('register', { boletoId: boleto.id });
  }
}
