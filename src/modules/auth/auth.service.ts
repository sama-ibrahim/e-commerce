import { CustomerRepository } from '@models/index';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CustomerEntity } from './entities/auth.entity';
import { sendMail } from '@common/helpers';
import { LoginDTO } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly configService:ConfigService,
   private readonly jwtService:JwtService) {}

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

    
    if(!match){
      throw new UnauthorizedException('invalid credentials')
    }
 
  //generate token 
  const token = this.jwtService.sign({
    _id:customerExist._id,
    role:'Customer',
    email:customerExist.email,
  
  },{
    secret: this.configService.get('access').jwt_secret,
    expiresIn:'1d'
  })

  return token;
  }
}
