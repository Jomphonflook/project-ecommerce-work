import mongoose from "mongoose";
import { CategoryEnum, IProduct } from "../interface/product.interface";


export const ProductSchema = new mongoose.Schema<IProduct>({
    product_code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, enum: CategoryEnum, required: true },
    img_product: { type: String, required: false, default: null },
    unit_name: { type: String, required: true },
    price: { type: Number, required: true },
    promotionId: { type: mongoose.Schema.Types.ObjectId, require: false, default: null },
    isActive: {
        type: Boolean,
        default: true
    },
    isDelete: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });