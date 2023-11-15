import { IsDefined, IsString, IsOptional, isString } from "class-validator";
export class UpdateAdminDto {

    @IsOptional()
    @IsString()
    username: String;

    @IsOptional()
    @IsString()
    phone: String;
}

