
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
export class ForgetPasswordDTO{
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email:string;
}