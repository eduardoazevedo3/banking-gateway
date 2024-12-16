import { Boleto } from '../../../../entities/boleto.entity';
import { BeneficiaryBoletoBancoBrasilDto } from '../dtos/beneficiary-boleto.banco-brasil.dto';
import { CreateBoletoBancoBrasilDto } from '../dtos/create-boleto.banco-brasil.dto';
import { DiscountBoletoBancoBrasilDto } from '../dtos/discount-boleto.banco-brasil.dto';
import { FineBoletoBancoBrasilDto } from '../dtos/fine-boleto.banco-brasil.dto';
import { InterestBoletoBancoBrasilDto } from '../dtos/interest-boleto.banco-brasil.dto';
import { PayerBoletoBancoBrasilDto } from '../dtos/payer-boleto.banco-brasil.dto';
import { AcceptCodeBoletoBancoBrasilEnum } from '../enums/accept-code-boleto.banco-brasil.enum';
import { DocumentTypeBoletoBancoBrasilEnum } from '../enums/document-type-boleto.banco-brasil.enum';
import { ModalityCodeBoletoBancoBrasilEnum } from '../enums/modality-code-boleto.banco-brasil.enum';
import { YesNoBoletoBancoBrasilEnum } from '../enums/yes-no-boleto.banco-brasil.enum';
import { TIssueDataBoleto } from '../types/issue-data-boleto.type';

export class CreateBoletoBancoBrasilTransform {
  transform(boleto: Boleto<TIssueDataBoleto>): CreateBoletoBancoBrasilDto {
    const boletoDto = new CreateBoletoBancoBrasilDto();

    boletoDto.agreementNumber = boleto.issueData.agreementNumber;
    boletoDto.walletNumber = boleto.issueData.walletNumber;
    boletoDto.walletVariationNumber = boleto.issueData.walletVariationNumber;
    boletoDto.modalityCode = boleto.issueData
      .modalityCode as ModalityCodeBoletoBancoBrasilEnum;
    boletoDto.issueDate = boleto.issueDate;
    boletoDto.dueDate = boleto.dueDate;
    boletoDto.amount = boleto.amount;
    boletoDto.protestDays = boleto.protestDays || undefined;
    boletoDto.acceptExpiredBoleto = boleto.receiptDaysLimit
      ? YesNoBoletoBancoBrasilEnum.YES
      : YesNoBoletoBancoBrasilEnum.NO;
    boletoDto.receiptDaysLimit = boleto.receiptDaysLimit || undefined;
    boletoDto.acceptCode = AcceptCodeBoletoBancoBrasilEnum.ACCEPTED;
    boletoDto.boletoTypeCode = boleto.boletoTypeCode;
    boletoDto.boletoTypeDescription = boleto.boletoTypeDescription;
    boletoDto.partialReceiptPermissionIndicator = YesNoBoletoBancoBrasilEnum.NO;
    boletoDto.referenceCode = boleto.referenceCode?.padStart(13, '0');
    boletoDto.ourNumber =
      `${boleto.issueData?.agreementNumber?.padStart(10, '0')}` +
      `${boleto.ourNumber?.padStart(10, '0')}`;
    boletoDto.discount = this.discountPayload(boleto);
    boletoDto.interest = this.interestPayload(boleto);
    boletoDto.fine = this.finePayload(boleto);
    boletoDto.payer = this.payerPayload(boleto);
    boletoDto.beneficiary = this.beneficiaryPayload(boleto);
    boletoDto.pixIndicator = YesNoBoletoBancoBrasilEnum.NO;

    return boletoDto;
  }

  private discountPayload(
    boleto: Boleto<TIssueDataBoleto>,
  ): DiscountBoletoBancoBrasilDto {
    if (!boleto.issueData.discount) return;

    const boletoDiscountDto = new DiscountBoletoBancoBrasilDto();
    boletoDiscountDto.type = boleto.issueData.discount.type;
    boletoDiscountDto.expirationDate = boleto.dueDate;
    boletoDiscountDto.percentage = boleto.issueData.discount.percentage;

    return boletoDiscountDto;
  }

  private interestPayload(
    boleto: Boleto<TIssueDataBoleto>,
  ): InterestBoletoBancoBrasilDto {
    if (!boleto.issueData.interest) return;

    const boletoInterestDto = new InterestBoletoBancoBrasilDto();
    boletoInterestDto.type = boleto.issueData.interest.type;
    boletoInterestDto.percentage = boleto.issueData.discount.percentage;

    return boletoInterestDto;
  }

  private finePayload(
    boleto: Boleto<TIssueDataBoleto>,
  ): FineBoletoBancoBrasilDto {
    if (!boleto.issueData.fine) return;

    const boletoFineDto = new FineBoletoBancoBrasilDto();
    boletoFineDto.type = boleto.issueData.fine.type;
    boletoFineDto.date = boleto.dueDate;
    boletoFineDto.percentage = boleto.issueData.fine.percentage;

    return boletoFineDto;
  }

  private payerPayload(
    boleto: Boleto<TIssueDataBoleto>,
  ): PayerBoletoBancoBrasilDto {
    const boletoPayerDto = new PayerBoletoBancoBrasilDto();
    boletoPayerDto.documentType =
      DocumentTypeBoletoBancoBrasilEnum[boleto.payerType];
    boletoPayerDto.documentNumber = boleto.payerDocument;
    boletoPayerDto.name = boleto.payerName;
    boletoPayerDto.address = boleto.payerAddress;
    boletoPayerDto.zipCode = boleto.payerZipCode;
    boletoPayerDto.city = boleto.payerCity;
    boletoPayerDto.neighborhood = boleto.payerNeighborhood;
    boletoPayerDto.state = boleto.payerState;
    boletoPayerDto.phone = boleto.payerPhone;

    return boletoPayerDto;
  }

  private beneficiaryPayload(
    boleto: Boleto<TIssueDataBoleto>,
  ): BeneficiaryBoletoBancoBrasilDto {
    const boletoBeneficiaryDto = new BeneficiaryBoletoBancoBrasilDto();
    boletoBeneficiaryDto.documentType =
      DocumentTypeBoletoBancoBrasilEnum[boleto.beneficiaryType];
    boletoBeneficiaryDto.documentNumber = boleto.beneficiaryDocument;
    boletoBeneficiaryDto.name = boleto.beneficiaryName;

    return boletoBeneficiaryDto;
  }
}
