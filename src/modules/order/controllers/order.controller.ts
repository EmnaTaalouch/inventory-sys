import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CreateOrderRequest } from '../dtos/create-order.request';
import { OrderCreatedResponse } from '../dtos/order-created.response';
import { OrderService } from '../services/order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @Get(':id')
  getOrderById(@Param('id') orderId: number) {
    return this.orderService.getOrderById(orderId);
  }

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderRequest) {

    return this.orderService.createOrder(createOrderDto);
  }

  @Put(':id')
  updateOrder(
    @Param('id') orderId: number,
    @Body() updateOrderDto: OrderCreatedResponse,
  ) {
    return this.orderService.updateOrder(orderId, updateOrderDto);
  }

  @Delete(':id')
  deleteOrder(@Param('id') orderId: number) {
    return this.orderService.deleteOrder(orderId);
  }
}
