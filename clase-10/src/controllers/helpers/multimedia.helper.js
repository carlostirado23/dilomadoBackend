const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { v2: cloudinary } = require("cloudinary");

cloudinary.config({
  cloud_name: "dgmvpcemk",
  api_key: "888953747373354",
  api_secret: "C_yvzHxTgV6HXxDuSi4rZrktAQo",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    allowed_formats: ["jpg", "png"],
  },
});

const subirImagen = multer({ storage: storage });

const obtenerImagen = (url) => {
  const imagenFirmada = cloudinary.url(url, {
    sign_url: true,
  });

  return imagenFirmada;
};

module.exports = {
  subirImagen,
  obtenerImagen,
};
