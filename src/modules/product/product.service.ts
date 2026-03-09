import { Injectable } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from '@models/index';
import { Product } from './entities/product.entity';
import { CategoryService } from '@modules/category/category.service';
import { BrandService } from '@modules/brand/brand.service';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository,
              private readonly categoryService:CategoryService,
              private readonly brandService:BrandService ,
             
  ) {}


  //create
 async create(product: Product) {
    // check category existence
 await this.categoryService.findOne(product.categoryId)

    //check brand existence
  await this.brandService.findOne(product.brandId)

  return await this.productRepository.create(product)
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
