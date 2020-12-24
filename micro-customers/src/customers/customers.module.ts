import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { HashModule } from 'src/shared/modules/hash.module';
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
    JwtModule.registerAsync({
      useFactory: () => ({
        privateKey: process.env.JWT_PRIVATE_KEY,
        signOptions: {
          algorithm: 'RS256',
          expiresIn: '1d',
        },
      }),
    }),
    HashModule,
  ],
  controllers: [CustomersController],
  providers: [CustomersRepository, CustomersService],
})
export class CustomersModule {}
