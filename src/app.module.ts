import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { FsModule } from './file-system/fs.module';
import { ProductModule } from './product/product.module';
import { PromotionModule } from './promotion/promotion.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { CartModule } from './cart/cart.module';
import { HighlightModule } from './highlight/highlight.module';

@Module({
  imports: [AdminModule, FsModule, ProductModule, PromotionModule, UserModule, OrderModule, CartModule, HighlightModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

