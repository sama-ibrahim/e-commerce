import { Prop, Schema, SchemaFactory, Virtual } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

export enum DiscountType {
  fixed_amount = 'fixed_amount',
  percentage = 'percentage',
}

@Schema({ timestamps: true, toJSON: { virtuals: true } })
export class Product {
  readonly _id: Types.ObjectId;

  //=============string

  @Prop({ type: String, required: true, trim: true })
  name: string;

  @Prop({ type: String, required: true, trim: true })
  slug: string;

  @Prop({ type: String, required: true, trim: true })
  description: string;

  //=============ids

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Category', required: true })
  categoryId: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Brand', required: true })
  brandId: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true }) // customer - hr -( seller - admins) >> controlles by the role guard
  createdBy: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  updatedBy: Types.ObjectId;

  //=============numbers

  @Prop({ type: Number, required: true, min: 1 }) // avoid negative
  price: number;

  @Prop({ type: Number, default: 0, min: 0 })
  discountAmount: number;

  @Prop({
    type: String,
    enum: DiscountType,
    default: DiscountType.fixed_amount,
  })
  discountType: DiscountType;

  @Virtual({
    get: function (this: Product) {
      if (this.discountType == DiscountType.fixed_amount)
        return this.price - this.discountAmount;
      return this.price - (this.price * this.discountAmount) / 100;
    },
  })
  finalPrice: number; // virtual field

  @Prop({ type: Number, default: 1, min: 0 })
  stock: number;

  @Prop({ type: Number, min: 0 })
  sold: number;

  //=============specifications (optional)

  @Prop({ type: [String] })
  colors: string[]; // red - green

  @Prop([String])
  sizes: string[]; //s - m - l
}

export const productSchema = SchemaFactory.createForClass(Product);
