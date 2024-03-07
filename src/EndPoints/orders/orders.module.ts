import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ProductsModule } from '../products/products.module';
import { ProductsService } from '../products/products.service';

@Module({
  imports: [ProductsModule],
  controllers: [OrdersController],
  providers: [OrdersService, ProductsService],
})
export class OrdersModule {}
