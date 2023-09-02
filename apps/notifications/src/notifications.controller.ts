import { Controller, Get } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @EventPattern('notify_donors')
  async nofifyEmail(@Payload() data: any) {
    return this.notificationsService.notifyDonorByEmail(data);
  }
}
