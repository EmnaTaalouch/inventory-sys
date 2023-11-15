import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { ProductModel } from 'src/modules/product/models/product.model';
import { UserModel } from 'src/modules/user/models/user.model';

@Entity()
export class OrderModel {
  @PrimaryGeneratedColumn()
  orderid: number;

  @Column({ nullable: true })
  total: number;

  @Column({
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  date_order: Date;

  @Column({ default: 'Pending' })
  status: string;

  @Column({ default: 'Pending' })
  payment_status: string;

  @Column({ type: 'timestamp', nullable: true })
  date_payment: Date;

  @ManyToOne(() => UserModel, (user) => user.orders, { onDelete: 'CASCADE' }) // Specify onDelete: 'CASCADE'
  user: UserModel;

  @ManyToMany(() => ProductModel, (product) => product.orders, {
    onDelete: 'CASCADE',
  }) // Specify onDelete: 'CASCADE'
  @JoinTable()
  products: ProductModel[];
}
