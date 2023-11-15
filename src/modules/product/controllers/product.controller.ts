import {
  Controller,
  Get,
  Post,
  Put,
  Res,
  Delete,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CreateProductRequest } from '../dtos/create-product.request';
import { ProductCreatedResponse } from '../dtos/product-created.response';
import { ProductService } from '../services/product.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { randomUUID } from 'crypto';
import Path = require('path');
import { Observable, of } from 'rxjs';
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('upload_product_image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'uploads/images',
        filename: (req, file, cb) => {
          const filename: string = 'productImage-' + randomUUID();
          const extension: string = Path.parse(file.originalname).ext;
          cb(null, `${filename}${extension}`);
        },
      }),
    }),
  )
  async upload_product_image(@UploadedFile() file: Express.Multer.File) {
    // this.productService.updateProductImage(id, file.path);
    return {
      statusCode: 200,
      data: file.filename,
    };
  }

  @Get('product_image/:imagename')
  findProfileImage(
    @Param('imagename') imagename,
    @Res() res,
  ): Observable<Object> {
    return of(
      res.sendFile(Path.join(process.cwd(), 'uploads/images/' + imagename)),
    );
  }

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
