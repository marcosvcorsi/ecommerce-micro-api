import { Injectable } from '@nestjs/common';
import { RedisCacheService } from 'src/shared/services/redis-cache.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly redisCacheService: RedisCacheService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    await this.ordersRepository.create(createOrderDto);

    await this.redisCacheService.del(`orders-${createOrderDto.customerId}`);
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
}
