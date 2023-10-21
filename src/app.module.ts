import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { DatabaseModule } from './database/database.module';
import { FileSystemController } from './file-system/fs.controller';
import { FsModule } from './file-system/fs.module';
import { ProductModule } from './product/product.module';
import { PromotionModule } from './promotion/promotion.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [AdminModule, FsModule, ProductModule, PromotionModule, UserModule, OrderModule, CartModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
