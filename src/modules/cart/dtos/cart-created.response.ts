import { IsNotEmpty, IsNumber } from 'class-validator';

export class CartCreatedResponse {
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  productId: number;
}
