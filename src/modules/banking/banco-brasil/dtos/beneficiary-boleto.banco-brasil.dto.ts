import { Expose, Transform } from 'class-transformer';
import { DocumentTypeBoletoBancoBrasilEnum } from '../enums/document-type-boleto.banco-brasil.enum';

export class BeneficiaryBoletoBancoBrasilDto {
  /**
   * @description original name is tipoInscricao
   * @example "1"
   */
  @Expose({ name: 'tipoInscricao' })
  documentType: DocumentTypeBoletoBancoBrasilEnum;

  /**
   * @description original name is numeroInscricao
   * @example "12345678901"
   */
  @Expose({ name: 'numeroInscricao' })
  @Transform(({ value }) => value.replace(/\D/g, ''), {
    toPlainOnly: true,
  })
  documentNumber: string;

  /**
   * @description original name is nome
   * @example "Nome do beneficiário
   */
  @Expose({ name: 'nome' })
  name: string;
}
