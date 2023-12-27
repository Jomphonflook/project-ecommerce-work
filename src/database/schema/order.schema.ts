import mongoose from "mongoose";
import { IOrder, StatusOrderEnum } from "../interface/order.interface";
export type orderDoc = mongoose.HydratedDocument<IOrder>
export const orderSchema = new mongoose.Schema<IOrder>({
    order_code: { type: String, required: true },
    userId: { type: String, required: true },
    productList: {
        // type: [{
        //     productId: { type: String, required: true },
        //     option: { type: String, required: true },
        //     amount: { type: Number, required: true },
        //     discount: { type: Number, required: true }
        // }],
        type: [],
        require: true
    },
    price: { type: Number, require: true },
    totalDiscount: { type: Number, require: true },
    net_price: { type: Number, require: true },
    purchase_date: { type: Date, require: false, default: null },
    status: { type: String, enum: StatusOrderEnum, required: true },
    evidence_purchase: { type: String, required: false, default: null },
    address: {type: String, requierd: true},
    trackingNo : {type: String, requierd: false, default : null},
    isActive: {
        type: Boolean,
        default: true
    },
    isDelete: {
        type: Boolean,
        default: false
    },

}, { timestamps: true })