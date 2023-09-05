import { Module } from '@nestjs/common';
import { OrderController } from './controllers/order.controller';
import { OrderService } from './services/order.service';
import { OrderModel } from './models/order.model';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [TypeOrmModule.forFeature([OrderModel])],
})
export class OrderModule {}
