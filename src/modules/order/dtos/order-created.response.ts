import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class OrderCreatedResponse {
  @IsNotEmpty()
  @IsNumber()
  orderid: number;

  @IsNotEmpty()
  @IsNumber()
  total: number;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsString()
  payment_status: string;

  @IsNotEmpty()
  date_payment: Date;

  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  productIds: number[];
}
