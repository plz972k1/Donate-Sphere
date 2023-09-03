import { map, tap } from 'rxjs';
import { Inject, Injectable } from '@nestjs/common';
import { DonationsRepository } from './donations.repository';
import { CAMPAIGN_SERVICE, NOTIFICATION_SERVICE, PAYMENT_SERVICE, UserDto, DonateDto, CardDto } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { CampaignInfoDto } from './dto/campaign-info.dto';

@Injectable()
export class DonationsService {
  constructor(
    private readonly donationsRepository: DonationsRepository,
    @Inject(PAYMENT_SERVICE) private readonly paymentsService: ClientProxy,
    @Inject(CAMPAIGN_SERVICE) private readonly campaignService: ClientProxy,
    @Inject(NOTIFICATION_SERVICE) private readonly notificationsService: ClientProxy
  ) {}

  async donate(donateDto: DonateDto, user: UserDto) {
    const card: CardDto = donateDto.card;
    const donationAmount = donateDto.amount;

    return this.paymentsService.send('create_charge', {
      card,
      donationAmount,
    })
      .pipe(
        map(async (res) => {
          
          const donation = await this.donationsRepository.create({
            ...donateDto,
            createdAt: new Date(),
            donorId: user._id,
          });

          this.campaignService.send<CampaignInfoDto>('donation_created', {
            donationId: donation._id,
            campaignId: donateDto.campaignId,
            donationAmount,
          }).subscribe((campaign: CampaignInfoDto) => {
            const { title } = campaign;
            console.log(`title: ${title}`);

            this.notificationsService.emit('notify_donors', {
              email: user.email,
              amount: donationAmount,
              campaignTitle: title
            });   
          });

          return donation;
        }),
      )
  }

  getAllDonations() {
    return this.donationsRepository.find();
  }

  getUserDonationHistory(userId: string) {
    return this.donationsRepository.findUserDonations(userId);
  }

  getCampaignDonations(campaignId: string) {
    return this.donationsRepository.findCampaignDonations(campaignId);
  }
}
