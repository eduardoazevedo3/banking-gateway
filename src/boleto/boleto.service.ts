import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BoletoBankingService } from '../banking/boleto.banking.service';
import { CreateBoletoDto } from './dtos/create-boleto.dto';
import { Boleto } from './entities/boleto.entity';

@Injectable()
export class BoletoService {
  constructor(
    private readonly connection: DataSource,
    private readonly boletoBankingService: BoletoBankingService,
  ) {}

  async findAll(): Promise<Boleto[]> {
    return await this.connection.manager.find(Boleto<object>);
  }

  async findOne(id: number): Promise<Boleto> {
    return await this.connection.manager.findOneByOrFail(Boleto<object>, {
      id,
    });
  }

  async create(boletoDto: CreateBoletoDto): Promise<Boleto> {
    const existingBoleto = await this.connection.manager.findOneBy(Boleto, {
      issuingBank: boletoDto.issuingBank,
      ourNumber: boletoDto.ourNumber,
    });

    if (existingBoleto) {
      throw new BadRequestException([
        `ourNumber already exists for ${boletoDto.issuingBank}`,
      ]);
    }

    return await this.connection.manager.save(Boleto, {
      ...boletoDto,
    });
  }

  async register(boleto): Promise<Boleto> {
    return await this.boletoBankingService.register(boleto);
  }
}
