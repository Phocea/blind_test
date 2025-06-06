// ---------------------------
// FILE: server/utils/pdfGenerator.ts
// ---------------------------
import PDFDocument from 'pdfkit';

export function generatePdf(items: any[]): Promise<Buffer> {
  return new Promise(resolve => {
    const doc = new PDFDocument();
    const buffers: Buffer[] = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => resolve(Buffer.concat(buffers)));

    doc.fontSize(20).text('🎧 Blind Test - Années 80', { align: 'center' });
    doc.moveDown();

    items.forEach((item, index) => {
      doc.fontSize(14).text(`${index + 1}. ${item.title}${item.artist ? ' - ' + item.artist : ''}`);
      doc.fontSize(10).text(item.anecdote);
      doc.moveDown();
    });

    doc.end();
  });
}
