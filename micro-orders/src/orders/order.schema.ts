import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum OrderStatus {
  PROCESSING = 'processing',
  CONFIRMED = 'confirmed',
  TRANSPORTING = 'transporting',
  CANCEL = 'cancel',
  DONE = 'done',
}

export type OrderItem = {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
};

export type Address = {
  zipCode: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  additionalDetails?: string;
};

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop()
  date: Date;

  @Prop()
  status: OrderStatus;

  @Prop()
  customerId: string;

  @Prop()
  customerName: string;

  @Prop({ type: Types.Map })
  address: Address;

  @Prop()
  orderItems: OrderItem[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
