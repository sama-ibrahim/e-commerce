import { IsValidDiscount } from '@common/decorators/discount.decorator';
import { DiscountType } from '@common/types';
import {
    IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  MinDate,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateCouponDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 5)
  code: string;

  @IsValidDiscount()
  discountAmount: number;

  @IsString()
  @IsEnum(DiscountType)
  discountType: DiscountType;

  @IsDate()
  @MinDate(new Date(Date.now() - 24 * 60 * 60 * 1000))
  fromDate: Date;

  @IsDate()
 @MinDate(new Date(Date.now() - 24 * 60 * 60 * 1000))
  toDate: Date;

  @IsBoolean()
  active: boolean;

  @IsArray()
  @IsMongoId({each : true})
  assignedTo: Types.ObjectId[];
}
