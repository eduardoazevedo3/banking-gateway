import { Injectable, Logger } from '@nestjs/common';
import { formatDate } from 'date-fns';
import { Boleto } from '../../boleto/entities/boleto.entity';
import {
  BoletoEntityTypeEnum,
  BoletoStatusEnum,
} from '../../boleto/enums/boleto.enum';
import { IBoletoBanking } from '../interfaces/boleto.banking.interface';
import { BancoBrasilService } from './banco-brasil.service';
import { CreateBoletoBancoBrasilDto } from './dtos/create-boleto.banco-brasil.dto';
import { ModalityCodeBoletoBancoBrasilEnum } from './enums/modality-code-boleto.banco-brasil.enum';
import { YesNoBoletoBancoBrasilEnum } from './enums/yes-no-boleto.banco-brasil.enum';
import { TIssueDataBoleto } from './types/issue-data-boleto.type';

@Injectable()
export class BoletoBancoBrasilService
  extends BancoBrasilService
  implements IBoletoBanking
{
  async register(boleto: Boleto): Promise<Boleto> {
    Logger.log(
      '[BoletoBancoBrasilService] Registering boleto in Banco do Brasil',
    );

    const responseData = await this.request(
      'POST',
      '/boleto/register',
      this.registerPayload(boleto as Boleto<TIssueDataBoleto>),
    );

    console.log(responseData);

    boleto.status = BoletoStatusEnum.PENDING;

    return boleto;
  }

  private registerPayload(
    boleto: Boleto<TIssueDataBoleto>,
  ): CreateBoletoBancoBrasilDto {
    return {
      agreementNumber: boleto.issueData.agreementNumber,
      walletNumber: boleto.issueData.walletNumber,
      walletVariationNumber: boleto.issueData.walletVariationNumber,
      modalityCode: boleto.issueData
        .modalityCode as ModalityCodeBoletoBancoBrasilEnum,
      issueDate: formatDate(boleto.issueDate, 'dd.MM.yyyy'),
      dueDate: formatDate(boleto.dueDate, 'dd.MM.yyyy'),
      amount: boleto.amount,
      protestDays: boleto.protestDays,
      acceptExpiredBoleto: boleto.receiptDaysLimit
        ? YesNoBoletoBancoBrasilEnum.YES
        : YesNoBoletoBancoBrasilEnum.NO,
      numeroDiasLimiteRecebimento: boleto.receiptDaysLimit,
      codigoAceite: 'A',
      codigoTipoTitulo: boleto.boletoTypeCode,
      descricaoTipoTitulo: boleto.boletoTypeDescription,
      indicadorPermissaoRecebimentoParcial: 'N',
      numeroTituloBeneficiario: boleto.referenceCode?.padStart(13, '0'),
      numeroTituloCliente: boleto.ourNumber?.padStart(20, '0'),
      desconto: this.discountPayload(boleto),
      jurosMora: this.interestPayload(boleto),
      multa: this.finePayload(boleto),
      pagador: this.payerPayload(boleto),
      beneficiarioFinal: this.beneficiaryPayload(boleto),
      indicadorPix: 'N',
    };
  }

  private discountPayload(boleto: Boleto<TIssueDataBoleto>): object {
    return {
      tipo: boleto.issueData.discount.type,
      dataExpiracao: formatDate(boleto.dueDate, 'dd.MM.yyyy'),
      porcentagem: boleto.issueData.discount.percentage,
    };
  }

  private interestPayload(boleto: Boleto<TIssueDataBoleto>): object {
    return {
      tipo: boleto.issueData.interest.type,
      porcentagem: boleto.issueData.discount.percentage,
    };
  }

  private finePayload(boleto: Boleto<TIssueDataBoleto>): object {
    return {
      tipo: boleto.issueData.fine.type,
      data: formatDate(boleto.dueDate, 'dd.MM.yyyy'),
      porcentagem: boleto.issueData.fine.percentage,
    };
  }

  private payerPayload(boleto: Boleto<TIssueDataBoleto>): object {
    return {
      tipoInscricao: boleto.payerType === BoletoEntityTypeEnum.CNPJ ? 2 : 1,
      numeroInscricao: boleto.payerDocument,
      nome: boleto.payerName,
      endereco: boleto.payerAddress,
      cep: boleto.payerZipCode,
      cidade: boleto.payerCity,
      bairro: boleto.payerNeighborhood,
      uf: boleto.payerState,
      telefone: boleto.payerPhone,
    };
  }

  private beneficiaryPayload(boleto: Boleto<TIssueDataBoleto>): object {
    return {
      tipoInscricao:
        boleto.beneficiaryType === BoletoEntityTypeEnum.CNPJ ? 2 : 1,
      numeroInscricao: boleto.beneficiaryDocument,
      nome: boleto.beneficiaryName,
    };
  }
}
