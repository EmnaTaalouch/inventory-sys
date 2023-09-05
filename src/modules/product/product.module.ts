import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { ProductModel } from './models/product.model';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [ProductService],
  controllers: [ProductController],
  imports: [TypeOrmModule.forFeature([ProductModel])],
})
export class ProductModule {}
