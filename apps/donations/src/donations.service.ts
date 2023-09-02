import { map } from 'rxjs';
import { Inject, Injectable } from '@nestjs/common';
import { DonationsRepository } from './donations.repository';
import { CAMPAIGN_SERVICE, NOTIFICATION_SERVICE, PAYMENT_SERVICE, UserDto, DonateDto, CardDto } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';

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

          this.notificationsService.emit('notify_donors', {
            email: user.email.toString(),
          });
            
          this.campaignService.emit('donation_created', {
            donationId: donation._id.toString(),
            campaignId: donateDto.campaignId,
            donationAmount,
          });
          
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
