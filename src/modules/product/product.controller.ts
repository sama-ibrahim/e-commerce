import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Auth, Public, User } from '@common/decorators';

import { MESSAGE } from '@common/constant';
import { ProductFactoryService } from './factory/product.factory';
import { Product } from './entities';
import { TransformInterceptor } from '@common/interceptors';

@Controller('product')
@UseInterceptors(new TransformInterceptor<Product>())
@Auth(['Admin', 'Seller'])
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly productFactoryService: ProductFactoryService,
  ) {}

  //create

  @Post()
  async create(@Body() createProductDto: CreateProductDto, @User() user: any) {
    const product = this.productFactoryService.createProduct(
      createProductDto,
      user,
    );
    const createdProduct = await this.productService.create(product, user);
    return {
      success: true,
      message: MESSAGE.Product.created,
      data: createdProduct,
    };
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  // findone
  @Get(':id')
  @Public()
  async findOne(@Param('id') id: string) {
   const product = await this.productService.findOne(id);
   return {
    success: true ,
    data:product , 
 
   }
  }

 // update

  @Patch(':id')
  update(@Param('id') id: string, product: Product) {
    return this.productService.update(id, product);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
