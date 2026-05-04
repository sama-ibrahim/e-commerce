import { PaymentMethod } from '@common/types';
 
import {
  IsEnum,
  IsMongoId,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';

export class AddressDto {
  @IsString()
  street: string;
  @IsString()
  city: string;
  @IsString()
  country: string;
  @IsString()
  code: string;
  @IsString()
  phoneNumber: string;
}

class CouponDetail {
  @IsMongoId()
  couponId: Types.ObjectId;
  @IsNumber()
  discountAmount: number;
@IsString()
  code:string 
}
export class CreateOrderDto {
  @IsObject()
  address: AddressDto;

  @IsString()
  @IsEnum(PaymentMethod)
  @IsOptional()
  paymentMethod: PaymentMethod;

  @IsObject()
  @IsOptional()
  couponDetails: CouponDetail;
//   products?: {
//     productId: string;
//     quantity: number;
//   }[];
}
