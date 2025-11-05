import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class ConfirmEmailDTO{
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsString()
    @IsNotEmpty()
    otp:string;
}