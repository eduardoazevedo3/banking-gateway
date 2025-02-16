import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

const ENV_FILE_PATH = `../.env${(process.env.NODE_ENV && `.${process.env.NODE_ENV}`) || ''}`;
dotenv.config({ path: ENV_FILE_PATH });

export const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  migrations: ['./migrations/*.ts'],
  entities: ['../src/**/*.entity.ts'],
});
