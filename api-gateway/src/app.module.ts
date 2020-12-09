import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
