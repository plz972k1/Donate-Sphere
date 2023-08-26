import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { DonateDto } from './dto/donate.dto';
import { CurrentUser, JwtAuthGuard, UserDto } from '@app/common';

@Controller('donations')
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  @Post('donate')
  @UseGuards(JwtAuthGuard)
  async donate(@Body() donateDto: DonateDto, @CurrentUser() user: UserDto) {
    return this.donationsService.donate(donateDto, user._id);
  }
}
