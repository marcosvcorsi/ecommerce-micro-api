import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class ClientProxyService {
  constructor(private readonly configService: ConfigService) {}

  getClientProxyInstance(queue: string) {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.get<string>('RMQ_URL')],
        queue,
      },
    });
  }
}
