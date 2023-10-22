import { Inject, Injectable } from '@nestjs/common';
import { FirstCreateCartDto } from './dto/create-cart.dto';
import { Model } from 'mongoose';
import { ICart } from 'src/database/interface/cart.interface';
import { UpdateCartDto } from './dto/update-cart.dto';
import { IProduct } from 'src/database/interface/product.interface';
import { IPromotion } from 'src/database/interface/promotion.interface';

@Injectable()
export class CartService {
  constructor(
    @Inject('CART_MODEL')
    private cartModel: Model<ICart>,

    @Inject('PRODUCT_MODEL')
    private productModel: Model<IProduct>,

    @Inject('PROMOTION_MODEL')
    private promotionModel: Model<IPromotion>,
  ) {

  }

  async firstCreate(FirstCreateCartDto: FirstCreateCartDto) {
    let price = 0
    let net_price = 0
    if (FirstCreateCartDto.cartList.length === 0) {
      FirstCreateCartDto.price = price
      FirstCreateCartDto.net_price = net_price
      const result = await new this.cartModel(FirstCreateCartDto).save()
      return result
    }
    return false;
  }

  async updateCart(updateCartDto: UpdateCartDto) {
    console.log("cart service start>>")
    let cartList = updateCartDto.cartList
    let cartId = updateCartDto.cartId
    let price = 0
    let net_price = 0
    let totalDiscount = 0
    let newCartList = []
    console.log(cartList)
    for (const obj of cartList as any) {
      const amount = obj.amount
      const option = obj.option
      let cartTemp = {
        productId: obj.productId,
        amount: amount,
        option: option,
        discount: 0,
      }
      const product = await this.productModel.findById(obj.productId)
      const promotion = await this.promotionModel.findById(product.promotionId)
      const infoProduct: any = product.optionProduct.filter((e: any) => e.name === option)[0]
      const calPrice = amount * infoProduct.price
      price += calPrice
      if (calPrice >= promotion.condition) {
        cartTemp.discount = calPrice * (promotion.discount / 100)
        totalDiscount += cartTemp.discount
      }
      newCartList.push(cartTemp)
    }
    net_price = price - totalDiscount
    const result = await this.cartModel.findByIdAndUpdate(cartId, {
      price,
      net_price,
      totalDiscount,
      cartList: newCartList
    }, { new: true })
    console.log("cart service finish!")
    return result;
  }

  async getCartByUserId(userId: string){
    return await this.cartModel.findOne({
      userId
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
