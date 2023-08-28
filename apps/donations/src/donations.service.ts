import { map } from 'rxjs';
import { Inject, Injectable } from '@nestjs/common';
import { CardDto } from './dto/card.dto';
import { DonationsRepository } from './donations.repository';
import { CAMPAIGN_SERVICE, PAYMENT_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { DonateDto } from './dto/donate.dto';

@Injectable()
export class DonationsService {
  constructor(
    private readonly donationsRepository: DonationsRepository,
    @Inject(PAYMENT_SERVICE) private readonly paymentsService: ClientProxy,
    @Inject(CAMPAIGN_SERVICE) private readonly campaignService: ClientProxy
  ) {}

  donate(donateDto: DonateDto, donorId: string) {
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
            donorId: donorId,
          });
            
          await this.campaignService.emit('donation_created', {
            donationId: donation._id.toString(),
            campaignId: donateDto.campaignId,
            donationAmount,
          }).subscribe();
          
        }),
      )
  }

  getAllDonations() {
    return this.donationsRepository.find();
  }
}
