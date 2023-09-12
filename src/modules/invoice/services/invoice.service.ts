import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvoiceModel } from '../models/invoice.model';
import { UpdateInvoiceDto } from '../dtos/update-invoice.Dto';
import { CreateInvoiceDto } from '../dtos/create-invoice.Dto';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(InvoiceModel)
    private readonly invoiceRepository: Repository<InvoiceModel>,
  ) {}

  async getAllInvoices() {
    return await this.invoiceRepository.find();
  }

  async getInvoiceById(invoiceId: number) {
    const invoice = await this.invoiceRepository.findOne({
      where: { id: invoiceId },
    });
    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${invoiceId} not found`);
    }
    return invoice;
  }

  async createInvoice(createInvoiceDto: CreateInvoiceDto) {
    const newinvoice = this.invoiceRepository.create(createInvoiceDto);
    return await this.invoiceRepository.save(newinvoice);
  }

  async updateInvoice(invoiceId: number, UpdateInvoiceDto: UpdateInvoiceDto) {
    const invoice = await this.getInvoiceById(invoiceId);
    this.invoiceRepository.merge(invoice, UpdateInvoiceDto);
    return await this.invoiceRepository.save(invoice);
  }

  async deleteInvoice(invoiceId: number) {
    const invoice = await this.getInvoiceById(invoiceId);
    await this.invoiceRepository.remove(invoice);
    return { message: `Invoice with ID ${invoiceId} has been deleted` };
  }
}
