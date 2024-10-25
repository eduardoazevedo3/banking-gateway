import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RecordValidationErrorDto } from '../core/dtos/record-validation-error.dto';
import { BoletoService } from './boleto.service';
import { CreateBoletoDto } from './dtos/create-boleto.dto';
import { FindBoletoParamsDto } from './dtos/find-boleto-params.dto';
import { UpdateBoletoDto } from './dtos/update-boleto.dto';
import { Boleto } from './entities/boleto.entity';

@ApiTags('Boletos')
@Controller('boletos')
export class BoletoController {
  constructor(private readonly boletoService: BoletoService) {}

  @Get(':id/register')
  @ApiResponse({ status: HttpStatus.OK, type: Boleto })
  async register(@Param() { id }: FindBoletoParamsDto): Promise<Boleto> {
    const boleto = await this.boletoService.findOneOrFail({ id });
    await this.boletoService.register(boleto);
    return boleto;
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: [Boleto] })
  async findAll(): Promise<Boleto[]> {
    return await this.boletoService.findAll({});
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, type: Boleto })
  async findOne(@Param() { id }: FindBoletoParamsDto): Promise<Boleto> {
    return await this.boletoService.findOneOrFail({ id });
  }

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, type: Boleto })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: RecordValidationErrorDto,
  })
  async create(@Body() boleto: CreateBoletoDto): Promise<Boleto> {
    return await this.boletoService.create(boleto);
  }

  @Patch(':id')
  @ApiResponse({ status: HttpStatus.OK, type: Boleto })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: RecordValidationErrorDto,
  })
  async update(
    @Param() { id }: FindBoletoParamsDto,
    @Body() boleto: UpdateBoletoDto,
  ): Promise<Boleto> {
    return await this.boletoService.update(id, boleto);
  }
}
