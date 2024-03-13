import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductsService {
  constructor(@InjectModel('products') private ProductModel) {}

  async findAll() {
    const allProducts = await this.ProductModel.find({});
    return allProducts;
  }

  findOne(id) {
    return this.ProductModel.findById(id);
  }

  async create(product) {
    const newProduct = new this.ProductModel(product);
    await newProduct.save();
    return newProduct;
  }

  async update(id, product) {
    const updatedProduct = await this.ProductModel.findByIdAndUpdate(
      id,
      product,
      { new: true },
    );
    if (updatedProduct) {
      return { message: 'Updated Successfully', data: updatedProduct };
    } else {
      return { message: 'Not Found' };
    }
  }

  async remove(id) {
    await this.ProductModel.findByIdAndDelete(id);
    return { message: 'Deleted Successfully' };
  }
}
