import { IsCreditCard, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CardDto {
    
    @IsCreditCard()
    number: string;

    @IsString()
    @IsNotEmpty()
    cvc: string;

    @IsNotEmpty()
    @IsNumber()
    exp_month: number;

    @IsNotEmpty()
    @IsNumber()
    exp_year: number;
}