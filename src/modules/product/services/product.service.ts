import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductModel } from '../models/product.model';
import { CreateProductRequest } from '../dtos/create-product.request';
import { ProductCreatedResponse } from '../dtos/product-created.response';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductModel)
    private readonly productRepository: Repository<ProductModel>,
  ) {}

  async getAllProducts() {
    return this.productRepository.find();
  }

  async getProductById(productId: number) {
    const product = await this.productRepository.findOne({
      where: { productid: productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async createProduct(createProductDto: CreateProductRequest) {
    const newProduct = this.productRepository.create(createProductDto);
    return this.productRepository.save(newProduct);
  }

  async updateProduct(id: number, updateProductDto: ProductCreatedResponse) {
    const product = await this.getProductById(id);
    this.productRepository.merge(product, updateProductDto);
    return this.productRepository.save(product);
  }
  async updateProductImage(id: number, newImage: string) {
    const product = await this.getProductById(id);
    product.image = newImage;
    return this.productRepository.save(product);
  }

  async deleteProduct(id: number) {
    const product = await this.getProductById(id);
    return this.productRepository.remove(product);
  }
}
