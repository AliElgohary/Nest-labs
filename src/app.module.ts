import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './EndPoints/orders/orders.module';
import { ProductsModule } from './EndPoints/products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { OMW } from './MiddleWares/orderMW';
import { UsersModule } from './EndPoints/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './EndPoints/users/auth.guard';

@Module({
  imports: [
    OrdersModule,
    ProductsModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nestjs'),
    UsersModule,
    JwtModule.register({ secret: 'secret', signOptions: { expiresIn: '1d' } }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(OMW).forRoutes('/orders');
    consumer.apply(OMW).forRoutes('/products');
  }
}
