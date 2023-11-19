
export enum StatusOrderEnum {
    WAIT_FOR_PURCHASE = "รอการชำระเงิน",
    WAIT_FOR_APPROVE = "รอยืนยัน",
    APPROVE_PURCHASE = "ยืนยันการชำระเงิน",
    CANCEL_ORDER = "ยกเลิกการสั่งซื้อ"
}

export interface IOrder {
    userId : string
    order_code : string
    productList : IProductList[]
    price : number
    totalDiscount : number
    net_price : number
    purchase_date: Date
    status : StatusOrderEnum
    evidence_purchase : string
    address: string
}

export interface IProductList {
    productId : string
    amount : number
    option: string
    discount : number
}