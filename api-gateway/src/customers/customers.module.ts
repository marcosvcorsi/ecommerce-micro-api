import { Module } from '@nestjs/common';
import { ClientProxyModule } from 'src/shared/modules/client-proxy.module';
import { CustomersController } from './customers.controller';

@Module({
  imports: [ClientProxyModule],
  controllers: [CustomersController],
})
export class CustomersModule {}
