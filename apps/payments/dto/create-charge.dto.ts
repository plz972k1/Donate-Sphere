import { CardDto } from '@app/common';

export class CreateChargeDto {
    card: CardDto;
    donationAmount: number;
}