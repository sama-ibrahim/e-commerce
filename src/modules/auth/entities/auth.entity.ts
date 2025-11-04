import { Types } from "mongoose";

export class CustomerEntity{

    readonly _id :Types.ObjectId;
    userName: string;
    email: string;
    password:string;
    dob:Date;
    otp:string;
    otpExpiry:Date;
    isVerified:boolean;
    
}
