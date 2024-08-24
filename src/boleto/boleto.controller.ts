import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthBadRequestException } from '../banking/exceptions/auth-bad-request.exception';
import { BoletoService } from './boleto.service';
import { CreateBoletoDto } from './dtos/create-boleto.dto';
import { Boleto } from './entities/boleto.entity';

@ApiTags('Boletos')
@Controller('boletos')
export class BoletoController {
  constructor(private readonly boletoService: BoletoService) {}

  @Get(':id/register')
  @ApiResponse({ status: 200, type: Boleto })
  async register(@Param('id') id: number): Promise<Boleto> {
    try {
      const boleto = await this.boletoService.findOne(id);
      return await this.boletoService.register(boleto);
    } catch (e) {
      if (e instanceof AuthBadRequestException) {
        throw new BadRequestException(e.message);
      }
      throw e;
    }
  }

  @Get()
  @ApiResponse({ status: 200, type: Array<Boleto> })
  async findAll(): Promise<Boleto[]> {
    return await this.boletoService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: Boleto })
  async findOne(@Param('id') id: number): Promise<Boleto> {
    return await this.boletoService.findOne(id);
  }

  @Post()
  @ApiResponse({ status: 201, type: Boleto })
  async create(@Body() boleto: CreateBoletoDto): Promise<Boleto> {
    return await this.boletoService.create(boleto);
  }
}
