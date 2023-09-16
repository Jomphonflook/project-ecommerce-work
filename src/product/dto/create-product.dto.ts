import { IsDefined, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @IsDefined()
    @IsString()
    product_code: string

    @IsDefined()
    @IsString()
    name: string

    @IsDefined()
    @IsNumber()
    amount: number

    @IsDefined()
    @IsString()
    unit_name: string

    @IsDefined()
    @IsNumber()
    price: number

}