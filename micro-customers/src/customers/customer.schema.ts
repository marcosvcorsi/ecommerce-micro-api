import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CustomerDocument = Customer & Document;

type Address = {
  name?: string;
  zipCode: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  additionalDetails?: string;
};

@Schema()
export class Customer {
  @Prop()
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  addresses: Address[];
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
