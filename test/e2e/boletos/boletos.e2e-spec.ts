import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { BoletoModule } from '../../../src/boleto/boleto.module';
import { BoletoService } from '../../../src/boleto/boleto.service';
import { Boleto } from '../../../src/boleto/entities/boleto.entity';
import { boletoMock } from '../../mocks/boleto.mock';

describe('Boletos', () => {
  const boleto = boletoMock();
  const boletoService = {
    findAll: (): Boleto[] => [boleto],
  };

  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BoletoModule],
    })
      .overrideProvider(BoletoService)
      .useValue(boletoService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/GET boletos', () => {
    return request(app.getHttpServer())
      .get('/boletos')
      .expect(200)
      .expect((res) => {
        return expect(JSON.stringify(res.body)).toEqual(
          JSON.stringify([boleto]),
        );
      });
  });
});
