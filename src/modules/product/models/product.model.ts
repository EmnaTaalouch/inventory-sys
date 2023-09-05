import { CartModel } from 'src/modules/cart/models/cart.model';
import { OrderModel } from 'src/modules/order/models/order.model';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';

@Entity()
export class ProductModel {
  @PrimaryGeneratedColumn()
  productid: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column({ default: false })
  isAvailable: boolean;

  @Column({ nullable: true })
  image: string;

  @ManyToMany(() => OrderModel, (order) => order.products)
  orders: OrderModel[];

  @OneToMany(() => CartModel, (cartItem) => cartItem.product)
  cartItems: CartModel[];
}