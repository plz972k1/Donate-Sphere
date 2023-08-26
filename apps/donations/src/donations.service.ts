import { map } from 'rxjs';
import { PaymentsService } from './../../payments/src/payments.service';
import { Inject, Injectable } from '@nestjs/common';
import { CardDto } from './dto/card.dto';
import { DonationsRepository } from './donations.repository';
import { PAYMENT_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { DonateDto } from './dto/donate.dto';

@Injectable()
export class DonationsService {
  constructor(
    private readonly donationsRepository: DonationsRepository,
    @Inject(PAYMENT_SERVICE) private readonly paymentsService: ClientProxy
  ) {}

  donate(donateDto: DonateDto, donorId: string) {
    const card: CardDto = donateDto.card;
    const amount = donateDto.amount;
    const campaignId = donateDto.campaignId;

    return this.paymentsService.send('create_charge', {
      card,
    })
      .pipe(
        map((res) => {
          return this.donationsRepository.create({
            ...donateDto,
            createdAt: new Date(),
            donorId,
          });
        }),
      )
  }
}
