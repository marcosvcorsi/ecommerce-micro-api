import { Address } from 'cluster';
import { OrderItem, OrderStatus } from '../order.schema';

export class CreateOrderDto {
  date: Date;
  status: OrderStatus;
  customerId: string;
  customerName: string;
  address: Address;
  orderItems: OrderItem[];
}
