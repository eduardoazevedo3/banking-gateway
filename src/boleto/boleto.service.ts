import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateBoletoDto } from './dtos/create-boleto.dto';
import { Boleto } from './entities/boleto.entity';

@Injectable()
export class BoletoService {
  constructor(private connection: DataSource) {}

  async findAll(): Promise<Boleto[]> {
    return await this.connection.manager.find(Boleto);
  }

  async findOne(id: number): Promise<Boleto> {
    return await this.connection.manager.findOneByOrFail(Boleto, { id });
  }

  async create(boletoDto: CreateBoletoDto): Promise<Boleto> {
    return await this.connection.manager.save(Boleto, {
      ...boletoDto,
    });
  }
}
