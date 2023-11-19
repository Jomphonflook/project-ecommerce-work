import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { IOrder, StatusOrderEnum } from 'src/database/interface/order.interface';
import { Model } from 'mongoose';
import { verifyOrderDto } from './dto/verify-order.dto';
import { IProduct } from 'src/database/interface/product.interface';
import { ICart } from 'src/database/interface/cart.interface';
import { async } from 'rxjs';
import { orderDoc } from 'src/database/schema/order.schema';

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
    console.log("create order start >>>>>>")
    createOrderDto.status = StatusOrderEnum.WAIT_FOR_PURCHASE
    if (createOrderDto.evidence_purchase) {
      createOrderDto.status = StatusOrderEnum.WAIT_FOR_APPROVE
    }
    createOrderDto.order_code = Date.now() // random something

    const cartId = createOrderDto.cartId
    const cartInfo = await this.cartModel.findById(cartId)
    if (cartInfo.cartList.length < 1) {
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
        price: 0,
        net_price: 0,
        totalDiscount: 0,
        cartList: []
      })
      for (const obj of cartInfo.cartList) {
        console.log("subtract amount product")
        const productId: any = obj.productId
        await this.productModel.findOneAndUpdate(
          {
            _id: productId,
            'optionProduct.name': obj.option
          },
          {
            '$inc': {
              'optionProduct.$.amount': -obj.amount
            }
          },
        )
      }
    }
    console.log("order finish!!!!!")
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


  async purchaseOrder(input) {
    const order = await this.orderModel.findById(input.id)
    if (order) {
      const infoUpdate = {
        status: StatusOrderEnum.WAIT_FOR_APPROVE,
        evidence_purchase: input.slip,
        purchase_date: new Date()
      }
      const purchaseUpdate = await this.orderModel.findByIdAndUpdate(input.id, infoUpdate, { new: true })
      return purchaseUpdate
    }
    return "ไม่มีคำสั่งซื้อนี้ในระบบ"
  }

  async getOrderInfo(id) {
    console.log("getOrder By orderId")
    const orderInfo = await this.orderModel.findById(id)
    if (orderInfo) {
      return orderInfo
    }
    return "ไม่มีคำสั่งซื้อนี้ในระบบ"
  }

  async getOrderByUserId(input) {
    console.log("getListOrder By userId")
    const listOrder: orderDoc[] = await this.orderModel.find(input).sort({ createdAt: -1 })
    //--------------------------------------------------
    let tempListOrder: any = [...listOrder]
    for (const [i, val] of tempListOrder.entries()) {
      const productListTemp = []
      const productList = val.productList
      for (const val of productList) {
        const productId = val.productId
        const productInfo = await this.productModel.findById(productId)
        const optionInfo = productInfo.optionProduct.filter((e: any) => e.name === val.option)[0]
        const newobj: any = {
          img_product: productInfo.img_product,
          optionInfo,
          discount: val.discount,
          amount: val.amount,
          option: val.option,
          productId: val.productId
        }
        productListTemp.push(newobj)
      }
      tempListOrder[i].productList = productListTemp
    }
    if (listOrder) return {
      total: tempListOrder.length,
      listOrder: tempListOrder
    }
    return "ไม่มีคำสั่งซื้อของผู้ใช้นี้ในระบบ"
  }


  async cancelOrder(input) {
    const update = {
      status: StatusOrderEnum.CANCEL_ORDER
    }
    const res =  this.orderModel.findByIdAndUpdate(input.orderId, update, { new: true })
    if(res) return res
  }
}
