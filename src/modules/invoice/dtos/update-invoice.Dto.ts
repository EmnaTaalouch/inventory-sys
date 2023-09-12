import {
  IsString,
  IsDate,
  IsNumber,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';
import { DeepPartial } from 'typeorm';
import { ProductModel } from 'src/modules/product/models/product.model';

export class UpdateInvoiceDto {
  @IsString()
  invoiceNumber?: string;

  @IsDate()
  dueDate?: Date;

  @IsString()
  status?: string;

  @IsNumber()
  totalAmount?: number;

  @IsArray()
  @ArrayNotEmpty()
  products?: DeepPartial<ProductModel>[]; // Updated to DeepPartial<ProductModel>[]
}
