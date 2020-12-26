import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order, OrderDocument, OrderStatus } from './order.schema';

export class OrdersRepository {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const order = new this.orderModel(createOrderDto);

    order.date = new Date();
    order.status = OrderStatus.PROCESSING;

    await order.save();

    return order;
  }
}
