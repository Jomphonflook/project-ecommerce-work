import { ICommon } from "./common.interface"

export enum StatusOrderEnum {
    WAIT_FOR_PURCHASE = "รอการชำระเงิน",
    WAIT_FOR_APPROVE = "รอยืนยัน",
    APPROVE_PURCHASE = "ยืนยันการชำระเงิน",
    WAIT_FOR_SEND= "รอการจัดส่ง",
    CANCEL_ORDER = "ยกเลิกการสั่งซื้อ"
}

export interface IOrder extends ICommon {
    userId : string
    order_code : string
    productList : IProductList[]
    price : number
    totalDiscount : number
    net_price : number
    purchase_date: Date
    status : StatusOrderEnum
    evidence_purchase : string
    address: string,
    trackingNo : string
}

export interface IProductList {
    productId : string
    amount : number
    option: string
    discount : number
}