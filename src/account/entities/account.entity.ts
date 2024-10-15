import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { Boleto } from '../../boleto/entities/boleto.entity';
import { DocumentTypeEnum } from '../../core/enums/document-type.enum';

@Entity('accounts')
export class Account {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiPropertyOptional({ example: 'Ab.12345-6789' })
  @Column('varchar', { name: 'provider_account_id' })
  providerAccountId?: string;

  @ApiPropertyOptional({ example: 'Ab.12345-6789' })
  @Column('varchar', { name: 'reference_code' })
  referenceCode?: string;

  @ApiProperty({ example: 'Sacador Pagamento S.A' })
  @Column('varchar')
  description: string;

  @ApiProperty({
    example: DocumentTypeEnum.CNPJ,
    enum: DocumentTypeEnum,
    enumName: 'DocumentTypeEnum',
  })
  @Column('enum', { name: 'document_type', enum: DocumentTypeEnum })
  documentType: DocumentTypeEnum;

  @ApiProperty({ example: '123.456.789-09' })
  @Column('varchar', { name: 'document_number' })
  documentNumber: string;

  @ApiProperty({ example: '[ENCRYPTED]' })
  @Column('text')
  credentials: string;

  @CreateDateColumn({ type: 'datetime', name: 'created_at', precision: 3 })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', name: 'updated_at', precision: 3 })
  updatedAt: Date;

  // Relations

  @OneToMany(() => Boleto, (boleto) => boleto.account)
  boletos?: Relation<Boleto>[];
}
