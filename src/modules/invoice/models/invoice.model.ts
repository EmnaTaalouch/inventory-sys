import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { ProductModel } from 'src/modules/product/models/product.model';
import { UserModel } from 'src/modules/user/models/user.model';

@Entity()
export class InvoiceModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  invoiceNumber: string;

  @Column({ type: 'timestamp', nullable: true })
  issueDate: Date; // Date when the invoice was issued

  @Column({ type: 'timestamp', nullable: true })
  dueDate: Date; // Due date for payment

  @Column()
  status: string; // Invoice status ( "Pending," "Paid," "Overdue")

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalAmount: number;
  @ManyToOne(() => UserModel, (user) => user.invoices, { onDelete: 'CASCADE' }) // Specify onDelete: 'CASCADE'
  user: UserModel;

  @OneToMany(() => ProductModel, (product) => product.invoice, {
    onDelete: 'CASCADE',
  }) // Specify onDelete: 'CASCADE'
  products: ProductModel[];
}
