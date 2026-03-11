import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '@models/index';
import { Product } from './entities/product.entity';
import { CategoryService } from '@modules/category/category.service';
import { BrandService } from '@modules/brand/brand.service';
import { MESSAGE } from '@common/constant';
import { Types } from 'mongoose';
 

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryService: CategoryService,
    private readonly brandService: BrandService,
  ) {}

  //create
  async create(product: Product, user: any) {
    // check category existence
    await this.categoryService.findOne(product.categoryId);

    //check brand existence
    await this.brandService.findOne(product.brandId);

    //check product existence (same seller) >> if exist >> update
    const productExist = await this.productRepository.getOne({
      slug: product.slug,
      $or: [{ createdBy: user._id }, { updatedBy: user._id }],
    });

    if (productExist) {
      return await this.update(productExist._id, product);
    }

    return await this.productRepository.create(product);
  }

  findAll() {
    return `This action returns all product`;
  }

  //find one

  async findOne(id: string | Types.ObjectId) {
     const productExist = await this.productRepository.getOne({_id : id})
     if(!productExist){
      throw new NotFoundException(MESSAGE.Product.notFound)
     }
     return productExist
  }

  // update

  async update(id: string | Types.ObjectId, product: Product) {

    //check product existence
   const productExist = await this.findOne(id)
    product.stock+= productExist.stock;

    //colors 
   const colors=  this.addToSet(product.colors, productExist.colors);
   product.colors = Array.from(colors)

    //sizes
    const sizes =this.addToSet(product.sizes, productExist.sizes);
    product.sizes = Array.from(sizes)
    
    //update product
    return await this.productRepository.updateOne({ _id: id }, product, {
      new: true,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  // util function

   addToSet( newData :string[] , oldData :string[]){
    const items = new Set<string>(oldData);
    for(const item of newData){
      items.add(item)
    }
return items 
   }
   //colors
    // const colors = new Set<string>(productExist.colors)
    // for(const color of product.colors){
    //   colors.add(color)
    // }
    // product.colors = Array.from(colors)

    //sizes
    // const sizes = new Set<string>(productExist.sizes)
    // for(const size of product.sizes){
    //   sizes.add(size)
    // }
    // product.sizes=Array.from(sizes)
}
