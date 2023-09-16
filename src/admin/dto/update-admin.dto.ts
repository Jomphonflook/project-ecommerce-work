import { IsDefined, IsString, IsOptional, isString } from "class-validator";
export class UpdateAdminDto {
    @IsOptional()
    @IsString()
    admin_code: String;

    @IsOptional()
    @IsString()
    username: String;

    @IsOptional()
    @IsString()
    phone: String;
}

