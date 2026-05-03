import { Controller, Get, Post, Body, Patch, Param, Put } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Auth, User } from '@common/decorators';
import { MESSAGE } from '@common/constant';

@Controller('cart')
@Auth(['Admin','Customer'])
export class CartController {
  constructor(private readonly cartService: CartService) {}
//create
  @Post()
 async addToCart(@Body()addToCartDto:AddToCartDto , @User() user:any) {
    const cart= await this.cartService.addToCart(addToCartDto , user);
    return {
      success: true,
      message:MESSAGE.Cart.updated,
      data:cart
    }
  }

 //remove from cart
 @Put('remove/:productId')
 async removeFromCart(@Param('productId') productId:string , @User() user : any){
  await this.cartService.removeFromCart(productId, user);
  return {
    success: true,
    message: MESSAGE.Cart.updated,
  };
 }

 
}
