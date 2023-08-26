import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { CurrentUser, JwtAuthGuard, UserDto } from '@app/common';

@Controller('campaigns')
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createCampaignDto: CreateCampaignDto, @CurrentUser() user: UserDto ) {
    return this.campaignsService.create(createCampaignDto, user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.campaignsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') _id: string) {
    return this.campaignsService.findOne(""+_id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') _id: string, @Body() updateCampaignDto: UpdateCampaignDto) {
    return this.campaignsService.update(""+_id, updateCampaignDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') _id: string) {
    return this.campaignsService.remove(""+_id);
  }
}
