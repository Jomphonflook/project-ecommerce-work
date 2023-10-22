import { IsArray, IsDefined, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Validate, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator"
import { IProductList, StatusOrderEnum } from "src/database/interface/order.interface"

@ValidatorConstraint()
export class IsProductArray implements ValidatorConstraintInterface {
    public async validate(Data: IProductList[]) {
        return Array.isArray(Data) && Data.reduce((a, b) => a && (typeof b.amount === "number") && typeof b.option === "string", true);
    }
}

export class CreateOrderDto {
    @IsOptional()
    order_code: any

    @IsDefined()
    @IsString()
    cartId : string

    userId : string

    totalDiscount : number

    @IsOptional()
    productList: IProductList[]

    @IsOptional()
    @IsNumber()
    price: number

    @IsOptional()
    @IsNumber()
    discount: number

    @IsOptional()
    @IsNumber()
    net_price: number

    @IsOptional()
    @IsEnum(StatusOrderEnum)
    status: string

    @IsOptional()
    @IsString()
    evidence_purchase: string

    @IsDefined()
    @IsString()
    address: string
}
