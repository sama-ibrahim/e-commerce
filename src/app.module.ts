import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import devConfig from './config/env/dev.config';
import { AuthModule } from './modules/auth/auth.module';
import { BrandModule } from './modules/brand/brand.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { CommonModule } from '@shared/modules';
import { CouponModule } from './modules/coupon/coupon.module';
import { CartModule } from './modules/cart/cart.module';
import { OrderModule } from './modules/order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [devConfig],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('db').url,
      }),
    }),

    
    CommonModule,
    AuthModule,
    ProductModule,
    CategoryModule,
    BrandModule,
    CouponModule,
    CartModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}



// MongooseModule.forFeature([
    //   { name: User.name, schema: userSchema,
    //      discriminators: [
    //       {
    //         name:Admin.name,
    //         schema:adminSchema,

    //       },
    //       {
    //         name:Seller.name,
    //         schema:sellerSchema,
    //       }

    //     ] },
    // ]),