import { Module } from '@nestjs/common';
import { CartController } from './controllers/cart.controller';
import { CartService } from './services/cart.service';
import { CartModel } from './models/cart.model';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [CartController],
  providers: [CartService],
  imports: [TypeOrmModule.forFeature([CartModel])],
})
export class CartModule {}
