import mongoose from "mongoose";
import { ICart } from "../interface/cart.interface";


export const cartSchema = new mongoose.Schema<ICart>({
    userId: { type: String, required: true },
    price: { type: Number, required: true },
    net_price: { type: Number, required: true },
    totalDiscount: { type: Number, required: true },
    cartList: {
        type: [{
            productId: { type: mongoose.Schema.Types.ObjectId, require: true },
            amount: { type: Number, require: true, default: 0 },
            option: { type: String, require: true, default: "" },
            discount: { type: Number, require: true, default: 0 },
        }], required: true
    }
})