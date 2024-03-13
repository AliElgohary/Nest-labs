import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Header,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrderService } from './orders.service';
import { UserRoles } from '../users/auth.decorator';
import { Role } from '../users/auth.enum';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrderService) {}

  @UserRoles(Role.Admin)
  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body('totalprice') totalPrice, @Body('items') items) {
    const data = { totalprice: totalPrice, items };
    return this.ordersService.Add(data);
  }

  @Header('Content-Type', 'application/json')
  @Header('set-Cookie', 'username=aly')
  @Get()
  async findAll() {
    return this.ordersService.Orders();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.ordersService.OrderByID(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body('id') orderID,
    @Body('totalprice') totalPrice,
    @Body('items') items,
  ) {
    const data = { id: orderID, totalprice: totalPrice, items };
    return this.ordersService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.ordersService.delete(id);
  }

  @Get(':id/products')
  async getOrderProducts(@Param('id') id: string) {
    return this.ordersService.findOrderWithProducts(id);
  }
}
