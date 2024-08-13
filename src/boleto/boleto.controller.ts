import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BoletoService } from './boleto.service';
import { CreateBoletoDto } from './dtos/create-boleto.dto';
import { Boleto } from './entities/boleto.entity';

@ApiTags('Boletos')
@Controller('boletos')
export class BoletoController {
  constructor(private readonly boletoService: BoletoService) {}

  @Get(':id')
  @ApiResponse({ status: 200, type: Boleto })
  findOne(@Param('id') id: number): Promise<Boleto> {
    return this.boletoService.findOne(id);
  }

  @Post()
  @ApiResponse({ status: 201, type: Boleto })
  create(@Body() boleto: CreateBoletoDto): Promise<Boleto> {
    return this.boletoService.create(boleto);
  }
}
