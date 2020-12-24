import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import { ClientProxyService } from 'src/shared/services/client-proxy.service';
import { CreateOrderDto } from './dtos/create-order.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('orders')
export class OrdersController {
  private readonly clientProxyOrders: ClientProxy;

  constructor(clientProxyService: ClientProxyService) {
    this.clientProxyOrders = clientProxyService.getClientProxyInstance(
      'orders',
    );
  }

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto, @Request() req) {
    const { id: customerId } = req.user;

    await this.clientProxyOrders
      .emit('create-order', { ...createOrderDto, customerId })
      .toPromise();
  }
}
