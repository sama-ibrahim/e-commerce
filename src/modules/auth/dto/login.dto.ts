import { IsEmail, IsNotEmpty, IsString, minLength } from 'class-validator';

export class LoginDTO {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
