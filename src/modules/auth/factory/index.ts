import { generateExpiryDate, generateOtp } from "@common/helpers";
import { RegisterDTO } from "../dto";
import { CustomerEntity } from "../entities/auth.entity";
import * as bcrypt from 'bcrypt';
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthFactoryService{
   async createCustomer(registerDTO:RegisterDTO){
        const customerEntity = new CustomerEntity();
        customerEntity.email= registerDTO.email;
        customerEntity.userName=registerDTO.userName;
        customerEntity.password=await bcrypt.hash(registerDTO.password,10);
        customerEntity.otp=generateOtp();
        customerEntity.otpExpiry=generateExpiryDate(
         60*60*100
        );
        customerEntity.isVerified=false;
        customerEntity.dob=new Date(registerDTO.dob);

       return customerEntity; 
        
   }
}
  
