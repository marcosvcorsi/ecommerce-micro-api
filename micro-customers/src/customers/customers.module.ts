import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HashModule } from 'src/shared/modules/hash.module';
import { JwtModule } from 'src/shared/modules/jwt.module';
import { Customer, CustomerSchema } from './customer.schema';
import { CustomersController } from './customers.controller';
import { CustomersRepository } from './customers.repository';
import { CustomersService } from './customers.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Customer.name,
        schema: CustomerSchema,
      },
    ]),
    HashModule,
    JwtModule,
  ],
  controllers: [CustomersController],
  providers: [CustomersRepository, CustomersService],
})
export class CustomersModule {}
