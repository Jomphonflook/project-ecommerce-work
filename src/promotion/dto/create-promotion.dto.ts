import { IsDefined, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreatePromotionDto {
    @IsDefined()
    @IsString()
    promotion_name: string

    @IsDefined()
    @IsNumber()
    discount : number //ส่วนลด %

    @IsDefined()
    @IsNumber()
    condition : number //ซื้อครบกี่บาท 

    @IsNotEmpty()
    start_date : any

    @IsNotEmpty()
    end_date : any

    @IsOptional()
    status : any
}
