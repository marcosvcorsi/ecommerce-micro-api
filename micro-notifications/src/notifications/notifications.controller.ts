import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotificationsService } from './notifications.service';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @EventPattern('notifications-orders')
  async sendMailOrder(@Payload() data: any) {
    return this.notificationsService.sendMailOrder(data);
  }
}
