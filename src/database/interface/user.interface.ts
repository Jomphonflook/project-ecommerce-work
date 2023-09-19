import { ICommon } from "./common.interface";

export interface IUser extends ICommon { 
    member_code : string,
    username : string,
    password: string,
    titlename: string,
    firstname: string,
    lastname: string,
    gender: string,
    phone: string,
    profile_path: string,
}