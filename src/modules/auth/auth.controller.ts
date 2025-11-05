import { Body, Controller, Patch, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ConfirmEmailDTO,
  ForgetPasswordDTO,
  LoginDTO,
  RegisterDTO,
  ResetPasswordDTO,
} from './dto';
import { AuthFactoryService } from './factory';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly authFactoryService: AuthFactoryService,
  ) {}

  @Post('/register')
  async register(@Body() registerDTO: RegisterDTO) {
    const customer = await this.authFactoryService.createCustomer(registerDTO);
    const createdCustomer = await this.authService.register(customer);
    return {
      message: 'customer registered successfully ',
      success: true,
      data: createdCustomer,
    };
  }

  @Post('/confirm-email')
  async confirmEmail(@Body() confirmEmailDTO: ConfirmEmailDTO) {
    const customer = await this.authService.confirmEmail(confirmEmailDTO);
    return {
      message: 'email confirmed successfully',
      success: true,
    };
  }

  @Post('/login')
  async login(@Body() loginDTO: LoginDTO) {
    const token = await this.authService.login(loginDTO);
    return {
      message: 'login successfully',
      success: true,
      data: { token },
    };
  }

  @Post('/google-login')
  async googleLogin(@Body('idToken') idToken: string) {
    const customer = await this.authService.googleLogin(idToken);
    return {
      message: 'google login successfully',
      success: true,
      user: customer.customerExist,
      token: customer.token,
    };
  }

  @Post('/forget-password')
  async forgetPassword(@Body() forgetPasswordDTO: ForgetPasswordDTO) {
    await this.authService.forgetPassword(forgetPasswordDTO);
    return {
      message: 'otp sent successfully',
      success: true,
    };
  }

  @Patch('/reset-password')
  async resetPassword(@Body() resetPasswordDTO: ResetPasswordDTO) {
    await this.authService.resetPassword(resetPasswordDTO);
    return {
    message:"password reset successfully",
    success:true
    }
  }
}
