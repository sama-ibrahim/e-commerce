import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { UserMongoModule } from '@shared/modules';
import { CartModule } from '@modules/cart/cart.module';
import { Order, OrderRepository, orderSchema, ProductRepository } from '@models/index';
import { ProductModule } from '@modules/product/product.module';
 
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[UserMongoModule , CartModule , ProductModule,
    MongooseModule.forFeature([
  { name: Order.name, schema: orderSchema }
])
   ],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
})
export class OrderModule {}
