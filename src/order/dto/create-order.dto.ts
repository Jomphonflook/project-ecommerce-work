import { IsArray, IsDefined, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Validate, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator"
import { IProductList, StatusOrderEnum } from "src/database/interface/order.interface"

@ValidatorConstraint()
export class IsProductArray implements ValidatorConstraintInterface {
    public async validate(Data: IProductList[], args: ValidationArguments) {
        return Array.isArray(Data) && Data.reduce((a, b) => a && (typeof b.amount === "number") && typeof b.productId === "string", true);
    }
}

export class CreateOrderDto {
    @IsOptional()
    @IsString()
    order_code: string

    @IsNotEmpty()
    @IsArray()
    @Validate(IsProductArray, {
        message: "Enter valid value .",
    })
    productList: IProductList[]

    @IsDefined()
    @IsNumber()
    price: number

    @IsDefined()
    @IsNumber()
    discount: number

    @IsDefined()
    @IsNumber()
    net_price: number

    @IsOptional()
    @IsEnum(StatusOrderEnum)
    status: string

    @IsOptional()
    @IsString()
    evidence_purchase: string
}
