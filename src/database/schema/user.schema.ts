import mongoose from "mongoose";
import { IUser } from "../interface/user.interface";

export const UserSchema = new mongoose.Schema<IUser>({
    member_code: {
        unique: true,
        type: String,
        required: true
    },
    titlename: {
        type: String,
        required: true
    },
    username: {
        unique: true,
        type: String,
        required: true
    },
    password: { type: String, required: true },

    gender: {
        type: String,
        required: false,
        default: null
    },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    phone: { type: String, required: true },
    
    isActive: {
        type: Boolean,
        default: true
    },
    isDelete: {
        type: Boolean,
        default: false
    },
    profile_path: { type: String, require: false, default: null },
}, { timestamps: true })