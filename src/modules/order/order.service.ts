import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CartService } from '@modules/cart/cart.service';
import { OrderRepository, ProductRepository } from '@models/index';
import { Types } from 'mongoose';

@Injectable()
export class OrderService {
  constructor(
    private readonly cartService: CartService,
    private readonly productRepository: ProductRepository,
    private readonly orderRepository: OrderRepository,
  ) {}
  //create order
  async create(createOrderDto: CreateOrderDto, user: any) {
    const cart = await this.cartService.findOne(user);
    if(cart.products.length==0){
      throw new NotFoundException('Cart is empty');
    }

    //failed products
    const failProducts: { productId: string; reason: string }[] = [];

    // successproducts
    const successProducts: {
      productId: Types.ObjectId ;
      quantity: number;
      price: number;
      discount: number;
      totalPrice: number;
    }[] = [];

    for (const product of cart.products) {
      const productExist = await this.productRepository.getOne({
        _id: product.productId,
      });
      if (!productExist) {
        failProducts.push({
          productId: product.productId,
          reason: 'Product not found',
        });
        continue;
      }
      if (productExist.stock < product.quantity) {
        failProducts.push({
          productId: product.productId,
          reason: 'Product stock is not enough',
        });
        continue;
      }
      successProducts.push({
        productId:product.productId ,
        quantity : product.quantity,
        price : productExist.finalPrice,
        discount : productExist.discountAmount,
        totalPrice : productExist.finalPrice * product.quantity,
      })
    }

    if (failProducts.length > 0) {
      return failProducts;
    }
    //create order
    const order = await this.orderRepository.create({
      userId: user._id,
      products: successProducts,
      address : createOrderDto.address,
      paymentMethod : createOrderDto.paymentMethod,
      couponDetails : createOrderDto.couponDetails,
      totalAmount:successProducts.reduce (
        (acc , cur) => acc + cur.totalPrice,
        0,
      )
      

    });
    await this.cartService.clearCart(user._id)
    return order;
  }

  // findAll() {
  //   return `This action returns all order`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} order`;
  // }

  // update(id: number, updateOrderDto: UpdateOrderDto) {
  //   return `This action updates a #${id} order`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} order`;
  // }
}
