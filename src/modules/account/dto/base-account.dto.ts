import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { DocumentTypeEnum } from '../../../core/enums/document-type.enum';
import { AuthApiCredentialsBancoBrasilDto } from '../../banking/banco-brasil/dtos/auth-api.banco-brasil.dto';
import { IssueDataBoletoBancoBrasilDto } from '../../banking/banco-brasil/dtos/issue-data-boleto.banco-brasil.dto';

export class BaseAccountDto {
  @ApiProperty({ example: 'Sacador Pagamento S.A' })
  @IsString()
  @Length(3, 255)
  @Matches(/^[a-zA-Z.\-\s]+$/, {
    message: 'description can only contain letters, dots, hyphens and spaces',
  })
  description: string;

  @ApiProperty({
    example: DocumentTypeEnum.CNPJ,
    enum: DocumentTypeEnum,
    enumName: 'DocumentTypeEnum',
  })
  @IsEnum(DocumentTypeEnum)
  documentType: DocumentTypeEnum;

  @ApiProperty({ example: '123.456.789-09' })
  @IsString()
  @Length(14, 18)
  @Matches(/^[0-9.\-/]+$/, {
    message: 'documentNumber can only contain numbers, dots and hyphens',
  })
  documentNumber: string;

  @ApiPropertyOptional({
    example: 'Ab.12345-6789',
    description:
      'Your account reference code identifier.' +
      'Valid characters: a-z, A-Z, 0-9, dot and hyphen',
  })
  @IsString()
  @MaxLength(64)
  @Matches(/^[a-zA-Z0-9.-]+$/, {
    message:
      'referenceCode can only contain letters, numbers, dots and hyphens',
  })
  @IsOptional()
  referenceCode?: string;

  @ApiProperty({ type: AuthApiCredentialsBancoBrasilDto })
  @Type(() => AuthApiCredentialsBancoBrasilDto)
  @IsOptional()
  @ValidateNested()
  credentials?: AuthApiCredentialsBancoBrasilDto;

  @ApiProperty({ type: IssueDataBoletoBancoBrasilDto })
  @Type(() => IssueDataBoletoBancoBrasilDto)
  @IsOptional()
  @ValidateNested()
  issueData?: IssueDataBoletoBancoBrasilDto;
}
