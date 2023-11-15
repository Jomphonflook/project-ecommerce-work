import { ICommon } from "./common.interface";

export interface IAdmin extends ICommon {
    username : String,
    password: String,
    phone: String,
    profile_path: String,
}