import { IsEmail, IsString } from "class-validator";


export class ResetPasswordDTO{
    @IsEmail()
    email:string;
 

    @IsString()
    otp:string;
     
    @IsString()
    newPassword:string;

    
}