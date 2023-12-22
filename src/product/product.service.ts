import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IProduct } from 'src/database/interface/product.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import * as _ from 'lodash';

let lastData = null
let lastFilter = null

@Injectable()
export class ProductService {
    constructor(
        @Inject('PRODUCT_MODEL')
        private productModel: Model<IProduct>
    ) { }

    async createProduct(createProduct: CreateProductDto) { 
        console.log("create Product >>>>>")
        const result = await new this.productModel(createProduct).save()
        return result
    }

    async updateProduct(id: string, UpdateProductDto: UpdateProductDto) {
        const result = await this.productModel.findByIdAndUpdate(id, UpdateProductDto, { new: true })
        return result
    }

    async getAllProduct(filter: any) {
        const total = await this.productModel.count()
        const testFilter = {
            isDelete: false,
            //price: { $gt: filter.priceStart, $lt: filter.priceTo },
            //name: { $regex: filter.productName, $options: 'i' }
        }
        const result = await this.productModel.find(testFilter)//.skip((page - 1) * limit).limit(limit)
        return {
            total: total,
            amount: result.length,
            data: result
        }
    }
}
