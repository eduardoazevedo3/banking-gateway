import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class BoletoService {
  constructor(private connection: DataSource) {}
}
