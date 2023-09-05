import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderRequest {
  @IsOptional()
  @IsNumber()
  total?: number;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsString()
  payment_status: string;

  @IsOptional()
  date_payment?: Date;

  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  productIds: number[];
}
