import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BoletoEntityTypeEnum } from '../enums/boleto-entity-type.enum';
import { BoletoIssuingBankEnum } from '../enums/boleto-issuing-bank.enum';
import { BoletoStatusEnum } from '../enums/boleto-status.enum';

@Entity('boletos')
export class Boleto<T = object> {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: '123456789' })
  @Column('varchar', { name: 'reference_code' })
  referenceCode: string;

  @ApiProperty({ example: '123456789' })
  @Column('varchar', { name: 'our_number' })
  ourNumber: string;

  @ApiProperty({
    example: BoletoStatusEnum.PENDING,
    enum: BoletoStatusEnum,
    enumName: 'BoletoStatusEnum',
  })
  @Column('enum', { enum: BoletoStatusEnum, default: BoletoStatusEnum.PENDING })
  status: BoletoStatusEnum;

  @ApiProperty({
    example: BoletoIssuingBankEnum.BANCO_BRASIL,
    enum: BoletoIssuingBankEnum,
    enumName: 'BoletoIssuingBankEnum',
  })
  @Column('enum', { name: 'issuing_bank', enum: BoletoIssuingBankEnum })
  issuingBank: BoletoIssuingBankEnum;

  @ApiProperty({ example: { key: 'value' } })
  @Column('json', { name: 'issue_data' })
  issueData: T;

  @ApiProperty({ example: '2024-08-10' })
  @Column('varchar', { name: 'issue_date' })
  issueDate: Date;

  @ApiProperty({ example: '2024-08-10' })
  @Column('varchar', { name: 'due_date' })
  dueDate: Date;

  @ApiProperty({ example: 100.0 })
  @Column('decimal')
  amount: number;

  @ApiProperty({ example: 10.0 })
  @Column('decimal', { name: 'discount_amount', nullable: false })
  discountAmount?: number;

  @ApiProperty({ example: 10.0 })
  @Column('decimal', { name: 'fine_amount', nullable: false })
  fineAmount?: number;

  @ApiProperty({ example: 10.0 })
  @Column('decimal', { name: 'interest_amount', nullable: false })
  interestAmount?: number;

  @ApiProperty({ example: 10.0 })
  @Column('decimal', { name: 'fee_amount', nullable: false })
  feeAmount?: number;

  @ApiProperty({ example: 30 })
  @Column('integer', { name: 'protest_days', nullable: false })
  protestDays?: number;

  @ApiProperty({ example: 30 })
  @Column('integer', { name: 'negativation_days', nullable: false })
  negativationDays?: number;

  @ApiProperty({ example: 'SERASA' })
  @Column('varchar', { name: 'negativation_agency', nullable: false })
  negativationAgency?: string;

  @ApiProperty({ example: 30 })
  @Column('integer', { name: 'receipt_days_limit', nullable: false })
  receiptDaysLimit?: number;

  @ApiProperty({ example: '123' })
  @Column('varchar', { name: 'boleto_type_code', nullable: false })
  boletoTypeCode?: number;

  @ApiProperty({ example: 'Duplicata Mercantil' })
  @Column('varchar', { name: 'boleto_type_description', nullable: false })
  boletoTypeDescription?: string;

  @ApiProperty({
    example: BoletoEntityTypeEnum.CPF,
    enum: BoletoEntityTypeEnum,
    enumName: 'BoletoEntityTypeEnum',
  })
  @Column('enum', { name: 'beneficiary_type', enum: BoletoEntityTypeEnum })
  beneficiaryType: string;

  @ApiProperty({ example: '123.345.567-09' })
  @Column('varchar', { name: 'beneficiary_document' })
  beneficiaryDocument: string;

  @ApiProperty({ example: 'Alberto Santos' })
  @Column('varchar', { name: 'beneficiary_name' })
  beneficiaryName: string;

  @ApiProperty({
    example: BoletoEntityTypeEnum.CPF,
    enum: BoletoEntityTypeEnum,
    enumName: 'BoletoEntityTypeEnum',
  })
  @Column('enum', { name: 'payer_type', enum: BoletoEntityTypeEnum })
  payerType: string;

  @ApiProperty({ example: '123.345.567-09' })
  @Column('varchar', { name: 'payer_document' })
  payerDocument: string;

  @ApiProperty({ example: 'Alberto Santos' })
  @Column('varchar', { name: 'payer_name' })
  payerName: string;

  @ApiProperty({ example: 'Rua Floriano Peixoto' })
  @Column('varchar', { name: 'payer_address' })
  payerAddress: string;

  @ApiProperty({ example: '123 | S/N' })
  @Column('varchar', { name: 'payer_address_number' })
  payerAddressNumber: string;

  @ApiProperty({ example: '12345-678' })
  @Column('varchar', { name: 'payer_zip_code' })
  payerZipCode: string;

  @ApiProperty({ example: 'São Paulo' })
  @Column('varchar', { name: 'payer_city' })
  payerCity: string;

  @ApiProperty({ example: 'Centro' })
  @Column('varchar', { name: 'payer_neighborhood' })
  payerNeighborhood: string;

  @ApiProperty({ example: 'SP' })
  @Column('varchar', { name: 'payer_state' })
  payerState: string;

  @ApiProperty({ example: '(11) 99999-9999' })
  @Column('varchar', { name: 'payer_phone' })
  payerPhone: string;

  @ApiProperty({ example: 'Rejection boleto reason' })
  @Column('text', { name: 'rejection_reason' })
  rejectionReason?: string;

  @CreateDateColumn({ type: 'datetime', name: 'created_at', precision: 3 })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', name: 'updated_at', precision: 3 })
  updatedAt: Date;
}
