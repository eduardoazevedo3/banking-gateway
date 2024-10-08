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

  @ApiProperty({ example: 'Ab 12.345-6789' })
  @Column('text')
  credentials;

  @CreateDateColumn({ type: 'datetime', name: 'created_at', precision: 3 })
  createdAt;

  @UpdateDateColumn({ type: 'datetime', name: 'updated_at', precision: 3 })
  updatedAt;
}
