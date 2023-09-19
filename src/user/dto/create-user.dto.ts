import { IsDefined, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @IsDefined()
    @IsString()
    member_code: String;

    @IsDefined()
    @IsString()
    username: String;

    @IsDefined()
    @IsString()
    password: String;

    @IsDefined()
    @IsString()
    phone: String;
    
    @IsDefined()
    @IsString()
    titlename: string;

    @IsDefined()
    @IsString()
    firstname: string;

    @IsDefined()
    @IsString()
    lastname: string;

    @IsOptional()
    @IsString()
    gender: string;
}
