import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import { ClientProxyService } from 'src/shared/services/client-proxy.service';
import { AuthLoginDto } from './dtos/auth-login.dto';
import { CreateCustomerDto } from './dtos/create-customer.dto';

@Controller('customers')
export class CustomersController {
  private readonly clientProxyCustomers: ClientProxy;

  constructor(clientProxyService: ClientProxyService) {
    this.clientProxyCustomers = clientProxyService.getClientProxyInstance(
      'customers',
    );
  }

  @Post('/register')
  async register(@Body() createCustomerDto: CreateCustomerDto) {
    return this.clientProxyCustomers
      .send('create-customer', createCustomerDto)
      .toPromise();
  }

  @Post('/auth')
  @HttpCode(HttpStatus.OK)
  async auth(@Body() authLoginDto: AuthLoginDto) {
    const response = await this.clientProxyCustomers
      .send('auth-customer', authLoginDto)
      .toPromise();

    if (response.error) {
      throw new UnauthorizedException(response.error);
    }

    return response;
  }

  @Get('/info')
  @UseGuards(AuthGuard('jwt'))
  async getInfo(@Request() request) {
    const { id } = request.user;

    const customer = await this.clientProxyCustomers.send('find-customer', {
      id,
    });

    return customer;
  }
}
