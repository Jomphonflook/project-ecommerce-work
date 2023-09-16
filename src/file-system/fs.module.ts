import { Module } from "@nestjs/common";
import { FileSystemController } from "./fs.controller";

@Module({
    controllers: [FileSystemController],
  })
  export class FsModule { }