import { InjectModel } from "@nestjs/mongoose";
import { AbstractRepository } from "../abstract.repository";
import { Customer } from "./customer.schema";
import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";

 @Injectable()
export class CustomerRepository extends AbstractRepository<Customer>{
    constructor(@InjectModel(Customer.name) private readonly customerModel :Model<Customer>){
        super(customerModel)
    }

    async findOneAndUpdate (filter: object, update: object, p0: { new: boolean; }){
        return this.customerModel.findOneAndUpdate(filter,update,{new:true})
    }
}
    