import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @EventPattern('create-order')
  async create(@Payload() createOrderDto: CreateOrderDto) {
    await this.ordersService.create(createOrderDto);
  }

  @MessagePattern('find-orders')
  async findAll(@Payload() data: any) {
    const { customerId } = data;

    if (customerId) {
      return this.ordersService.findByCustomerId(customerId);
    }
  }

  @MessagePattern('find-order')
  async find(@Payload() data: any) {
    const { id } = data;

    return this.ordersService.findById(id);
  }
}
