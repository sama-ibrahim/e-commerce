import { IsValidDiscount } from '@common/decorators/discount.decorator';
import { DiscountType } from '@common/types';
import {
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  description: string;

  @IsMongoId()
  @IsNotEmpty()
  categoryId: Types.ObjectId;

  @IsMongoId()
  @IsNotEmpty()
  brandId: Types.ObjectId;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsValidDiscount()
  discountAmount: number;

  @IsString()
  @IsOptional()
  @IsEnum(DiscountType)
  discountType: DiscountType;

  @IsNumber()
  @IsOptional()
  stock: number;

  @IsArray()
  @IsString({ each: true })
  colors: string[];

  @IsArray()
  @IsString({ each: true })
  sizes: string[];
}
