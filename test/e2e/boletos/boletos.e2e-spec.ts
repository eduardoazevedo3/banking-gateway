import { getQueueToken } from '@nestjs/bullmq';
import { BadRequestException, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getDataSourceToken } from '@nestjs/typeorm';
import { Queue, QueueEvents } from 'bullmq';
import * as request from 'supertest';
import { DataSource } from 'typeorm';
import { AppListenerModule } from '../../../src/app.listener.module';
import { AppModule } from '../../../src/app.module';
import { BoletoBancoBrasilService } from '../../../src/banking/banco-brasil/boleto.banco-brasil.service';
import { BoletoBankingService } from '../../../src/banking/boleto.banking.service';
import { BoletoService } from '../../../src/boleto/boleto.service';
import { Boleto } from '../../../src/boleto/entities/boleto.entity';
import { BoletoStatusEnum } from '../../../src/boleto/enums/boleto-status.enum';
import { boletoMock } from '../../mocks/boleto.mock';

describe('Boletos', () => {
  const boleto = boletoMock();
  const boletoService = {
    findAll: (): Boleto[] => [boleto],
    findOne: (): Boleto => boleto,
  };

  let app: INestApplication;
  let queue: Queue;
  let queueEvents: QueueEvents;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule, AppListenerModule],
    })
      .overrideProvider(BoletoService)
      .useValue(boletoService)
      .compile();

    queue = module.get<Queue>(getQueueToken('boleto'));
    queueEvents = new QueueEvents('boleto');
    app = module.createNestApplication();

    await queue.waitUntilReady();
    await app.init();
  });

  afterAll(async () => {
    await queueEvents.close();
    await app.close();
  });

  describe('Endpoints', () => {
    it('GET boletos', () => {
      return request(app.getHttpServer())
        .get('/boletos')
        .expect(200)
        .expect((res) => {
          return expect(JSON.stringify(res.body)).toEqual(
            JSON.stringify([boleto]),
          );
        });
    });

    it('GET boletos/:id', () => {
      return request(app.getHttpServer())
        .get('/boletos/:id')
        .expect(200)
        .expect((res) => {
          return expect(JSON.stringify(res.body)).toEqual(
            JSON.stringify(boleto),
          );
        });
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
        BoletoBancoBrasilService.prototype as any,
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
