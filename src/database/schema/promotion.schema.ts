import mongoose from "mongoose";
import { IPromotion } from "../interface/promotion.interface";

export const PromotionSchema = new mongoose.Schema<IPromotion>({
    //promotion_code: { type: String, required: true, unique: true },
    promotion_name: { type: String, required: true },
    condition: { type: Number, required: true },
    discount: { type: Number, required: true },
    start_date: { type: Date, required: false, default: null },
    end_date: { type: Date, required: false, default: null },
    isActive: {
        type: Boolean,
        default: true
    },
    isDelete: {
        type: Boolean,
        default: false
    },
    status : {
        type : String,
    }
}, { timestamps: true })