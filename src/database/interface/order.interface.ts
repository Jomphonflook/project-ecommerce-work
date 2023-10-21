
export enum StatusOrderEnum {
    WAIT_FOR_PURCHASE = "waiting-for-purchase",
    WAIT_FOR_APPROVE = "waiting-for-approve",
    APPROVE_PURCHASE = "approve-purchase",
    CANCEL_ORDER = "cancel-order"
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
}

export interface IProductList {
    productId : string
    amount : number
    option: string
    discount : number
}