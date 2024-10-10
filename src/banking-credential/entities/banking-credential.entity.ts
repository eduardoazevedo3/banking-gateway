import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('banking_credentials')
export class BankingCredential {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id;

  @ApiProperty({ example: 123 })
  @Column('bigint', { name: 'account_id' })
  accountId;

  @ApiProperty({ example: 'Ab.12345-6789' })
  @Column('varchar', { name: 'reference_code' })
  referenceCode;

  @ApiProperty({ example: '[ENCRYPTED]' })
  @Column('text')
  credentials;

  @ApiProperty({ example: '2021-09-01T00:00:00.000Z' })
  @CreateDateColumn({ type: 'datetime', name: 'created_at', precision: 3 })
  createdAt;

  @ApiProperty({ example: '2021-09-01T00:00:00.000Z' })
  @UpdateDateColumn({ type: 'datetime', name: 'updated_at', precision: 3 })
  updatedAt;
}
