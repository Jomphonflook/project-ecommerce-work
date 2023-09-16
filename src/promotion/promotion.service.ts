import { Inject, Injectable } from '@nestjs/common';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { Model } from 'mongoose';
import { IPromotion } from 'src/database/interface/promotion.interface';

@Injectable()
export class PromotionService {

  constructor(
    @Inject("PROMOTION_MODEL")
    private promotionModel: Model<IPromotion>
  ) { }

  async create(createPromotionDto: CreatePromotionDto) {
    const result = await new this.promotionModel(createPromotionDto).save()
    return result
  }

  async findAll() {
    return await this.promotionModel.find();
  }

  async findOne(id: string) {
    const result = await this.promotionModel.findById(id)
    return result;
  }

  async update(id: string, updatePromotionDto: UpdatePromotionDto) {
    const result = await this.promotionModel.findByIdAndUpdate(id, updatePromotionDto, { new: true })
    return result;
  }

  remove(id: number) {
    return `This action removes a #${id} promotion`;
  }
}
