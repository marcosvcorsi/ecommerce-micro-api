import { Body, Controller, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ClientProxyService } from 'src/shared/services/client-proxy.service';
import { CreateOrderDto } from './dtos/create-order.dto';

@Controller('orders')
export class OrdersController {
  private readonly clientProxyOrders: ClientProxy;

  constructor(clientProxyService: ClientProxyService) {
    this.clientProxyOrders = clientProxyService.getClientProxyInstance(
      'orders',
    );
  }

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    await this.clientProxyOrders
      .emit('create-order', createOrderDto)
      .toPromise();
  }
}
