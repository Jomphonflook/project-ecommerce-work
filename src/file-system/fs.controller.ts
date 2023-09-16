import { Controller, Get, Injectable, Param, Post, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { createReadStream } from "fs";
import { join } from "path";

@Controller('fs')
export class FileSystemController {

    //savefile image
    @Post('/savefile')
    @UseInterceptors(FileInterceptor('img'))
    saveFile(
        @UploadedFile() file: Express.Multer.File
    ) {
        return file
    }
    
    //download image
    @Get('/file/download/:imagename')
    findProfileImage(@Param('imagename') imagename, @Res() res: any) {
        return res.sendFile(join(process.cwd(), 'upload/' + imagename));
    }

    //streaming img
    @Get('/file/get/:imagename')
    getFile(@Param('imagename') imagename, @Res() res: any) {
        const file = createReadStream(join(process.cwd(), 'upload/' + imagename));
        file.pipe(res);
    }
}