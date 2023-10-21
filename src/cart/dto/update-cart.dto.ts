import { IsArray, IsDefined, IsOptional, IsString, isDefined } from "class-validator";

export class UpdateCartDto {


    @IsDefined()
    @IsString()
    cartId : string

    @IsOptional()
    @IsString()
    price: number

    @IsOptional()
    @IsString()
    net_price: number
    
    @IsDefined()
    @IsArray()
    cartList: []

}