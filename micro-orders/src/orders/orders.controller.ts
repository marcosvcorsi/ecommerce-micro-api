import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @EventPattern('create-order')
  async create(@Payload() createOrderDto: CreateOrderDto) {
    await this.ordersService.create(createOrderDto);
  }
}
