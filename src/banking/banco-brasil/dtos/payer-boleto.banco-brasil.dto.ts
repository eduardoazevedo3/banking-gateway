import { Expose } from 'class-transformer';

export class PayerBoletoBancoBrasilDto {
  @Expose({ name: 'tipoInscricao' })
  documentType: number;

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
