import { Controller, Get } from '@nestjs/common';
import { DonationsService } from './donations.service';

@Controller()
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  @Get()
  getHello(): string {
    return this.donationsService.getHello();
  }
}
