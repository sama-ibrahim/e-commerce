import { CustomerRepository } from '@models/index';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CustomerEntity } from './entities/auth.entity';
import { generateExpiryDate, generateOtp, sendMail } from '@common/helpers';
import { LoginDTO } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ConfirmEmailDTO, ResetPasswordDTO } from './dto';
import { OAuth2Client } from 'google-auth-library';
import { ForgetPasswordDTO } from './dto/forgot.password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  //register-------------------

  async register(customer: CustomerEntity) {
    //check existence
    const customerExist = await this.customerRepository.getOne({
      email: customer.email,
    });

    if (customerExist) {
      throw new ConflictException('customer already exists');
    }

    // save into DB
    const createdCustomer = await this.customerRepository.create(customer);

    //send email
    try {
      await sendMail({
        to: customer.email,
        subject: 'confirm email',
        html: `<h1>Your OTP is ${customer.otp}</h1>`,
      });
    } catch (error) {
      console.error('Failed to send email:', error.message);
    }

    const { password, otp, otpExpiry, ...customerObj } = JSON.parse(
      JSON.stringify(createdCustomer),
    ); //deep copy - remove some info

    return customerObj as CustomerEntity;
  }

  //confirm email

  async confirmEmail(confirmEmailDTO: ConfirmEmailDTO) {
    //check user existence
    const customerExist = await this.customerRepository.getOne({
      email: confirmEmailDTO.email,
    });
    if (!customerExist) {
      throw new NotFoundException('user not found');
    }

    //check otp
    if (customerExist.otp != confirmEmailDTO.otp) {
      throw new UnauthorizedException('invalid otp');
    }

    //check otp Expiry
    if (customerExist.otpExpiry < new Date()) {
      throw new BadRequestException('expired otp');
    }

    //update user
    const updatedCustomer = await this.customerRepository.updateOne(
      { email: confirmEmailDTO.email },
      { isVerified: true, $unset: { otp: '', otpExpiry: '' } },
    );
  }

  //login------------------

  async login(loginDTO: LoginDTO) {
    //check email
    const customerExist = await this.customerRepository.getOne({
      email: loginDTO.email,
    });

    //check pass >> email and pass checking sequentially >> bug fix >>security wise
    const match = await bcrypt.compare(
      loginDTO.password,
      customerExist?.password || '',
    );

    if (!customerExist) {
      throw new UnauthorizedException('invalid credentials');
    }

    if (!match) {
      throw new UnauthorizedException('invalid credentials');
    }

    //generate token
    const token = this.jwtService.sign(
      {
        _id: customerExist._id,
        role: 'Customer',
        email: customerExist.email,
      },
      {
        secret: this.configService.get('access').jwt_secret,
        expiresIn: '1d',
      },
    );

    return token;
  }

  //google login
  async googleLogin(idToken: string) {
    const client = new OAuth2Client(
      '117839348589-vtq7vq4ok3gms83jc7sm45nh5b3cq699.apps.googleusercontent.com',
    );

    //  Verify the token from Google
    const ticket = await client.verifyIdToken({ idToken });
    const payload = ticket.getPayload(); // { email, name, picture, ... }

    if (!payload?.email) {
      throw new BadRequestException('Invalid Google account data');
    }

    //  Check if user already exists
    let customerExist = await this.customerRepository.getOne({
      email: payload.email,
    });

    //  If not, create new user
    if (!customerExist) {
      customerExist = (await this.customerRepository.create({
        email: payload.email,
        userName: payload.name,
        userAgent: 'google',
        otp: '',
        otpExpiry: new Date(),
        isVerified: true,
      })) as any;
    }

    // Generate JWT token
    const token = this.jwtService.sign(
      {
        _id: customerExist!._id,
        role: 'Customer',
        email: customerExist!.email,
      },
      {
        secret: this.configService.get('access').jwt_secret,
        expiresIn: '1d',
      },
    );

    return { customerExist, token };
  }

  //forgot password
  async forgetPassword(forgetPasswordDTO: ForgetPasswordDTO) {
    //generate otp , otpExpiry
    const otp = generateOtp();
    const otpExpiry = generateExpiryDate(60 * 60 * 1000);

    //check user Existence
    const customerExist = await this.customerRepository.findOneAndUpdate(
      { email: forgetPasswordDTO.email },
      { otp, otpExpiry },
      { new: true },
    );

   if(!customerExist){
    throw new NotFoundException("email not found")
   }

   //send mail >>otp
   await sendMail({
    to:forgetPasswordDTO.email,
    subject:"new otp",
    html:`<h1> your otp to reset your password is ${otp} <h1>`

   })
   return ;
   
  }

  //reset password
  async resetPassword (resetPasswordDTO:ResetPasswordDTO){

    //check user Existence
    const customerExist = await this.customerRepository.getOne({
      email:resetPasswordDTO.email
    });
    if(!customerExist){
      throw new NotFoundException("email not found")
    }
    //check otp
    if(customerExist?.otp != resetPasswordDTO.otp){
      throw new UnauthorizedException("invalid otp")
    }

 // check otp expiry
if (customerExist.otpExpiry < new Date()) {
  throw new UnauthorizedException('Expired OTP');
}
  //update Password
  customerExist.password = await bcrypt.hash(resetPasswordDTO.newPassword, 10);

  //remove otp and otpExpiry
  customerExist.otp = '';
  customerExist.otpExpiry = new Date();

  //save
  await this.customerRepository.updateOne(
  { email: resetPasswordDTO.email },
  {
    password: customerExist.password,
    otp: null,
    otpExpiry: null,
  },
);


     
    

      

  }
}
