import * as mongoose from 'mongoose';
import { IAdmin } from '../interface/admin.interface';

export const AdminSchema = new mongoose.Schema<IAdmin>({
    username: {
        unique: true,
        type: String,
        required: true
    },
    password: { type: String, required: true },
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

}, { timestamps: true });