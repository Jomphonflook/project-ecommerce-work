import { IsArray, IsDefined, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { CategoryEnum } from "src/database/interface/product.interface";

export class UpdateProductDto {
    @IsOptional()
    @IsString()
    product_code: string

    @IsOptional()
    promotionId: any;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    optionProduct: optionProduct[]

    @IsOptional()
    @IsEnum(CategoryEnum)
    category: CategoryEnum;

    @IsOptional()
    @IsString()
    img_product: string

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