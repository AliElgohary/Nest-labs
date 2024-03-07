import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(
    @Body('id') orderID,
    @Body('totalprice') totalPrice,
    @Body('items') items,
  ) {
    const data = { id: orderID, totalprice: totalPrice, items };
    return this.ordersService.create(data);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body('id') orderID,
    @Body('totalprice') totalPrice,
    @Body('items') items,
  ) {
    const data = { id: orderID, totalprice: totalPrice, items };
    return this.ordersService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }

  @Get(':id/products')
  getOrderProducts(@Param('id') id) {
    return this.ordersService.findOrderProduct(+id);
  }
}
