import { Expose } from 'class-transformer';
import { DocumentTypeBoletoBancoBrasilEnum } from '../enums/document-type-boleto.banco-brasil.enum';

export class PayerBoletoBancoBrasilDto {
  @Expose({ name: 'tipoInscricao' })
  documentType: DocumentTypeBoletoBancoBrasilEnum;

  @Expose({ name: 'numeroInscricao' })
  documentNumber: string;

  @Expose({ name: 'nome' })
  name?: string;

  @Expose({ name: 'endereco' })
  address?: string;

  @Expose({ name: 'cep' })
  zipCode?: string;

  @Expose({ name: 'cidade' })
  city?: string;

  @Expose({ name: 'bairro' })
  neighborhood?: string;

  @Expose({ name: 'uf' })
  state?: string;

  @Expose({ name: 'telefone' })
  phone?: string;

  @Expose({ name: 'email' })
  email?: string;
}
