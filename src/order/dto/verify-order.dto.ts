import { IsArray, IsNotEmpty, Validate, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { IProductList } from "src/database/interface/order.interface";


@ValidatorConstraint()
export class IsProductArray implements ValidatorConstraintInterface {
    public async validate(Data: IProductList[], args: ValidationArguments) {
        return Array.isArray(Data) && Data.reduce((a, b) => a && (typeof b.amount === "number") && typeof b.productId === "string", true);
    }
}
export class verifyOrderDto {
    @IsNotEmpty()
    @IsArray()
    @Validate(IsProductArray, {
        message: "Enter valid value .",
    })
    productList: IProductList[]
}