import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ClientProxyService } from 'src/shared/services/client-proxy.service';
import { RedisCacheService } from 'src/shared/services/redis-cache.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  private readonly clientProxyNotifications: ClientProxy;

  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly redisCacheService: RedisCacheService,
    private readonly clientProxyService: ClientProxyService,
  ) {
    this.clientProxyNotifications = this.clientProxyService.getClientProxyInstance(
      'notifications',
    );
  }

  async create(createOrderDto: CreateOrderDto) {
    const order = await this.ordersRepository.create(createOrderDto);

    await this.redisCacheService.del(`orders-${createOrderDto.customerId}`);

    await this.clientProxyNotifications
      .emit('notifications-orders', {
        customerId: createOrderDto.customerId,
        orderId: order._id,
      })
      .toPromise();
  }

  async findByCustomerId(customerId: string) {
    const cacheKey = `orders-${customerId}`;
    let orders = await this.redisCacheService.get(cacheKey);

    if (!orders) {
      orders = await this.ordersRepository.findByCustomerId(customerId);

      await this.redisCacheService.set(cacheKey, orders);
    }

    return orders;
  }

  async findById(id: string) {
    return this.ordersRepository.findById(id);
  }
}
