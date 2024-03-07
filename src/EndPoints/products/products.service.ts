import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  private static products = [];
  create(product) {
    ProductsService.products.push(product);
    return ProductsService.products;
  }

  findAll() {
    return ProductsService.products;
  }

  findOne(id) {
    const theProduct = ProductsService.products.find((p) => p.id == id);
    return theProduct;
  }

  update(id, product) {
    const productIndex = ProductsService.products.findIndex((o) => o.id == id);
    console.log(productIndex);
    ProductsService.products[productIndex] = {
      ...ProductsService.products[productIndex],
      ...product,
    };
    return ProductsService.products;
  }

  remove(id: number) {
    const productIndex = ProductsService.products.findIndex((o) => o.id == id);
    ProductsService.products.splice(productIndex, 1);
    return ProductsService.products;
  }
}
