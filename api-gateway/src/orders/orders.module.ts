import { Module } from '@nestjs/common';
import { ClientProxyModule } from 'src/shared/modules/client-proxy.module';
import { OrdersController } from './orders.controller';

@Module({
  imports: [ClientProxyModule],
  controllers: [OrdersController],
})
export class OrdersModule {}
