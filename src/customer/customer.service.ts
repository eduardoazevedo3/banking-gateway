import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerEntity } from './entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(private connection: DataSource) {}

  create(createCustomerDto: CreateCustomerDto) {
    console.log(createCustomerDto);
    return 'This action adds a new customer';
  }

  async findAll(): Promise<CustomerEntity[]> {
    return await this.connection.manager.find(CustomerEntity);
  }

  async findOne(id: number): Promise<CustomerEntity> {
    return await this.connection.manager.findOneByOrFail(CustomerEntity, {
      id,
    });
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    console.log(updateCustomerDto);
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
