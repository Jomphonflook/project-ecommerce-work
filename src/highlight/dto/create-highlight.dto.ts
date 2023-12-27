import { IsDefined, IsOptional, IsString } from "class-validator";

export class CreateHighlightDto {
    @IsString()
    @IsDefined()
    picPath : string

    @IsOptional()
    @IsString()
    title : string

    @IsOptional()
    @IsString()
    description : string
}
