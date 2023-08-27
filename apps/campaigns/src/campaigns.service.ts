import { CampaignsRepository } from './campaigns.repository';
import { Injectable, Param } from '@nestjs/common';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { EventPattern } from '@nestjs/microservices';

@Injectable()
export class CampaignsService {
  constructor(private readonly campaignsRepository: CampaignsRepository) {
  }

  create(createCampaignDto: CreateCampaignDto, creatorId: string) {
    return this.campaignsRepository.create({
      ...createCampaignDto,
      createAt: new Date(),
      creatorId,
      currentAmount: 0,
      donations: [],
      isClosed: false,
    })
  }

  findAll() {
    return this.campaignsRepository.find();
  }

  findOne(_id: string) {
    return this.campaignsRepository.findOne({_id});
  }

  update(_id: string, updateCampaignDto: UpdateCampaignDto) {
    return this.campaignsRepository.findOneAndUpdate(
      {_id},
      {$set: updateCampaignDto},
    );
  }

  remove(_id: string) {
    return this.campaignsRepository.findOneAndDelete({_id});
  }

  @EventPattern('donation_created')
  async handleDonationCreated(data: {donationId: string, campaignId: string, donationAmount: number}) {
    const { donationId, campaignId, donationAmount } = data;

    await this.campaignsRepository.findOneAndUpdate(
      { _id: campaignId },
      { $addToSet: { donations: donationId }, $inc: { amount: donationAmount } },
    );
  }
}
