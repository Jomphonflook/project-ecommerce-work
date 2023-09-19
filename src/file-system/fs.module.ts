import { Module } from "@nestjs/common";
import { FileSystemController } from "./fs.controller";
import { MulterModule } from "@nestjs/platform-express";

@Module({
    imports: [MulterModule.register({
      dest: './upload',
    })],
    controllers: [FileSystemController],
  })
  export class FsModule { }