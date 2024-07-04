const {
  subirImagen,
  obtenerImagen,
} = require("../controllers/helpers/multimedia.helper");

const ruta = require("express").Router();

ruta.post("/subir-imagen", subirImagen.single("image"), (req, res) => {
  res.status(200).json({ imagenURL: req.file.path });
});

ruta.post("/obtener-imagen", (req, res) => {
  const imagen = obtenerImagen(req.body.imagen);
  res.status(200).json({
    imagen,
  });
});

module.exports = {
  indice: "/multimedia",
  ruta,
};
