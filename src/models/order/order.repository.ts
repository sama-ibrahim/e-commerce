import { AbstractRepository } from "@models/abstract.repository";
import { Injectable } from "@nestjs/common";
 
import { Model} from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Order } from "./order.schema";
 

@Injectable()
export class OrderRepository extends AbstractRepository<Order>{
    constructor (
        @InjectModel(Order.name)private readonly orderModel: Model<Order>){
        super(orderModel)
    }
}