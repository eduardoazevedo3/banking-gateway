import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Job, Queue } from 'bullmq';
import { DataSource, Equal } from 'typeorm';
import { CreateBoletoDto } from './dtos/create-boleto.dto';
import { Boleto } from './entities/boleto.entity';
import { RecordValidationException } from './exceptions/record-validation.exception';

@Injectable()
export class BoletoService {
  constructor(
    private readonly connection: DataSource,

    @InjectQueue('boleto')
    private boletoQueue: Queue,
  ) {}

  async findAll(): Promise<Boleto[]> {
    return await this.connection.manager.find(Boleto<object>);
  }

  async findOne(id: number): Promise<Boleto> {
    return await this.connection.manager.findOneByOrFail(Boleto<object>, {
      id: Equal(id),
    });
  }

  async create(boletoDto: CreateBoletoDto): Promise<Boleto> {
    await this.validateOurNumberExists(boletoDto);
    await this.validateReferenceCodeExists(boletoDto);

    return await this.connection.manager.save(Boleto, {
      ...boletoDto,
    });
  }

  async register(boleto): Promise<Job> {
    return await this.boletoQueue.add('register', { boletoId: boleto.id });
  }

  private async validateOurNumberExists(
    boletoDto: CreateBoletoDto,
  ): Promise<void> {
    const existingBoleto = await this.connection.manager.findOneBy(Boleto, {
      accountId: Equal(boletoDto.accountId),
      covenantId: Equal(boletoDto.covenantId),
      ourNumber: Equal(boletoDto.ourNumber),
    });

    if (existingBoleto) {
      throw new RecordValidationException(
        `ourNumber already exists for this accountId and covenantId`,
      );
    }
  }

  private async validateReferenceCodeExists(
    boletoDto: CreateBoletoDto,
  ): Promise<void> {
    if (!boletoDto.referenceCode) return;

    const existingBoleto = await this.connection.manager.findOneBy(Boleto, {
      accountId: Equal(boletoDto.accountId),
      referenceCode: Equal(boletoDto.referenceCode),
    });

    if (existingBoleto) {
      throw new RecordValidationException(
        `referenceCode already exists for this accountId`,
      );
    }
  }
}
