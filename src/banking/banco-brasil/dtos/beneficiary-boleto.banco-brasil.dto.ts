import { Expose, Transform } from 'class-transformer';
import { DocumentTypeBoletoBancoBrasilEnum } from '../enums/document-type-boleto.banco-brasil.enum';

export class BeneficiaryBoletoBancoBrasilDto {
  @Expose({ name: 'tipoInscricao' })
  documentType: DocumentTypeBoletoBancoBrasilEnum;

  @Expose({ name: 'numeroInscricao' })
  @Transform(({ value }) => value.replace(/\D/g, ''), {
    toPlainOnly: true,
  })
  documentNumber: string;

  @Expose({ name: 'nome' })
  name: string;
}
