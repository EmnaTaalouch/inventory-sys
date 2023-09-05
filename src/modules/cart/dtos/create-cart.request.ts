import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCartRequest {
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  productId: number;
}
