import mongoose from "mongoose";
import { ICommon } from "./common.interface";


export enum CategoryEnum {
    FOOD = "อาหาร",
    ELECTRONIC = "เครื่องใช้ไฟฟ้า",
    FASION = "แฟชั่น"
}
export interface IProduct extends ICommon {
    product_code: string,
    name: string,
    amount: number,
    category: CategoryEnum,
    img_product: string,
    unit_name: string,
    price: number,
    promotionId: mongoose.Schema.Types.ObjectId,
}