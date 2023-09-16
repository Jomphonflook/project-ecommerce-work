import { IsDefined, IsString } from "class-validator";

export class CreateAdminDto {
    @IsDefined()
    @IsString()
    admin_code: String;

    @IsDefined()
    @IsString()
    username: String;

    @IsDefined()
    @IsString()
    password: String;

    @IsDefined()
    @IsString()
    phone: String;
}
