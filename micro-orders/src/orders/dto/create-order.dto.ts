import { Address } from 'cluster';
import { OrderItem } from '../order.schema';

export class CreateOrderDto {
  customerId: string;
  customerName: string;
  address: Address;
  orderItems: Array<OrderItem>;
}
