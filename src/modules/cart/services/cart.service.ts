import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartModel } from '../models/cart.model';
import { CreateCartRequest } from '../dtos/create-cart.request';
import { CartCreatedResponse } from '../dtos/cart-created.response';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartModel)
    private readonly cartRepository: Repository<CartModel>,
  ) {}

  async addToCart(userId: number, createCartItemDto: CreateCartRequest) {
    const newCartItem = this.cartRepository.create({
      user: { id: userId },
      product: { productid: createCartItemDto.productId },
      quantity: createCartItemDto.quantity,
    });
    return this.cartRepository.save(newCartItem);
  }

  async getCartItems(userId: number) {
    const cartItems = await this.cartRepository.find({
      where: { user: { id: userId } },
      relations: ['product'],
    });

    return cartItems.map((cartItem) => ({
      quantity: cartItem.quantity,
      productId: cartItem.product.productid,
    }));
  }

  async removeFromCart(userId: number, productId: number) {
    const cartItem = await this.cartRepository.findOne({
      where: { user: { id: userId }, product: { productid: productId } },
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    await this.cartRepository.remove(cartItem);
  }

  async updateCartItem(
    userId: number,
    productId: number,
    updateCartItemDto: CartCreatedResponse,
  ) {
    const cartItem = await this.cartRepository.findOne({
      where: { user: { id: userId }, product: { productid: productId } },
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    this.cartRepository.merge(cartItem, updateCartItemDto);
    return this.cartRepository.save(cartItem);
  }

  async getCartItemById(userId: number, productId: number) {
    const cartItem = await this.cartRepository.findOne({
      where: { user: { id: userId }, product: { productid: productId } },
      relations: ['product'],
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    return cartItem;
  }
}
