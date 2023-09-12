import {
  IsNotEmpty,
  IsString,
  IsDate,
  IsNumber,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';
import { DeepPartial } from 'typeorm';
import { ProductModel } from 'src/modules/product/models/product.model';

export class CreateInvoiceDto {
  @IsNotEmpty()
  @IsString()
  invoiceNumber: string;

  @IsDate()
  dueDate: Date;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsNumber()
  totalAmount: number;

  @IsArray()
  @ArrayNotEmpty()
  products: DeepPartial<ProductModel>[]; // Updated to DeepPartial<ProductModel>[]
}
