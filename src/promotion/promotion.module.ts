import { Module } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { PromotionController } from './promotion.controller';
import { promotionProviders } from 'src/database/provider/promotion.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PromotionController],
  providers: [PromotionService, ...promotionProviders],
})
export class PromotionModule { }
