import mongoose from "mongoose";

export interface ICommon {
    isActive?: boolean,
    isDelete?: boolean,
    createdAt?: Date,
    updatedAt?: Date,
}