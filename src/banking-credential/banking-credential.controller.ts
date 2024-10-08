import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RecordValidationErrorDto } from '../core/dtos/record-validation-error.dto';
import { BankingCredentialService } from './banking-credential.service';
import { CreateBankingCredentialDto } from './dto/create-banking-credential.dto';
import { UpdateBankingCredentialDto } from './dto/update-banking-credential.dto';
import { BankingCredential } from './entities/banking-credential.entity';

@ApiTags('Banking Credentials')
@Controller('accounts/:accountId/banking-credentials')
export class BankingCredentialController {
  constructor(
    private readonly bankingCredentialService: BankingCredentialService,
  ) {}

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: [BankingCredential] })
  findAll(): Promise<BankingCredential[]> {
    return this.bankingCredentialService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, type: BankingCredential })
  findOne(@Param('id') id: string): Promise<BankingCredential> {
    return this.bankingCredentialService.findOne(+id);
  }

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, type: BankingCredential })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: RecordValidationErrorDto,
  })
  create(
    @Body() createBankingCredentialDto: CreateBankingCredentialDto,
  ): Promise<BankingCredential> {
    return this.bankingCredentialService.create(createBankingCredentialDto);
  }

  @Patch(':id')
  @ApiResponse({ status: HttpStatus.OK, type: BankingCredential })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: RecordValidationErrorDto,
  })
  update(
    @Param('id') id: string,
    @Body() updateBankingCredentialDto: UpdateBankingCredentialDto,
  ): Promise<BankingCredential> {
    return this.bankingCredentialService.update(
      +id,
      updateBankingCredentialDto,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: RecordValidationErrorDto,
  })
  remove(@Param('id') id: string): Promise<void> {
    return this.bankingCredentialService.remove(+id);
  }
}
