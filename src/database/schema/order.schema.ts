import mongoose from "mongoose";
import { IOrder, StatusOrderEnum } from "../interface/order.interface";

export const orderSchema = new mongoose.Schema<IOrder>({
    order_code: { type: String, required: true },
    userId : {type : String,required: true},
    productList: {
        type: [{
            productId: { type: String, required: true },
            amount: { type: Number, require: true },
            promotionId: { type: Number, require: false, default: null }
        }],
        require: true
    },
    price: { type: Number, require: true },
    discount: { type: Number, require: true },
    net_price: { type: Number, require: true },
    purchase_date: { type: Date, require: false, default: null },
    status: { type: String, enum: StatusOrderEnum, required: true },
    evidence_purchase: { type: String, required: false, default: null }
    
}, { timestamps: true })