const xl = require("excel4node");
const path = require("path");
const crypto = require("crypto");

const direccionTemporal = path.join(__dirname, "../../tmp");

const crearExcel = async (res, data) => {
  const wb = new xl.Workbook();

  const ws = wb.addWorksheet("Hoja 1");
  const hoja2 = wb.addWorksheet("Hoja 2");

  const estilo = wb.createStyle({
    font: {
      color: "#FF0800",
      size: 12,
    },
    numberFormat: "$#,##0.00; ($#,##0.00); -",
  });
  //cell (fila, columna)
  //fila = 1 === 1, columna = 1 === A
  ws.cell(1, 1).string("Hola").style(estilo);
  ws.cell(1, 2).number(100).style(estilo);
  ws.cell(2, 1).string("Mundo");
  ws.cell(2, 2).number(200);

  const nombreExcel = `excel_${crypto.randomUUID()}.xlsx`;
  const archivo = path.join(direccionTemporal, nombreExcel);
  wb.write(archivo, res);
};

module.exports = {
  crearExcel,
};
