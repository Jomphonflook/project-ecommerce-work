import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {
  IOrder,
  StatusOrderEnum,
} from 'src/database/interface/order.interface';
import { Model } from 'mongoose';
import { verifyOrderDto } from './dto/verify-order.dto';
import { IProduct } from 'src/database/interface/product.interface';
import { ICart } from 'src/database/interface/cart.interface';
import { orderDoc } from 'src/database/schema/order.schema';
import { SearchOrderDto } from './dto/search-order.dto';
import { IUser } from 'src/database/interface/user.interface';

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER_MODEL')
    private orderModel: Model<IOrder>,

    @Inject('PRODUCT_MODEL')
    private productModel: Model<IProduct>,

    @Inject('CART_MODEL')
    private cartModel: Model<ICart>,

    @Inject('USER_MODEL')
    private userModel: Model<IUser>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    createOrderDto.status = StatusOrderEnum.WAIT_FOR_PURCHASE;
    if (createOrderDto.evidence_purchase) {
      createOrderDto.status = StatusOrderEnum.WAIT_FOR_APPROVE;
    }
    createOrderDto.order_code = Date.now(); // random something

    const cartId = createOrderDto.cartId;
    const cartInfo = await this.cartModel.findById(cartId);
    if (cartInfo.cartList.length < 1) {
      return 'not have cartInfo';
    }
    createOrderDto.price = cartInfo.price;
    createOrderDto.net_price = cartInfo.net_price;
    createOrderDto.productList = cartInfo.cartList;
    createOrderDto.userId = cartInfo.userId;
    createOrderDto.totalDiscount = cartInfo.totalDiscount;
    const result = await new this.orderModel(createOrderDto).save();
    if (result) {
      await this.cartModel.findByIdAndUpdate(cartId, {
        price: 0,
        net_price: 0,
        totalDiscount: 0,
        cartList: [],
      });
      for (const obj of cartInfo.cartList) {
        const productId: any = obj.productId;
        await this.productModel.findOneAndUpdate(
          {
            _id: productId,
            'optionProduct.name': obj.option,
          },
          {
            $inc: {
              'optionProduct.$.amount': -obj.amount,
            },
          },
        );
      }
    }
    return result;
  }

  async verifyOrder(input: verifyOrderDto) {
    let price: number = 0;
    let discount: number = 0;
    let net_price: number = 0;
    // for (const obj of input.productList) {
    //   const productDetail: IProduct = await this.productModel.findById(obj.productId);
    //   price += productDetail.price * obj.amount;
    // }
    net_price = price - discount;
    return {
      price: price,
      discount: discount,
      net_price: net_price,
    };
  }

  async purchaseOrder(input) {
    const order = await this.orderModel.findById(input.id);
    if (order) {
      const infoUpdate = {
        status: StatusOrderEnum.WAIT_FOR_APPROVE,
        evidence_purchase: input.slip,
        purchase_date: new Date(),
      };
      const purchaseUpdate = await this.orderModel.findByIdAndUpdate(
        input.id,
        infoUpdate,
        { new: true },
      );
      return purchaseUpdate;
    }
    return 'ไม่มีคำสั่งซื้อนี้ในระบบ';
  }

  async getOrderInfo(id) {
    const orderInfo = await this.orderModel.findById(id);
    if (orderInfo) {
      return orderInfo;
    }
    return 'ไม่มีคำสั่งซื้อนี้ในระบบ';
  }

  async getOrderByUserId(input) {
    const listOrder: orderDoc[] = await this.orderModel
      .find(input)
      .sort({ createdAt: -1 });
    //--------------------------------------------------
    let tempListOrder: any = [...listOrder];
    for (const [i, val] of tempListOrder.entries()) {
      const productListTemp = [];
      const productList = val.productList;
      for (const val of productList) {
        const productId = val.productId;
        const productInfo = await this.productModel.findById(productId);
        const optionInfo = productInfo.optionProduct.filter(
          (e: any) => e.name === val.option,
        )[0];
        const newobj: any = {
          img_product: productInfo.img_product,
          optionInfo,
          discount: val.discount,
          amount: val.amount,
          option: val.option,
          productId: val.productId,
        };
        productListTemp.push(newobj);
      }
      tempListOrder[i].productList = productListTemp;
    }
    if (listOrder)
      return {
        total: tempListOrder.length,
        listOrder: tempListOrder,
      };
    return 'ไม่มีคำสั่งซื้อของผู้ใช้นี้ในระบบ';
  }

  async cancelOrder(input) {
    const update = {
      status: StatusOrderEnum.CANCEL_ORDER,
    };
    const order = await this.orderModel.findById(input.orderId);
      if (order) {
        for (const obj of order.productList) {
          const productId: any = obj.productId;
          await this.productModel.findOneAndUpdate(
            {
              _id: productId,
              'optionProduct.name': obj.option,
            },
            {
              $inc: {
                'optionProduct.$.amount': +obj.amount,
              },
            },
          );
        }
      }
    const res = this.orderModel.findByIdAndUpdate(input.orderId, update, {
      new: true,
    });
    if (res) return res;
  }

  async searchOrder(input: SearchOrderDto) {
    const filter = {};
    if (input?.status) {
      Object.assign(filter, {
        status: input.status, //
      });
    }
    if (input?.order_code) {
      Object.assign(filter, {
        order_code: { $regex: input.order_code },
      });
    }

    if (input?.startDate && input?.endDate) {
      Object.assign(filter, {
        createdAt: {
          $gte: new Date(input.startDate),
          $lte: new Date(input.endDate),
        },
      });
    }
    const res = await this.orderModel.find(filter);
    const amountWaitingApprove = await this.orderModel.count({
      status: StatusOrderEnum.WAIT_FOR_APPROVE,
    });
    const amountApproveSuccess = await this.orderModel.count({
      status: StatusOrderEnum.APPROVE_PURCHASE,
    });

    const calNetpriceWaitingApprove = await this.orderModel
      .find({
        status: StatusOrderEnum.WAIT_FOR_APPROVE,
      })
      .then(async (objOrder) => {
        let cal = 0;
        objOrder.forEach((val) => {
          cal += val.net_price;
        });
        return cal;
      });

    const calNetpriceApproveSuccess = await this.orderModel
      .find({
        status: StatusOrderEnum.APPROVE_PURCHASE,
      })
      .then(async (objOrder) => {
        let cal = 0;
        objOrder.forEach((val) => {
          cal += val.net_price;
        });
        return cal;
      });
    let listRes = [];
    let tempOrder = null;

    for await (const [i, objOrder] of res.entries()) {
      const findUser = await this.userModel
        .findById(objOrder.userId)
        .select({ password: 0 });
      let userDetail = findUser ? findUser : null;
      const productListTemp = [];
      const productList = objOrder.productList;
      for (const val of productList) {
        const productId = val.productId;
        const productInfo = await this.productModel.findById(productId);
        console.log(productInfo)
        const optionInfo = productInfo?.optionProduct.filter(
          (e: any) => e.name === val.option,
        )[0];
        const newobj: any = {
          img_product: productInfo.img_product,
          optionInfo,
          discount: val.discount,
          amount: val.amount,
          option: val.option,
          productId: val.productId,
        };
        productListTemp.push(newobj);
      }
      tempOrder = {
        _id: objOrder._id,
        order_code: objOrder.order_code,
        userId: objOrder.userId,
        productList: productListTemp,
        price: objOrder.price,
        totalDiscount: objOrder.totalDiscount,
        net_price: objOrder.net_price,
        purchase_date: objOrder.purchase_date,
        status: objOrder.status,
        evidence_purchase: objOrder.evidence_purchase,
        address: objOrder.address,
        trackingNo: objOrder.trackingNo,
        userDetail: userDetail,
      };
      listRes.push(tempOrder);
    }
    return {
      calNetpriceWaitingApprove: calNetpriceWaitingApprove,
      calNetpriceApproveSuccess: calNetpriceApproveSuccess,
      amountWaitingApprove: amountWaitingApprove,
      amountApproveSuccess: amountApproveSuccess,
      listOrder: listRes,
    };
  }

  async updateStatusOrder(id: any, status: string, trackingNo: string) {
    const data = {};
    if (status) {
      Object.assign(data, {
        status: status,
      });
    }
    if (trackingNo) {
      Object.assign(data, {
        trackingNo: trackingNo,
      });
    }

    const result = await this.orderModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return result;
  }
}
