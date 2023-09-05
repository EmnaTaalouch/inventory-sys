import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Delete,
  Put,
} from '@nestjs/common';

import { CartService } from '../services/cart.service';
import { CreateCartRequest } from '../dtos/create-cart.request';
import { CartCreatedResponse } from '../dtos/cart-created.response';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post(':userId')
  addToCart(
    @Param('userId') userId: number,
    @Body() createCartItemDto: CreateCartRequest,
  ) {
    return this.cartService.addToCart(userId, createCartItemDto);
  }

  @Get(':userId')
  getCartItems(@Param('userId') userId: number) {
    return this.cartService.getCartItems(userId);
  }

  @Delete(':userId/:productId')
  removeFromCart(
    @Param('userId') userId: number,
    @Param('productId') productId: number,
  ) {
    return this.cartService.removeFromCart(userId, productId);
  }

  @Put(':userId/:productId')
  updateCartItem(
    @Param('userId') userId: number,
    @Param('productId') productId: number,
    @Body() updateCartItemDto: CartCreatedResponse,
  ) {
    return this.cartService.updateCartItem(
      userId,
      productId,
      updateCartItemDto,
    );
  }

  @Get(':userId/:productId')
  getCartItemById(
    @Param('userId') userId: number,
    @Param('productId') productId: number,
  ) {
    return this.cartService.getCartItemById(userId, productId);
  }
}
