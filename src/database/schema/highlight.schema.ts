import mongoose from "mongoose";
import { IHighlight } from "../interface/highlight.interface";

export const HighlightSchema = new mongoose.Schema<IHighlight>({
    picPath: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: false,
        default: null
    },
    description: {
        type: String,
        required: false,
        default: null
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDelete: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })