import {  CustomerRepository } from '@models/index';
import { ConflictException, Injectable } from '@nestjs/common';
 import { CustomerEntity } from './entities/auth.entity';
import { sendMail } from '@common/helpers';

@Injectable()
export class AuthService {
  constructor(private readonly customerRepository:CustomerRepository){}
 async register(customer:CustomerEntity) {
   
    //check existence
   const customerExist=await this.customerRepository.getOne({email: customer.email})
  if(customerExist){
     throw new ConflictException("customer already exists")
  }

   // save into DB
   const createdCustomer= await this.customerRepository.create(customer)

   //send email
 try {
    await sendMail({
      to: customer.email,
      subject: "confirm email",
      html: `<h1>Your OTP is ${customer.otp}</h1>`,
    });
  } catch (error) {
    console.error("Failed to send email:", error.message);
          
  }

   const {password , otp , otpExpiry , ...customerObj} = JSON.parse(JSON.stringify(createdCustomer)) //deep copy - remove some info
    
   return customerObj as CustomerEntity;

  }
 
}
