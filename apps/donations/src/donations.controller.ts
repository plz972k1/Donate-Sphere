import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { DonateDto } from './dto/donate.dto';
import { CurrentUser, JwtAuthGuard, UserDto } from '@app/common';

@Controller('donations')
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('donate')
  async donate(@Body() donateDto: DonateDto, @CurrentUser() user: UserDto) {
    console.log(`oy ${user._id}`)
    return this.donationsService.donate(donateDto, user._id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllDonations() {
    return this.donationsService.getAllDonations();
  }
}
