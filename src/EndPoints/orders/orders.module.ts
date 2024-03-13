import { Module } from '@nestjs/common';
import { OrderService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './schema/order.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'orders', schema: OrderSchema }]),
  ],
  controllers: [OrdersController],
  providers: [OrderService],
})
export class OrdersModule {}
