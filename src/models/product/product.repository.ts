import { AbstractRepository } from "@models/abstract.repository";
import { Product } from "@modules/product/entities/product.entity";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class ProductRepository extends AbstractRepository<Product>{
    constructor(@InjectModel(Product.name)private readonly productModel:Model<Product>){
        super(productModel)
    }
}