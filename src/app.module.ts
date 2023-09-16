import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { DatabaseModule } from './database/database.module';
import { FileSystemController } from './file-system/fs.controller';
import { FsModule } from './file-system/fs.module';
import { ProductModule } from './product/product.module';
import { PromotionModule } from './promotion/promotion.module';

@Module({
  imports: [AdminModule, FsModule, ProductModule, PromotionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
