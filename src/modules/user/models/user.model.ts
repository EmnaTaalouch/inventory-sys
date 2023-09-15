//import { CartModel } from 'src/modules/cart/models/cart.model';
import { OrderModel } from 'src/modules/order/models/order.model';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { InvoiceModel } from 'src/modules/invoice/models/invoice.model';
@Entity()
export class UserModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  first_name: string;

  @Column({ default: '' })
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  @UpdateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updateAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }

  async validatePassword(password: string): Promise<Boolean> {
    return bcrypt.compare(password, this.password);
  }
  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  phone_number: string;

  @Column({ nullable: true })
  payment_method: string;

  @OneToMany(() => OrderModel, (order) => order.user, { cascade: true })
  orders: OrderModel[];
  //@OneToMany(() => CartModel, (cartItem) => cartItem.user)
  //cartItems: CartModel[];

  @OneToMany(() => InvoiceModel, (invoice) => invoice.user, { cascade: true })
  invoices: InvoiceModel[];
}
