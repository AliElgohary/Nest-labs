import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class OrderService {
  constructor(@InjectModel('orders') private OrderModel) {}

  async Orders() {
    const AllOrders = await this.OrderModel.find({});
    return AllOrders;
  }
  OrderByID(id) {
    return this.OrderModel.findById(id);
  }
  async Add(order) {
    const newOrder = new this.OrderModel(order);
    await newOrder.save();
    return newOrder;
  }
  async update(id, order) {
    const foundOrder = await this.OrderModel.findOneAndUpdate(
      { _id: id },
      order,
      { new: true },
    );
    if (foundOrder) {
      return { message: 'Updated Successfully', data: foundOrder };
    } else {
      return { message: 'Not Found' };
    }
  }

  async delete(id) {
    await this.OrderModel.Delete(id);
    return { message: 'Deconsted Successfully' };
  }

  async findOrderWithProducts(orderId: string): Promise<any> {
    return this.OrderModel.findById(orderId).populate('items').exec();
  }
}
