import { Module } from '@nestjs/common';
import { ClientProxyService } from '../services/client-proxy.service';

@Module({
  providers: [ClientProxyService],
  exports: [ClientProxyService],
})
export class ClientProxyModule {}
