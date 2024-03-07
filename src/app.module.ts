import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './EndPoints/orders/orders.module';
import { ProductsModule } from './EndPoints/products/products.module';

@Module({
  imports: [OrdersModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
