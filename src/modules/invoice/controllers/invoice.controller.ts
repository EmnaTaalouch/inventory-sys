import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';

import { InvoiceService } from '../services/invoice.service';
import { CreateInvoiceDto } from '../dtos/create-invoice.Dto';
import { UpdateInvoiceDto } from '../dtos/update-invoice.Dto';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Get()
  getAllInvoices() {
    return this.invoiceService.getAllInvoices();
  }

  @Get(':id')
  getInvoiceById(@Param('id') invoiceId: number) {
    return this.invoiceService.getInvoiceById(invoiceId);
  }

  @Post()
  createInvoice(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoiceService.createInvoice(createInvoiceDto);
  }

  @Put(':id')
  updateInvoice(
    @Param('id') invoiceId: number,
    @Body() updateInvoiceDto: UpdateInvoiceDto,
  ) {
    return this.invoiceService.updateInvoice(invoiceId, updateInvoiceDto);
  }

  @Delete(':id')
  deleteInvoice(@Param('id') invoiceId: number) {
    return this.invoiceService.deleteInvoice(invoiceId);
  }
}
