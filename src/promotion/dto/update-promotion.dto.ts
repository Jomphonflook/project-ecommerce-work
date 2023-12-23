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
    @IsNumber()
    start_date : Number

    @IsOptional()
    @IsNumber()
    end_date : Number

    @IsOptional()
    isDelete : Boolean
}
