import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { CouponFactoryService } from './factory/coupon.factory';
import { Auth, User } from '@common/decorators';
import { MESSAGE } from '@common/constant';

@Controller('coupon')
@Auth(['Admin', 'Seller'])
export class CouponController {
  constructor(
    private readonly couponService: CouponService,
    private readonly couponFactoryService: CouponFactoryService,
  ) {}

  @Post()
  async create(@Body() createCouponDto: CreateCouponDto, @User() user: any) {
    const coupon = this.couponFactoryService.createCoupon(
      createCouponDto,
      user,
    );
  const createdCoupon= await this.couponService.create(coupon)
  return {data : createdCoupon , message:MESSAGE.Coupon.created}
  }

  @Get()
  findAll() {
    return this.couponService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.couponService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCouponDto: UpdateCouponDto) {
    return this.couponService.update(+id, updateCouponDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.couponService.remove(+id);
  }
}
