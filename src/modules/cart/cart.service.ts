import { Injectable, NotFoundException } from '@nestjs/common';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ProductService } from '@modules/product/product.service';
import { CartRepository } from '@models/index';
import { MESSAGE } from '@common/constant';
import { Types } from 'mongoose';

@Injectable()
export class CartService {
  constructor(
    private readonly productService: ProductService,
    private readonly cartRepository: CartRepository,
  ) {}
  //create cart
  async createCart(addToCartDto: AddToCartDto, user: any) {
    const cart = await this.cartRepository.create({
      userId: user._id,
      products: [
        {
          productId: addToCartDto.productId,
          quantity: addToCartDto.quantity,
        },
      ],
    });
    return cart;
  }
  //add to cart
  async addToCart(addToCartDto: AddToCartDto, user: any) {
    //check product existence
    await this.productService.findOne(addToCartDto.productId);

    //check cart existence
    let cart =
      (await this.cartRepository.getOne({ userId: user._id })) ??
      (await this.createCart(addToCartDto, user));

    //cart exist  >> check product existence within cart
    const index = cart.products.findIndex((product: any) =>
      product.productId.equals(addToCartDto.productId),
    );
    //product !in cart
    if (index == -1) {
      cart.products.push({
        productId: addToCartDto.productId,
        quantity: addToCartDto.quantity,
      });
    } else {
      if (addToCartDto.quantity == 0)
        return await this.removeFromCart(addToCartDto.productId, user);
      cart.products[index].quantity = addToCartDto.quantity;
    }
    await cart.save();
    return cart;
  }

  //remove
  async removeFromCart(productId: string | Types.ObjectId, user: any) {
    const product = await this.cartRepository.updateOne(
      { userId: user._id, 'products.productId': productId },
      { $pull: { products: { productId } } },
    );
    if (!product) throw new NotFoundException(MESSAGE.Product.notFound);
    return true;
  }

  //clear cart
  async clearCart(user: any) {
    return await this.cartRepository.updateOne(
      { userId: user._id },
      { $set: { products: [] } },
    );
  }
}
