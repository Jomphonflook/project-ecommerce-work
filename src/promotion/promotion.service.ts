import { Inject, Injectable } from '@nestjs/common';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { Model } from 'mongoose';
import { IPromotion } from 'src/database/interface/promotion.interface';
import { IProduct } from 'src/database/interface/product.interface';

@Injectable()
export class PromotionService {

  constructor(

    @Inject("PROMOTION_MODEL")
    private promotionModel: Model<IPromotion>,

    @Inject('PRODUCT_MODEL')
    private productModel: Model<IProduct>
  ) { }

  async create(createPromotionDto: CreatePromotionDto) {
    const result = await new this.promotionModel(createPromotionDto).save()
    return result
  }

  async findAll() {
    return await this.promotionModel.find({
      isDelete: false
    });
  }

  async findOne(id: string) {
    const result = await this.promotionModel.findById(id)
    return result;
  }

  async update(id: string, updatePromotionDto: UpdatePromotionDto) {
    if (updatePromotionDto.isDelete) {
      const checkPromotionUsed = await this.productModel.findOne({
        promotionId: id
      })
      if (checkPromotionUsed) {
        return {
          message: "This promotion used in product",
          product: checkPromotionUsed
        }
      }
    }
    const result = await this.promotionModel.findByIdAndUpdate(id, updatePromotionDto, { new: true })
    return result;
  }

  remove(id: number) {
    return `This action removes a #${id} promotion`;
  }
}
