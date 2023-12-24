import mongoose from "mongoose";
import { CategoryEnum, IProduct } from "../interface/product.interface";


export const ProductSchema = new mongoose.Schema<IProduct>({
    category: { type: String, enum: CategoryEnum, required: true },
    optionProduct : {
        type: [{
            name: { type: String, required: true }, 
            amount: { type: Number, required: true },
            unit_name: { type: String, required: true },
            price: { type: Number, required: true },
            description: {type: String, required: false, default: null},
        }],
        required: true
    },
    img_product: { type: String, required: false, default: null },
    promotionId: { type: String, require: false, default: null },
    videoUrl : {type: String, require: false, default: null },
    isActive: {
        type: Boolean,
        default: true
    },
    isDelete: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });