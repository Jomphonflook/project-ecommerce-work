import { IsDefined, IsEnum, IsOptional, IsString } from "class-validator"
import { StatusOrderEnum } from "src/database/interface/order.interface"

export class SearchOrderDto {
   
    @IsOptional()
    @IsEnum(StatusOrderEnum)
    status: string

    @IsOptional()
    order_code : string

    @IsOptional()
    startDate : any

    @IsOptional()
    endDate : any
}