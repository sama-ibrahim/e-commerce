import slugify from "slugify";
import { CreateProductDto } from "../dto/create-product.dto";
import { Types } from "mongoose";
import { Product } from "../entities";


export class ProductFactoryService{
    createProduct(CreateProductDto:CreateProductDto , user: any){
    const product = new Product();

    product.name = CreateProductDto.name;
    product.slug = slugify(CreateProductDto.name);
    product.description= CreateProductDto.description;

    product.categoryId=new Types.ObjectId(CreateProductDto.categoryId);
    product.brandId=new Types.ObjectId(CreateProductDto.brandId);
    product.createdBy = user._id;
    product.updatedBy = user._id;

    product.price=CreateProductDto.price;
    product.discountAmount=CreateProductDto.discountAmount;
    product.discountType=CreateProductDto.discountType;
    product.stock=CreateProductDto.stock;
    product.sold=0;

    product.colors=CreateProductDto.colors;
    product.sizes=CreateProductDto.sizes;

    return product;
    }
}