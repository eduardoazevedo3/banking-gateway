import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RecordValidationErrorDto } from '../core/dtos/record-validation-error.dto';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

@ApiTags('Accounts')
@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  @ApiResponse({ status: 200, type: [Account] })
  async findAll(): Promise<Account[]> {
    return this.accountService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: Account })
  async findOne(@Param('id') id: string): Promise<Account> {
    return this.accountService.findOne(+id);
  }

  @Post()
  @ApiResponse({ status: 201, type: Account })
  @ApiResponse({ status: 400, type: RecordValidationErrorDto })
  async create(@Body() createAccountDto: CreateAccountDto): Promise<Account> {
    return this.accountService.create(createAccountDto);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, type: Account })
  @ApiResponse({ status: 400, type: RecordValidationErrorDto })
  async update(
    @Param('id') id: string,
    @Body() updateAccountDto: UpdateAccountDto,
  ): Promise<Account> {
    return this.accountService.update(+id, updateAccountDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, type: Account })
  @ApiResponse({ status: 400, type: RecordValidationErrorDto })
  async remove(@Param('id') id: string): Promise<void> {
    await this.accountService.remove(+id);
  }
}
