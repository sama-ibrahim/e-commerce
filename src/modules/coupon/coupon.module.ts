import { Module } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CouponController } from './coupon.controller';
import { CouponFactoryService } from './factory/coupon.factory';
import { UserMongoModule } from '@shared/modules';
import { Coupon, CouponRepository, couponSchema } from '@models/index';
import mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UserMongoModule,
    MongooseModule.forFeature([{ name: Coupon.name, schema: couponSchema}]),
  ],
  controllers: [CouponController],
  providers: [CouponService, CouponFactoryService, CouponRepository],
})
export class CouponModule {}
