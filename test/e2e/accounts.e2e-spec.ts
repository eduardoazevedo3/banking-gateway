import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getDataSourceToken } from '@nestjs/typeorm';
import { useContainer } from 'class-validator';
import * as request from 'supertest';
import { DataSource } from 'typeorm';
import { AppListenerModule } from '../../src/app.listener.module';
import { AppModule } from '../../src/app.module';
import { BadRequestFilter } from '../../src/core/filters/bad-request.filter';
import { EntityNotFoundFilter } from '../../src/core/filters/entity-not-found.filter';
import { Account } from '../../src/modules/account/entities/account.entity';
import { accountMock } from '../mocks/account.mock';

describe('Accounts', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule, AppListenerModule],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new EntityNotFoundFilter(), new BadRequestFilter());
    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: '1',
    });
    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Endpoints', () => {
    let connection: DataSource;
    let account: Account;

    beforeAll(async () => {
      connection = app.get<DataSource>(getDataSourceToken());
      account = await connection.manager.save(Account, accountMock());
    });

    it('GET v1/accounts', () => {
      return request(app.getHttpServer())
        .get(`/v1/accounts`)
        .expect(200)
        .expect((res) => res.body.length > 0);
    });

    it('GET v1/accounts/:id', () => {
      return request(app.getHttpServer())
        .get(`/v1/accounts/${account.id}`)
        .expect(200)
        .expect((res) => expect(res.body.id).toEqual(account.id));
    });

    it('POST v1/accounts', () => {
      const accountPayload = accountMock();

      return request(app.getHttpServer())
        .post(`/v1/accounts`)
        .send(accountPayload)
        .expect(201)
        .expect((res) => expect(res.body.id).toEqual(accountPayload.id));
    });

    it('POST v1/accounts with invalid payload', () => {
      const accountPayload = accountMock({ description: null });

      return request(app.getHttpServer())
        .post(`/v1/accounts`)
        .send(accountPayload)
        .expect(400)
        .expect((res) => expect(res.body.message).toBeDefined());
    });

    it('PATCH v1/accounts/:id', () => {
      const accountPayload = { ...account, description: 'Test' };

      return request(app.getHttpServer())
        .patch(`/v1/accounts/${account.id}`)
        .send(accountPayload)
        .expect(200)
        .expect((res) =>
          expect(res.body.description).toEqual(accountPayload.description),
        );
    });

    it('PATCH v1/accounts/:id with invalid payload', () => {
      const accountPayload = { ...account, description: null };

      return request(app.getHttpServer())
        .patch(`/v1/accounts/${account.id}`)
        .send(accountPayload)
        .expect(400)
        .expect((res) => expect(res.body.message).toBeDefined());
    });

    it('DELETE v1/accounts/:id', async () => {
      const createdAccount = await connection.manager.save(
        Account,
        accountMock(),
      );

      return request(app.getHttpServer())
        .delete(`/v1/accounts/${createdAccount.id}`)
        .expect(204);
    });
  });
});
