import { Body, Controller, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ClientProxyService } from 'src/shared/services/client-proxy.service';
import { CreateCustomerDto } from './dtos/create-customer.dto';

@Controller('customers')
export class CustomersController {
  private readonly clientProxyProduct: ClientProxy;

  constructor(clientProxyService: ClientProxyService) {
    this.clientProxyProduct = clientProxyService.getClientProxyInstance(
      'customers',
    );
  }

  @Post('/register')
  async register(@Body() createCustomerDto: CreateCustomerDto) {
    return this.clientProxyProduct
      .send('create-customer', createCustomerDto)
      .toPromise();
  }
}
