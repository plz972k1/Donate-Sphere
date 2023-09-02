import { IsString } from "class-validator";

export class UserDto {

    @IsString()
    _id: string;

    @IsString()
    email: string;

    @IsString()
    password: string;
}