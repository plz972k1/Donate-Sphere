import { IsDate, IsDefined, IsNotEmpty, IsNotEmptyObject, IsString, ValidateNested } from "class-validator";
import { CardDto } from "./card.dto";
import { Type } from "class-transformer";

export class DonateDto {
    
    @IsString()
    @IsNotEmpty()
    campaignId: string;

    @IsDefined()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => CardDto)
    card: CardDto;
}