import { IProductList } from "./order.interface"

export interface ICart {
    userId: string
    cartList: IProductList[]
    price: number
    net_price: number
    totalDiscount : number
}

export interface ICartList {
    productId : string
    amount : number
    option: string
    discount : number
}