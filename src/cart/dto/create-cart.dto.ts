import { IsArray, IsDefined, IsOptional, IsString, isDefined } from "class-validator";

export class FirstCreateCartDto {

    @IsDefined()
    @IsString()
    userId : string

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
