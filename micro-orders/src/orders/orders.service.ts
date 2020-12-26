import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async create(createOrderDto: CreateOrderDto) {
    return this.ordersRepository.create(createOrderDto);
  }

  async findByCustomerId(customerId: string) {
    return this.ordersRepository.findByCustomerId(customerId);
  }
}
