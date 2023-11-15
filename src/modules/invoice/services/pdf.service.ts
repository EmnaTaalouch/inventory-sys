import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as PDFDocument from 'pdfkit';
import { ProductModel } from 'src/modules/product/models/product.model';

@Injectable()
export class PdfService {
  async generateInvoicePdf(invoice: any): Promise<string> {
    const pdfPath = path.join(
      process.cwd(),
      'uploads/pdfs',
      `${invoice.invoiceNumber}.pdf`,
    );
    const doc = new PDFDocument();

    // Pipe the PDF content to a file
    doc.pipe(fs.createWriteStream(pdfPath));

    // Add company information at the top
    doc.fontSize(16).text('Art Case', { align: 'center' });
    doc
      .fontSize(12)
      .text('123 Art Street, Hammamet, Tunisia', { align: 'center' });
    doc.fontSize(12).text('Phone: 123-456-7890 | Email: info@artcase.com', {
      align: 'center',
    });
    doc.moveDown();

    // Add invoice details
    doc.fontSize(14).text('Invoice Details', { align: 'center' });
    doc.fontSize(12).text(`Invoice Number: ${invoice.invoiceNumber}`);
    doc.fontSize(12).text(`Issue Date: ${invoice.issueDate.toLocaleString()}`);
    doc
      .fontSize(12)
      .text(
        `Due Date: ${
          invoice.dueDate ? invoice.dueDate.toLocaleString() : 'Unpaied'
        }`,
      );
    doc.moveDown();
    // Add products table
    doc.fontSize(14).text('Products', { align: 'center' });
    doc.moveDown();
    doc.font('Helvetica-Bold').fontSize(12);
    doc.text('Product Name', 50, 240);
    doc.text('Price', 250, 240, { width: 100, align: 'right' });
    doc.text('Subtotal', 350, 240, { width: 100, align: 'right' });

    // Table rows
    doc.font('Helvetica').fontSize(10);
    let y = 260; // Initial Y coordinate for the first row
    invoice.products.forEach((product) => {
      doc.text(product.name, 50, y);
      doc.text(`$${product.price.toFixed(2)}`, 250, y, {
        width: 100,
        align: 'right',
      });
      doc.text(`$${product.price.toFixed(2)}`, 350, y, {
        width: 100,
        align: 'right',
      });
      y += 20; // Increment Y coordinate for the next row
    });

    doc.moveDown();

    // Add total amount
    doc
      .fontSize(12)
      .text(`Total Amount $${invoice.totalAmount}`, { align: 'right' });

    // Close the PDF
    doc.end();

    return pdfPath;
  }
}
