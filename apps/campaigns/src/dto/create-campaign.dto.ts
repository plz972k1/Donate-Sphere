import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCampaignDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    description: string;

    @IsNumber()
    @IsNotEmpty()
    targetAmount: number;

    @IsString()
    @IsNotEmpty()
    campaignTag: string;

    @IsDate()
    @Type(() => Date)
    @IsNotEmpty()
    endDate: Date;
}
