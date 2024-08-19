import { Expose } from 'class-transformer';
import { DocumentTypeBoletoBancoBrasilEnum } from '../enums/document-type-boleto.banco-brasil.enum';

export class BeneficiaryBoletoBancoBrasilDto {
  @Expose({ name: 'tipoInscricao' })
  documentType: DocumentTypeBoletoBancoBrasilEnum;

  @Expose({ name: 'numeroInscricao' })
  documentNumber: string;

  @Expose({ name: 'nome' })
  name: string;
}
