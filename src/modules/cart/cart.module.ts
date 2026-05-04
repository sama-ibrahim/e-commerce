import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { ProductModule } from '@modules/product/product.module';
import { Cart, CartRepository, cartSchema } from '@models/index';
import { MongooseModule } from '@nestjs/mongoose';
import { UserMongoModule } from '@shared/modules';

@Module({
  imports:[ProductModule,MongooseModule.forFeature([{name: Cart.name, schema:cartSchema}]),UserMongoModule],
  
  controllers: [CartController],
  providers: [CartService,CartRepository],
  exports:[CartService,CartRepository]
})
export class CartModule {}
