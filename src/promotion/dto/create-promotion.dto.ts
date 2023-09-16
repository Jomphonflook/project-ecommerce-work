import { IsDefined, IsNumber, IsOptional, IsString } from "class-validator"

export class CreatePromotionDto {
    @IsDefined()
    @IsString()
    promotion_code : string

    @IsDefined()
    @IsString()
    promotion_name: string

    @IsDefined()
    @IsNumber()
    discount : number //ส่วนลด %

    @IsDefined()
    @IsNumber()
    condition : number //ซื้อครบกี่บาท

    @IsOptional()
    @IsNumber()
    start_date : Number

    @IsOptional()
    @IsNumber()
    end_date : Number
}
