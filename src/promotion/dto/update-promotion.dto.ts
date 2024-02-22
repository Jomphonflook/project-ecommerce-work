import { IsNumber, IsOptional, IsString } from "class-validator"

export class UpdatePromotionDto { 
    @IsOptional()
    @IsString()
    promotion_code : string

    @IsOptional()
    @IsString()
    promotion_name: string

    @IsOptional()
    @IsNumber()
    discount : number //ส่วนลด %

    @IsOptional()
    @IsNumber()
    condition : number //ซื้อครบกี่บาท

    @IsOptional()
    start_date :any

    @IsOptional()
    end_date : any

    @IsOptional()
    isDelete : Boolean

    @IsOptional()
    status : any
}
