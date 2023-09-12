import { Module } from '@nestjs/common';
import { InvoiceController } from './controllers/invoice.controller';
import { InvoiceService } from './services/invoice.service';
import { InvoiceModel } from './models/invoice.model';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [InvoiceController],
  providers: [InvoiceService],
  imports: [TypeOrmModule.forFeature([InvoiceModel])],
})
export class InvoiceModule {}
