import { CampaignsRepository } from './campaigns.repository';
import { Injectable, Param } from '@nestjs/common';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { EventPattern, Payload } from '@nestjs/microservices';
import { DonateDto, DonationToCampaignDto } from '@app/common';

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

  async handleDonationCreated({ campaignId, donationId, donationAmount }: DonationToCampaignDto) {

    console.log(`campaignId: ${campaignId}`);

    return this.campaignsRepository.findOneAndUpdate(
      { _id: campaignId },
      { $addToSet: { donations: donationId }, $inc: { currentAmount: donationAmount } },
    )
  }

  async search(keyword: string) {
    const searchResults = await this.campaignsRepository.search(keyword);
    return searchResults;
  }
}
