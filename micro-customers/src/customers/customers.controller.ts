import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CustomersService } from './customers.service';
import { AuthLoginDto } from './dtos/auth-login.dto';
import { CreateCustomerDto } from './dtos/create-customer.dto';

@Controller()
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @MessagePattern('create-customer')
  async create(@Payload() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @MessagePattern('auth-customer')
  async auth(authLoginDto: AuthLoginDto) {
    return this.customersService.auth(authLoginDto);
  }

  @MessagePattern('find-customer')
  async findById(@Payload() data: any) {
    const { id } = data;

    return this.customersService.findById(id);
  }
}
