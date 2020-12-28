import fs from 'fs';
import path from 'path';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ClientProxyService } from 'src/shared/services/client-proxy.service';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  private readonly clientProxyOrders: ClientProxy;
  private readonly clientProxyCustomers: ClientProxy;

  constructor(
    private readonly mailerService: MailerService,
    private readonly clientProxyService: ClientProxyService,
  ) {
    this.clientProxyOrders = this.clientProxyService.getClientProxyInstance(
      'orders',
    );
    this.clientProxyCustomers = this.clientProxyService.getClientProxyInstance(
      'customers',
    );
  }

  async sendMailOrder(data: any) {
    try {
      const { customerId, orderId } = data;

      const customer = await this.clientProxyCustomers
        .send('find-customer', { id: customerId })
        .toPromise();

      const order = await this.clientProxyOrders
        .send('find-order', { id: orderId })
        .toPromise();

      const templateEmail = await fs.promises.readFile(
        path.resolve(__dirname, '..', 'templates', 'order.html'),
        'utf-8',
      );

      const htmlToSend = templateEmail
        .replace('#CUSTOMER_NAME', customer.name)
        .replace('#ORDER_ID', order._id)
        .replace('#ORDER_STATUS', order.status);

      const result = await this.mailerService.sendMail({
        to: customer.email,
        from: `ECOMMERCE <api.ecommerce@mail.com>`,
        subject: 'Atualização do pedido',
        html: htmlToSend,
      });

      this.logger.log(result);
    } catch (error) {
      this.logger.error(error);
      throw new RpcException(error.message);
    }
  }
}
