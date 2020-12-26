import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import { ClientProxyService } from 'src/shared/services/client-proxy.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { Order, OrderItem } from './model/Order';

@UseGuards(AuthGuard('jwt'))
@Controller('orders')
export class OrdersController {
  private readonly clientProxyOrders: ClientProxy;
  private readonly clientProxyCustomers: ClientProxy;
  private readonly clientProxyProducts: ClientProxy;

  constructor(clientProxyService: ClientProxyService) {
    this.clientProxyOrders = clientProxyService.getClientProxyInstance(
      'orders',
    );

    this.clientProxyCustomers = clientProxyService.getClientProxyInstance(
      'customers',
    );

    this.clientProxyProducts = clientProxyService.getClientProxyInstance(
      'products',
    );
  }

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto, @Request() req) {
    const { id: customerId } = req.user;

    const customer = await this.clientProxyCustomers
      .send('find-customer', {
        id: customerId,
      })
      .toPromise();

    if (!customer) {
      throw new BadRequestException('Customer not found');
    }

    const { name: customerName } = customer;

    const productsIds = createOrderDto.orderItems.map(
      (orderItem) => orderItem.productId,
    );

    const products = await this.clientProxyProducts
      .send('find-products', { ids: productsIds })
      .toPromise();

    const productItems: OrderItem[] = [];

    createOrderDto.orderItems.forEach((orderItem) => {
      const product = products.find(
        (product) => product.id === orderItem.productId,
      );

      if (!product) {
        throw new BadRequestException(
          `Product ${orderItem.productId} not found`,
        );
      }

      const { name: productName, price } = product;

      productItems.push({
        ...orderItem,
        price,
        productName,
      });
    });

    const order: Order = {
      ...createOrderDto,
      customerId,
      customerName,
      orderItems: productItems,
    };

    await this.clientProxyOrders.emit('create-order', order).toPromise();
  }
}
