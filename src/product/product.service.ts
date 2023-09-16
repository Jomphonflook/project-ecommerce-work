import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IProduct } from 'src/database/interface/product.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
    constructor(
        @Inject('PRODUCT_MODEL')
        private productModel: Model<IProduct>
    ) { }

    async createProduct(createProduct: CreateProductDto) {
        const result = await new this.productModel(createProduct).save()
        return result
    }

    async updateProduct(id: string, UpdateProductDto: UpdateProductDto) {
        const result = await this.productModel.findByIdAndUpdate(id, UpdateProductDto, { new: true })
        return result
    }

    async getAllProduct() {
        const filter = {
            //price: { $gt: 0, $lt: 800 }
            //"name" : { $regex: "ant", $options: 'i'}
        }
        const result = await this.productModel.find(filter)
        return result
    }
}
