import mongoose from "mongoose";
import { ICommon } from "./common.interface";

export enum CategoryEnum {
    FOOD = "อาหาร",
    ELECTRONIC = "เครื่องใช้ไฟฟ้า",
    FASION = "แฟชั่น"
}

export interface IProduct extends ICommon {
    optionProduct: [],
    category: CategoryEnum,
    img_product: string,
    promotionId: mongoose.Schema.Types.ObjectId,
}