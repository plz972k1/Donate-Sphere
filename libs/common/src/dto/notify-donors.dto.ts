import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class NotifyDonorDto {

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @IsString()
    @IsNotEmpty()
    campaignTitle: string;
}