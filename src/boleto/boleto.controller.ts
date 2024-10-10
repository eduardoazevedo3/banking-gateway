import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RecordValidationErrorDto } from '../core/dtos/record-validation-error.dto';
import { BoletoService } from './boleto.service';
import { CreateBoletoDto } from './dtos/create-boleto.dto';
import { Boleto } from './entities/boleto.entity';
import { BoletoIssuingBankEnum } from './enums/boleto-issuing-bank.enum';

@ApiTags('Boletos')
@Controller(':issuingBank/boletos')
export class BoletoController {
  constructor(private readonly boletoService: BoletoService) {}

  @Get(':id/register')
  @ApiResponse({ status: HttpStatus.OK, type: Boleto })
  async register(
    @Param('issuingBank') issuingBank: BoletoIssuingBankEnum,
    @Param('id') id: number,
  ): Promise<Boleto> {
    const boleto = await this.boletoService.findOneOrFail({ issuingBank, id });
    await this.boletoService.register(boleto);
    return boleto;
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: [Boleto] })
  async findAll(
    @Param('issuingBank') issuingBank: BoletoIssuingBankEnum,
  ): Promise<Boleto[]> {
    return await this.boletoService.findAll({ issuingBank });
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, type: Boleto })
  async findOne(
    @Param('issuingBank') issuingBank: BoletoIssuingBankEnum,
    @Param('id') id: number,
  ): Promise<Boleto> {
    return await this.boletoService.findOneOrFail({ issuingBank, id });
  }

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, type: Boleto })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: RecordValidationErrorDto,
  })
  async create(
    @Param('issuingBank') issuingBank: BoletoIssuingBankEnum,
    @Body() boleto: CreateBoletoDto,
  ): Promise<Boleto> {
    return await this.boletoService.create(issuingBank, boleto);
  }
}
