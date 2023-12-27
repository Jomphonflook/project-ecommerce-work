import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IProduct } from 'src/database/interface/product.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import * as _ from 'lodash';
import { IPromotion } from 'src/database/interface/promotion.interface';

let lastData = null
let lastFilter = null

@Injectable()
export class ProductService {
    constructor(
        @Inject('PRODUCT_MODEL')
        private productModel: Model<IProduct>,
        @Inject("PROMOTION_MODEL")
        private promotionModel: Model<IPromotion>,
    ) { }

    async createProduct(createProduct: CreateProductDto) {
        const result = await new this.productModel(createProduct).save()
        return result
    }

    async updateProduct(id: string, UpdateProductDto: UpdateProductDto) {
        const result = await this.productModel.findByIdAndUpdate(id, UpdateProductDto, { new: true })
        return result
    }

    async getAllProduct(filter: any) {
        const total = await this.productModel.count({
            isDelete: false
        })
        const testFilter = {
            isDelete: false,
            //price: { $gt: filter.priceStart, $lt: filter.priceTo },
            //name: { $regex: filter.productName, $options: 'i' }
        }
        let arr = []
        let tempProduct = {}

        const result = await this.productModel.find(testFilter)//.skip((page - 1) * limit).limit(limit)
        for await (const obj of result) {
            const promotionId = obj.promotionId
            let promotionDetail = null
            if (promotionId && promotionId !== "none") {
                promotionDetail = await this.promotionModel.findById(obj.promotionId)
            }
            tempProduct = {
                _id: obj._id,
                category: obj.category,
                optionProduct: obj.optionProduct,
                img_product: obj.img_product,
                promotionId: promotionId,
                videoUrl : obj.videoUrl,
                isActive: obj.isActive,
                isDelete: obj.isDelete,
                createdAt: obj.createdAt,
                updatedAt: obj.updatedAt,
                promotionDetail: promotionDetail
            }
            arr.push(tempProduct)
        }
        return {
            total: total,
            amount: arr.length,
            data: arr
        }
    }
}
