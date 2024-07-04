const { crearExcel } = require("../controllers/helpers/reporte.helper");
const { crearPdf } = require("../controllers/helpers/pdf.helper");

const ruta = require("express").Router();

ruta.get("/excel", async (req, res) => {
  await crearExcel(res);
});

ruta.get("/pdf", async (req, res) => {
  await crearPdf(res);
});

module.exports = {
  indice: "/reportes",
  ruta,
};
