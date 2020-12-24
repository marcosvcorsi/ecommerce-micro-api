import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './shared/strategy/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    ProductsModule,
    CustomersModule,
    OrdersModule,
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {}
