import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe'
import { CreateChargeDto } from '../dto/create-charge.dto';

@Injectable()
  export class PaymentsService {
    constructor( private readonly configService: ConfigService) {}

    private readonly stripe = new Stripe(
      this.configService.get('STRIPE_SECRET_KEY'),
      {
        apiVersion: "2023-08-16"
      }
    )

    async createCharge(
      { donationAmount }: CreateChargeDto,
    ) {

      const paymentIntent = await this.stripe.paymentIntents.create({
        payment_method: 'pm_card_visa',
        amount: donationAmount * 100,
        confirm: true,
        currency: 'usd',
        automatic_payment_methods: {
          "enabled": true,
          "allow_redirects": "never",
        },
        
      });

      return paymentIntent;
    }
}
