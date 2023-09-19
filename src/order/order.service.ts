import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { IOrder, StatusOrderEnum } from 'src/database/interface/order.interface';
import { Model } from 'mongoose';
import { result } from 'lodash';
import { verifyOrderDto } from './dto/verify-order.dto';
import { IProduct } from 'src/database/interface/product.interface';

@Injectable()
export class OrderService {

  constructor(
    @Inject('ORDER_MODEL')
    private orderModel: Model<IOrder>,

    @Inject('PRODUCT_MODEL')
    private productModel: Model<IProduct>
  ) {

  }

  async create(createOrderDto: CreateOrderDto) {
    createOrderDto.status = StatusOrderEnum.WAIT_FOR_PURCHASE
    if (createOrderDto.evidence_purchase) {
      createOrderDto.status = StatusOrderEnum.WAIT_FOR_APPROVE
    }
    createOrderDto.order_code = "xx01" // random something
    const result = await new this.orderModel(createOrderDto).save()
    for (const obj of result.productList) {
      await this.productModel.findByIdAndUpdate(
        obj.productId,
        { $inc: { amount: -obj.amount } },
      )
    }
    return result;
  }

  async verifyOrder(input: verifyOrderDto) {
    let price: number = 0
    let discount: number = 0
    let net_price: number = 0
    for (const obj of input.productList) {
      const productDetail: IProduct = await this.productModel.findById(obj.productId);
      price += productDetail.price * obj.amount;
    }
    net_price = price - discount
    return {
      price: price,
      discount: discount,
      net_price: net_price
    }
  }


  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
