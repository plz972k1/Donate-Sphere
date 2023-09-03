import { IsString } from "class-validator";

export class CampaignInfoDto {
    @IsString()
    title: string;
}