import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CreateProductRequest } from '../dtos/create-product.request';
import { ProductCreatedResponse } from '../dtos/product-created.response';
import { ProductService } from '../services/product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  getProductById(@Param('id') productId: number) {
    return this.productService.getProductById(productId);
  }

  @Post()
  createProduct(@Body() createProductDto: CreateProductRequest) {
    return this.productService.createProduct(createProductDto);
  }

  @Put(':id')
  updateProduct(
    @Param('id') id: number,
    @Body() updateProductDto: ProductCreatedResponse,
  ) {
    return this.productService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: number) {
    return this.productService.deleteProduct(id);
  }
}
