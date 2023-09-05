import { ProductModel } from 'src/modules/product/models/product.model';
import { UserModel } from 'src/modules/user/models/user.model';
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CartModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => UserModel, (user) => user.cartItems)
  user: UserModel;

  @ManyToOne(() => ProductModel, (product) => product.cartItems)
  product: ProductModel;
}
