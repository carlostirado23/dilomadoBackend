const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const direccionTemporal = path.join(__dirname, "../../tmp");

const crearPdf = async (res, data) => {
  const nombrePDF = "reporte_pdf.pdf";
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename=${nombrePDF}`);

  const archivo = path.join(direccionTemporal, nombrePDF);

  const doc = new PDFDocument();

  // doc.pipe(fs.createWriteStream(archivo));

  doc.font("Times-Roman").fontSize(25).text("Hola Mundo!", 100, 100);

  doc
    .fontSize(12)
    .text("Este es un ejemplo básico de cómo usar pdfkit.", 100, 150);

  // doc.image('ruta/a/tu/imagen.png', {
  //   fit: [250, 300],
  //   align: 'center',
  //   valign: 'center'
  // });

  doc.pipe(res);
  doc.end();
};

module.exports = {
  crearPdf,
};
