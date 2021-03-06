import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashService } from 'src/shared/services/hash.service';
import { CustomersRepository } from './customers.repository';
import { AuthLoginDto } from './dtos/auth-login.dto';
import { CreateCustomerDto } from './dtos/create-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    private readonly customersRepository: CustomersRepository,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
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

  async auth(authLoginDto: AuthLoginDto) {
    const { email, password } = authLoginDto;

    const user = await this.customersRepository.findByEmail(email);

    if (!user || !(await this.hashService.compare(password, user.password))) {
      return {
        error: 'User or password does not match',
      };
    }

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }

  async findById(id: string) {
    return this.customersRepository.findById(id);
  }
}
