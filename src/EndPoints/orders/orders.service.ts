import { Inject, Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(ProductsService)
    private readonly productsService: ProductsService,
  ) {}

  private orders = [];
  create(order) {
    this.orders.push(order);
    return this.orders;
  }

  findAll() {
    return this.orders;
  }

  findOne(id) {
    const theOrder = this.orders.find((o) => o.id == id);
    return theOrder;
  }

  update(id: number, data) {
    const orderIndex = this.orders.findIndex((o) => o.id == id);
    console.log(orderIndex);
    this.orders[orderIndex] = {
      ...this.orders[orderIndex],
      ...data,
    };
    return this.orders;
  }

  remove(id: number) {
    const orderIndex = this.orders.findIndex((o) => o.id == id);
    this.orders.splice(orderIndex, 1);
    return this.orders;
  }

  async findOrderProduct(id: number) {
    const orderIndex = this.orders.findIndex((o) => o.id == id);
    const orderProducts = this.orders[orderIndex].items;
    const products = orderProducts.map((itemId) => {
      const product = this.productsService.findOne(itemId);
      return product;
    });

    return products;
  }
}
