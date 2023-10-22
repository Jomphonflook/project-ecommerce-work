import { IsArray, IsDefined, IsEnum, IsNumber, IsString, ValidateNested } from "class-validator";
import { CategoryEnum } from "src/database/interface/product.interface";

export class CreateProductDto {

    @IsDefined()
    @IsEnum(CategoryEnum)
    category: string

    @IsDefined()
    @IsArray()
    @ValidateNested({ each: true })
    optionProduct: optionProduct[]
}

export class optionProduct {
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