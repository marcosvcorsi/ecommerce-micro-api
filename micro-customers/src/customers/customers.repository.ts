import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer, CustomerDocument } from './customer.schema';
import { CreateCustomerDto } from './dtos/create-customer.dto';

export class CustomersRepository {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const customer = new this.customerModel(createCustomerDto);

    return customer.save();
  }

  async findByEmail(email: string) {
    const customer = await this.customerModel.findOne({ email });

    return customer;
  }

  async findById(id: string) {
    return this.customerModel.findById(id);
  }
}
