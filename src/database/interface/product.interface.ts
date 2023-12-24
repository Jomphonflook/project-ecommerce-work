import mongoose from "mongoose";
import { ICommon } from "./common.interface";

export enum CategoryEnum {
    Set = "เซ็ต", Cream = "ครีม", Moisturizer = "มอยเจอร์ไรเซอร์", Cleansing = "คลีนซิง", Cleanser = "คลีนเซอร์", Serum = "เซรั่ม", SunCream = "กันแดด"
}

export interface IProduct extends ICommon {
    optionProduct: [],
    category: CategoryEnum,
    img_product: string,
    promotionId: string,
    videoUrl : string
}