import { Module } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { PromotionController } from './promotion.controller';
import { promotionProviders } from 'src/database/provider/promotion.provider';
import { DatabaseModule } from 'src/database/database.module';
import { productsProviders } from 'src/database/provider/product.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [PromotionController],
  providers: [PromotionService, ...promotionProviders, ...productsProviders],
})
export class PromotionModule { }
