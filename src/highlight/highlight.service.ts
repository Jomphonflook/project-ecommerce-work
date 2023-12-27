import { Inject, Injectable } from '@nestjs/common';
import { CreateHighlightDto } from './dto/create-highlight.dto';
import { Model } from 'mongoose';
import { IHighlight } from 'src/database/interface/highlight.interface';

@Injectable()
export class HighlightService {

  constructor(
    @Inject('HIGHLIGHT_MODEL')
    private highlightModel: Model<IHighlight>,
  ) {}

  async create(createHighlightDto: CreateHighlightDto) {
    const result = await new this.highlightModel(createHighlightDto).save()
    return result;
  }

  async findAll() {
    return await this.highlightModel.find({
      isDelete: false
    })
  }

  async updateHighlight(input) {
    const result = await this.highlightModel.findByIdAndUpdate(input.id, input.inputUpdate , { new: true })
    return result
  }
}
