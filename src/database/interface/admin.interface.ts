import { ICommon } from "./common.interface";

export interface IAdmin extends ICommon {
    admin_code: String,
    username : String,
    password: String,
    phone: String,
    profile_path: String,
}