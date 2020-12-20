import { Injectable } from '@nestjs/common';
import { HashService } from 'src/shared/services/hash.service';
import { CustomersRepository } from './customers.repository';
import { CreateCustomerDto } from './dtos/create-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    private readonly customersRepository: CustomersRepository,
    private readonly hashService: HashService,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const hashPassword = await this.hashService.hash(
      createCustomerDto.password,
    );

    return this.customersRepository.create({
      ...createCustomerDto,
      password: hashPassword,
    });
  }
}
