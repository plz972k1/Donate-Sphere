import { Controller, Get } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotifyDonorDto } from '@app/common';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @EventPattern('notify_donors')
  async nofifyEmail(@Payload() data: NotifyDonorDto) {
    console.log(`data: ${data.amount}`)
    return this.notificationsService.notifyDonorByEmail(data);
  }
}
