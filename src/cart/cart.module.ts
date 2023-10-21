import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { DatabaseModule } from 'src/database/database.module';
import { cartProviders } from 'src/database/provider/cart.provider';
import { productsProviders } from 'src/database/provider/product.provider';
import { promotionProviders } from 'src/database/provider/promotion.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [CartController],
  providers: [CartService, ...cartProviders, ...productsProviders, ...promotionProviders],
})
export class CartModule {}
