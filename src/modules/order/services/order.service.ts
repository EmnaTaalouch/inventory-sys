import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderModel } from '../models/order.model';
import { CreateOrderRequest } from '../dtos/create-order.request';
import { OrderCreatedResponse } from '../dtos/order-created.response';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderModel)
    private readonly orderRepository: Repository<OrderModel>,
  ) {}

  async getAllOrders() {
    return this.orderRepository.find();
  }

  async getOrderById(orderId: number) {
    const order = await this.orderRepository.findOne({
      where: { orderid: orderId },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async createOrder(createOrderDto: CreateOrderRequest) {
    const newOrder = this.orderRepository.create(createOrderDto);
    return this.orderRepository.save(newOrder);
  }

  async updateOrder(orderId: number, updateOrderDto: OrderCreatedResponse) {
    const order = await this.getOrderById(orderId);
    this.orderRepository.merge(order, updateOrderDto);
    return this.orderRepository.save(order);
  }

  async deleteOrder(orderId: number) {
    const order = await this.getOrderById(orderId);
    return this.orderRepository.remove(order);
  }
}
