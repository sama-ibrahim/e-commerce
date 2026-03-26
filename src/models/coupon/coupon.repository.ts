import { AbstractRepository } from "@models/abstract.repository";
import { Injectable } from "@nestjs/common";
 
import { Model} from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Coupon } from "./coupon.schema";

@Injectable()
export class CouponRepository extends AbstractRepository<Coupon>{
    constructor (
        @InjectModel(Coupon.name)private readonly couponModel: Model<Coupon>){
        super(couponModel)
    }
}