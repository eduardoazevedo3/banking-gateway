import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { Account } from '../../account/entities/account.entity';
import { BoletoEntityTypeEnum } from '../enums/boleto-entity-type.enum';
import { BoletoIssuingBankEnum } from '../enums/boleto-issuing-bank.enum';
import { BoletoStatusEnum } from '../enums/boleto-status.enum';

@Entity('boletos')
export class Boleto<T = object> {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 123 })
  @Column('bigint', { name: 'account_id' })
  accountId: number;

  @ApiProperty({ example: 'Ab.12345-6789' })
  @Column('varchar', { name: 'covenant_id' })
  covenantId: string;

  @ApiProperty({ example: 'Ab.12345-6789' })
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

  @ApiPropertyOptional({ example: 10.0 })
  @Column('decimal', { name: 'discount_amount', nullable: false })
  discountAmount?: number;

  @ApiPropertyOptional({ example: 10.0 })
  @Column('decimal', { name: 'fine_amount', nullable: false })
  fineAmount?: number;

  @ApiPropertyOptional({ example: 10.0 })
  @Column('decimal', { name: 'interest_amount', nullable: false })
  interestAmount?: number;

  @ApiPropertyOptional({ example: 10.0 })
  @Column('decimal', { name: 'fee_amount', nullable: false })
  feeAmount?: number;

  @ApiPropertyOptional({ example: 30 })
  @Column('integer', { name: 'protest_days', nullable: false })
  protestDays?: number;

  @ApiPropertyOptional({ example: 30 })
  @Column('integer', { name: 'negativation_days', nullable: false })
  negativationDays?: number;

  @ApiPropertyOptional({ example: 'SERASA' })
  @Column('varchar', { name: 'negativation_agency', nullable: false })
  negativationAgency?: string;

  @ApiPropertyOptional({ example: 30 })
  @Column('integer', { name: 'receipt_days_limit', nullable: false })
  receiptDaysLimit?: number;

  @ApiPropertyOptional({ example: 99 })
  @Column('varchar', { name: 'boleto_type_code', nullable: false })
  boletoTypeCode?: number;

  @ApiPropertyOptional({ example: 'Duplicata Mercantil' })
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

  @ApiPropertyOptional({ example: 'Rejection boleto reason' })
  @Column('text', { name: 'rejection_reason' })
  rejectionReason?: string;

  @ApiPropertyOptional({
    example: '00190000090312855707500003001784984000001000',
  })
  @Column('varchar', { name: 'barcode' })
  barcode?: string;

  @ApiPropertyOptional({
    example: '00194984000000100000000003128557070000030017',
  })
  @Column('varchar', { name: 'digitable_line' })
  digitableLine?: string;

  @ApiPropertyOptional({ example: '8923994' })
  @Column('varchar', { name: 'billing_contract_number' })
  billingContractNumber?: string;

  @CreateDateColumn({ type: 'datetime', name: 'created_at', precision: 3 })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', name: 'updated_at', precision: 3 })
  updatedAt: Date;

  @ApiPropertyOptional({ example: '2024-08-10T00:00:00.000Z' })
  @Column('datetime', { name: 'registered_at', precision: 3 })
  registeredAt?: Date;

  // Relations

  @ManyToOne(() => Account, (account) => account.boletos)
  @JoinColumn({ name: 'account_id' })
  account?: Relation<Account>;
}
