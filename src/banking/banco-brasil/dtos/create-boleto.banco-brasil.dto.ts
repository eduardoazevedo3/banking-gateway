import { Expose, Transform } from 'class-transformer';
import { formatDate } from 'date-fns';
import { AcceptCodeBoletoBancoBrasilEnum } from '../enums/accept-code-boleto.banco-brasil.enum';
import { BoletoTypeCodeBancoBrasilEnum } from '../enums/boleto-type-code.banco-brasil.enum';
import { ModalityCodeBoletoBancoBrasilEnum } from '../enums/modality-code-boleto.banco-brasil.enum';
import { NegativationAgencyBoletoBancoBrasilEnum } from '../enums/negativation-agency-boleto.banco-brasil.enum';
import { YesNoBoletoBancoBrasilEnum } from '../enums/yes-no-boleto.banco-brasil.enum';
import { BeneficiaryBoletoBancoBrasilDto } from './beneficiary-boleto.banco-brasil.dto';
import { DiscountBoletoBancoBrasilDto } from './discount-boleto.banco-brasil.dto';
import { FineBoletoBancoBrasilDto } from './fine-boleto.banco-brasil.dto';
import { InterestBoletoBancoBrasilDto } from './interest-boleto.banco-brasil.dto';
import { PayerBoletoBancoBrasilDto } from './payer-boleto.banco-brasil.dto';

export class CreateBoletoBancoBrasilDto {
  @Expose({ name: 'numeroConvenio' })
  agreementNumber: string;

  @Expose({ name: 'numeroCarteira' })
  walletNumber?: string;

  @Expose({ name: 'numeroVariacaoCarteira' })
  walletVariationNumber?: string;

  @Expose({ name: 'codigoModalidade' })
  modalityCode?: ModalityCodeBoletoBancoBrasilEnum;

  @Expose({ name: 'dataEmissao' })
  @Transform(({ value }) => formatDate(new Date(value), 'dd.MM.yyyy'), {
    toPlainOnly: true,
  })
  issueDate?: Date;

  @Expose({ name: 'dataVencimento' })
  @Transform(({ value }) => formatDate(new Date(value), 'dd.MM.yyyy'), {
    toPlainOnly: true,
  })
  dueDate: Date;

  @Expose({ name: 'valorOriginal' })
  amount: number;

  @Expose({ name: 'quantidadeDiasProtesto' })
  protestDays?: number;

  @Expose({ name: 'numeroDiasLimiteRecebimento' })
  receiptDaysLimit?: number;

  @Expose({ name: 'quantidadeDiasNegativacao' })
  negativationDays?: number;

  @Expose({ name: 'orgaoNegativador' })
  negativationAgency?: NegativationAgencyBoletoBancoBrasilEnum;

  @Expose({ name: 'indicadorAceiteTituloVencido' })
  acceptExpiredBoleto?: YesNoBoletoBancoBrasilEnum;

  @Expose({ name: 'codigoAceite' })
  acceptCode?: AcceptCodeBoletoBancoBrasilEnum;

  @Expose({ name: 'codigoTipoTitulo' })
  boletoTypeCode?: BoletoTypeCodeBancoBrasilEnum;

  @Expose({ name: 'descricaoTipoTitulo' })
  boletoTypeDescription?: string;

  @Expose({ name: 'indicadorPermissaoRecebimentoParcial' })
  partialReceiptPermissionIndicator?: YesNoBoletoBancoBrasilEnum;

  @Expose({ name: 'numeroTituloBeneficiario' })
  referenceCode?: string;

  @Expose({ name: 'numeroTituloCliente' })
  ourNumber?: string;

  @Expose({ name: 'desconto' })
  discount: DiscountBoletoBancoBrasilDto;

  @Expose({ name: 'jurosMora' })
  interest: InterestBoletoBancoBrasilDto;

  @Expose({ name: 'multa' })
  fine: FineBoletoBancoBrasilDto;

  @Expose({ name: 'pagador' })
  payer: PayerBoletoBancoBrasilDto;

  @Expose({ name: 'beneficiarioFinal' })
  beneficiary?: BeneficiaryBoletoBancoBrasilDto;

  @Expose({ name: 'indicadorPix' })
  pixIndicator?: YesNoBoletoBancoBrasilEnum;

  @Expose({ name: 'idLocationPix' })
  idLocationPix?: number;
}
