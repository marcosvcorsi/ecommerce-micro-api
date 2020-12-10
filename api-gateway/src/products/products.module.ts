import { Module } from '@nestjs/common';
import { ClientProxyModule } from 'src/shared/modules/client-proxy.module';
import { ProductsController } from './products.controller';

@Module({
  imports: [ClientProxyModule],
  controllers: [ProductsController],
  providers: [],
})
export class ProductsModule {}
