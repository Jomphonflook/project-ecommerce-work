import { IsDefined, IsString } from "class-validator"

export class LoginAdminDto {
    @IsDefined()
    @IsString()
    username: string

    @IsDefined()
    @IsString()
    password: string
}