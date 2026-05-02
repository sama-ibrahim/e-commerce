import { AbstractRepository } from "@models/abstract.repository";
import { Injectable } from "@nestjs/common";
import { Cart, CartDocument } from "./cart.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class CartRepository extends AbstractRepository<Cart>{
    constructor(
        @InjectModel(Cart.name) private readonly cartModel:Model<CartDocument>
    ) {
        super(cartModel)
    }
}