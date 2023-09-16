import { IsDefined, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { CategoryEnum } from "src/database/interface/product.interface";

export class UpdateProductDto {
    @IsOptional()
    @IsString()
    product_code: string

    @IsOptional()
    @IsString()
    name: string

    @IsOptional()
    @IsNumber()
    amount: number

    @IsOptional()
    @IsString()
    unit_name: string

    @IsOptional()
    @IsNumber()
    price: number

    @IsOptional()
    img_product: string;

    @IsOptional()
    @IsString()
    promotionId: string;

    @IsOptional()
    @IsEnum(CategoryEnum)
    category: CategoryEnum;

}