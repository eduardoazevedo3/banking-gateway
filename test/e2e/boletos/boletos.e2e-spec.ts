import { getQueueToken } from '@nestjs/bullmq';
import {
  BadRequestException,
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getDataSourceToken } from '@nestjs/typeorm';
import { Queue, QueueEvents } from 'bullmq';
import * as request from 'supertest';
import { DataSource } from 'typeorm';
import { AppListenerModule } from '../../../src/app.listener.module';
import { AppModule } from '../../../src/app.module';
import { BancoBrasilService } from '../../../src/banking/banco-brasil/banco-brasil.service';
import { BoletoBancoBrasilService } from '../../../src/banking/banco-brasil/boleto.banco-brasil.service';
import { BoletoBankingService } from '../../../src/banking/boleto.banking.service';
import { Boleto } from '../../../src/boleto/entities/boleto.entity';
import { BoletoIssuingBankEnum } from '../../../src/boleto/enums/boleto-issuing-bank.enum';
import { BoletoStatusEnum } from '../../../src/boleto/enums/boleto-status.enum';
import { BadRequestFilter } from '../../../src/core/filters/bad-request.filter';
import { EntityNotFoundFilter } from '../../../src/core/filters/entity-not-found.filter';
import { boletoMock } from '../../mocks/boleto.mock';

describe('Boletos', () => {
  let app: INestApplication;
  let queue: Queue;
  let queueEvents: QueueEvents;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule, AppListenerModule],
    }).compile();

    queue = module.get<Queue>(getQueueToken('boleto'));
    queueEvents = new QueueEvents('boleto');
    await queue.waitUntilReady();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new EntityNotFoundFilter(), new BadRequestFilter());
    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: '1',
    });

    await app.init();
  });

  afterAll(async () => {
    await queueEvents.close();
    await app.close();
  });

  describe('Endpoints', () => {
    let connection: DataSource;
    let boleto: Boleto;

    beforeAll(async () => {
      connection = app.get<DataSource>(getDataSourceToken());
      boleto = await connection.manager.save(Boleto, boletoMock());
    });

    it('GET v1/:issuingBank/boletos', () => {
      return request(app.getHttpServer())
        .get(`/v1/${BoletoIssuingBankEnum.BANCO_BRASIL}/boletos`)
        .expect(200)
        .expect((res) => res.body.length > 0);
    });

    it('GET v1/:issuingBank/boletos/:id', () => {
      return request(app.getHttpServer())
        .get(`/v1/${BoletoIssuingBankEnum.BANCO_BRASIL}/boletos/${boleto.id}`)
        .expect(200)
        .expect((res) => expect(res.body.id).toEqual(boleto.id));
    });

    it('POST v1/:issuingBank/boletos', () => {
      const boletoPayload = {
        ...boletoMock(),
        amount: '10.00',
        issueDate: '2024-08-10',
        dueDate: '2024-08-10',
        discountAmount: undefined,
        fineAmount: undefined,
        interestAmount: undefined,
      };

      return request(app.getHttpServer())
        .post(`/v1/${BoletoIssuingBankEnum.BANCO_BRASIL}/boletos`)
        .send(boletoPayload)
        .expect(201)
        .expect((res) => expect(res.body.id).toEqual(boletoPayload.id));
    });
  });

  describe('Queues', () => {
    let connection: DataSource;
    let boleto: Boleto;

    beforeAll(async () => {
      connection = app.get<DataSource>(getDataSourceToken());
      boleto = await connection.manager.save(Boleto, boletoMock());
    });

    it('should register the boleto sucessfully', async () => {
      const boletoRegisterSpy = jest.spyOn(
        BoletoBankingService.prototype,
        'register',
      );
      const boletoBancoBrasilSpy = jest.spyOn(
        BoletoBancoBrasilService.prototype as any,
        'request',
      );

      boletoBancoBrasilSpy.mockReturnValue(Promise.resolve({}));

      const job = await queue.add(
        'boleto',
        { boletoId: boleto.id },
        { removeOnComplete: false },
      );
      await job.waitUntilFinished(queueEvents);

      const updatedBoleto = await connection.manager.findOneBy(Boleto, {
        id: boleto.id,
      });

      expect(boletoRegisterSpy).toHaveBeenCalledTimes(1);
      expect(boletoBancoBrasilSpy).toHaveBeenCalledTimes(1);
      expect(updatedBoleto.status).toEqual(BoletoStatusEnum.OPENED);
    });

    it('should not register the boleto with error', async () => {
      const boletoBancoBrasilSpy = jest.spyOn(
        BancoBrasilService.prototype as any,
        'request',
      );

      boletoBancoBrasilSpy.mockImplementation(() => {
        new BadRequestException();
      });

      try {
        const job = await queue.add(
          'boleto',
          { boletoId: boleto.id },
          { removeOnComplete: false },
        );
        await job.waitUntilFinished(queueEvents);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });
});
