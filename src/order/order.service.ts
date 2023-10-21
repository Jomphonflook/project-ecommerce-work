import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { IOrder, StatusOrderEnum } from 'src/database/interface/order.interface';
import { Model } from 'mongoose';
import { verifyOrderDto } from './dto/verify-order.dto';
import { IProduct } from 'src/database/interface/product.interface';
import { ICart } from 'src/database/interface/cart.interface';

@Injectable()
export class OrderService {

  constructor(
    @Inject('ORDER_MODEL')
    private orderModel: Model<IOrder>,

    @Inject('PRODUCT_MODEL')
    private productModel: Model<IProduct>,

    @Inject('CART_MODEL')
    private cartModel: Model<ICart>,

  ) {

  }

  async create(createOrderDto: CreateOrderDto) {
    createOrderDto.status = StatusOrderEnum.WAIT_FOR_PURCHASE
    if (createOrderDto.evidence_purchase) {
      createOrderDto.status = StatusOrderEnum.WAIT_FOR_APPROVE
    }
    createOrderDto.order_code = Date.now() // random something

    const cartId = createOrderDto.cartId
    const cartInfo = await this.cartModel.findById(cartId)
    if(cartInfo.cartList.length < 1){
      return "not have cartInfo"
    }
    createOrderDto.price = cartInfo.price
    createOrderDto.net_price = cartInfo.net_price
    createOrderDto.productList = cartInfo.cartList
    createOrderDto.userId = cartInfo.userId
    createOrderDto.totalDiscount = cartInfo.totalDiscount
    const result = await new this.orderModel(createOrderDto).save()
    if (result) {
      await this.cartModel.findByIdAndUpdate(cartId, {
        price : 0,
        net_price: 0,
        totalDiscount: 0,
        cartList: []
      })
    }
    return result;
  }

  async verifyOrder(input: verifyOrderDto) {
    let price: number = 0
    let discount: number = 0
    let net_price: number = 0
    // for (const obj of input.productList) {
    //   const productDetail: IProduct = await this.productModel.findById(obj.productId);
    //   price += productDetail.price * obj.amount;
    // }
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
