import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { productsProviders } from 'src/database/provider/product.provider';
import { DatabaseModule } from 'src/database/database.module';
import { promotionProviders } from 'src/database/provider/promotion.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductController],
  providers: [ProductService, ...productsProviders, ...promotionProviders],
})
export class ProductModule { }
