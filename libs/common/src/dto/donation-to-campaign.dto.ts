import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class DonationToCampaignDto {

    @IsString()
    @IsNotEmpty()
    campaignId: string;

    @IsString()
    @IsNotEmpty()
    donationId: string;

    @IsNumber()
    @IsNotEmpty()
    donationAmount: number;

}