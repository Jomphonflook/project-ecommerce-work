import { ICommon } from "./common.interface";

export interface IPromotion extends ICommon {
    promotion_code : string
    promotion_name: string
    discount : number //ส่วนลด %
    condition : number //ซื้อครบกี่บาท
    start_date : Date
    end_date : Date
    status : string
}