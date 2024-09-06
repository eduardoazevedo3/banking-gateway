import { getQueueToken } from '@nestjs/bullmq';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getDataSourceToken } from '@nestjs/typeorm';
import { Queue, QueueEvents } from 'bullmq';
import * as request from 'supertest';
import { DataSource } from 'typeorm';
import { AppModule } from '../../../src/app.module';
import { BoletoBancoBrasilService } from '../../../src/banking/banco-brasil/boleto.banco-brasil.service';
import { BoletoBankingService } from '../../../src/banking/boleto.banking.service';
import { BoletoService } from '../../../src/boleto/boleto.service';
import { Boleto } from '../../../src/boleto/entities/boleto.entity';
import { boletoMock } from '../../mocks/boleto.mock';

describe('Boletos', () => {
  const boleto = boletoMock();
  const boletoService = {
    findAll: (): Boleto[] => [boleto],
  };

  let app: INestApplication;
  let queue: Queue;
  let queueEvents: QueueEvents;
  let boletoProviderService: BoletoBankingService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(BoletoService)
      .useValue(boletoService)
      .overrideProvider(BoletoBancoBrasilService)
      .useValue({ register: () => null })
      .compile();

    queue = module.get<Queue>(getQueueToken('boleto'));
    boletoProviderService =
      module.get<BoletoBankingService>(BoletoBankingService);
    queueEvents = new QueueEvents('boleto');
    app = module.createNestApplication();

    await queue.waitUntilReady();
    await app.init();
  });

  afterAll(async () => {
    await queueEvents.close();
    await app.close();
  });

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

  it('QUEUE Boleto processor', async () => {
    const connection = app.get<DataSource>(getDataSourceToken());
    const boleto = await connection.manager.save(Boleto, boletoMock());

    const boletoRegisterSpy = jest.spyOn(boletoProviderService, 'register');

    const job = await queue.add(
      'boleto',
      { id: boleto.id },
      { removeOnComplete: false },
    );
    await job.waitUntilFinished(queueEvents);

    expect(boletoRegisterSpy).toHaveBeenCalledTimes(1);
    expect(true).toBe(true);
  });
});
