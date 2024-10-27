import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiHeaders, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Account as AccountEntity } from '../account/entities/account.entity';
import { Account } from '../core/decorators/account.decorator';
import { RecordValidationErrorDto } from '../core/dtos/record-validation-error.dto';
import { AccountGuard } from '../core/guards/account.guard';
import { BoletoService } from './boleto.service';
import { CreateBoletoDto } from './dtos/create-boleto.dto';
import { FindBoletoParamsDto } from './dtos/find-boleto-params.dto';
import { UpdateBoletoDto } from './dtos/update-boleto.dto';
import { Boleto } from './entities/boleto.entity';

@ApiTags('Boletos')
@Controller('boletos')
@UseGuards(AccountGuard)
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
  @ApiHeaders([{ name: 'account-id', required: true }])
  async findAll(@Account() account: AccountEntity): Promise<Boleto[]> {
    return await this.boletoService.findAll({ id: account.id });
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, type: Boleto })
  @ApiHeaders([{ name: 'account-id', required: true }])
  async findOne(
    @Param() { id }: FindBoletoParamsDto,
    @Account() account: AccountEntity,
  ): Promise<Boleto> {
    return await this.boletoService.findOneOrFail({
      accountId: account.id,
      id,
    });
  }

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, type: Boleto })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: RecordValidationErrorDto,
  })
  @ApiHeaders([{ name: 'account-id', required: true }])
  async create(
    @Body() boleto: CreateBoletoDto,
    @Account() account: AccountEntity,
  ): Promise<Boleto> {
    return await this.boletoService.create({
      ...boleto,
      accountId: account.id,
    });
  }

  @Patch(':id')
  @ApiResponse({ status: HttpStatus.OK, type: Boleto })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: RecordValidationErrorDto,
  })
  @ApiHeaders([{ name: 'account-id', required: true }])
  async update(
    @Param() { id }: FindBoletoParamsDto,
    @Account() account: AccountEntity,
    @Body() boletoDto: UpdateBoletoDto,
  ): Promise<Boleto> {
    const boleto = await this.boletoService.findOneOrFail({
      accountId: account.id,
      id,
    });
    return await this.boletoService.update(boleto.id, boletoDto);
  }
}
