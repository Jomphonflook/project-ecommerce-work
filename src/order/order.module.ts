import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ordersProvider } from 'src/database/provider/order.provicer';
import { productsProviders } from 'src/database/provider/product.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [OrderController],
  providers: [OrderService, ...ordersProvider, ...productsProviders],
})
export class OrderModule { }
