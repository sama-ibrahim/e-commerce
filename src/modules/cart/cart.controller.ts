import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Auth, User } from '@common/decorators';
import { MESSAGE } from '@common/constant';

@Controller('cart')
@Auth(['Admin','Customer'])
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
 async addToCart(@Body()addToCartDto:AddToCartDto , @User() user:any) {
    const cart= await this.cartService.addToCart(addToCartDto , user);
    return {
      success: true,
      message:MESSAGE.Cart.updated,
      data:cart
    }
  }

 
}
