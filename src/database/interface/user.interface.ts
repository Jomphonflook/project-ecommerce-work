import { ICommon } from "./common.interface";

export interface IUser extends ICommon { 
    username : string,
    password: string,
    firstname: string,
    lastname: string,
    gender: string,
    phone: string,
    profile_path: string,
}