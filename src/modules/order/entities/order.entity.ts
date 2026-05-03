import { OrderStatus, PaymentMethod } from '@common/types';

import { Types } from 'mongoose';

export class OrderProduct {
  productId: string;

  quantity: number;

  price: number;

  discount: number;

  totalPrice: number;
}

export class Address {
  street: string;

  city: string;

  country: string;

  code: string;

  phoneNumber: string;
}

export class CouponDetails {
  couponId: Types.ObjectId;

  discountAmount: number;
  code: string
}

export class Order {
  readonly _id: Types.ObjectId;

  userId: Types.ObjectId;

  address: Address;

  products: OrderProduct[];

  paymentMethod: PaymentMethod;

  status: OrderStatus;

  coupon: CouponDetails;

  totalAmount: number;
}
