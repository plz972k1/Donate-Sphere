import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { DonateDto } from '@app/common';
import { CurrentUser, JwtAuthGuard, UserDto } from '@app/common';

@Controller('donations')
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('donate')
  async donate(@Body() donateDto: DonateDto, @CurrentUser() user: UserDto) {  
    return this.donationsService.donate(donateDto, user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllDonations() {
    return this.donationsService.getAllDonations();
  }

  @Get(':userId/user_donation')
  @UseGuards(JwtAuthGuard)
  async getUserDonationHistory(@Param('userId') userId: string) {
    return this.donationsService.getUserDonationHistory(userId);
  }

  @Get(':campaignId/campaign_donation')
  @UseGuards(JwtAuthGuard)
  async getCampaignDonations(@Param('campaignId') campaignId: string) {
    return this.donationsService.getCampaignDonations(campaignId);
  }
}
