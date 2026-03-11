import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { UserMongoModule } from '@shared/index';
 
import { Product, ProductRepository, productSchema } from '@models/index';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from '@modules/category/category.module';
import { BrandModule } from '@modules/brand/brand.module';
import { ProductFactoryService } from './factory/product.factory';

@Module({
  imports: [
    UserMongoModule,
    MongooseModule.forFeature([{ name: Product.name, schema: productSchema }]),
    CategoryModule,
    BrandModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductFactoryService, ProductRepository],
})
export class ProductModule {}
