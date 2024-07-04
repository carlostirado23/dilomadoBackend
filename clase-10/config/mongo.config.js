const { MongoClient, ServerApiVersion } = require("mongodb");
const {
  MONGO_USUARIO,
  MONGO_CONTRASENA,
  MONGO_CONEXION,
  MONGO_CLUSTER,
  MONGO_BASE_DE_DATOS,
} = process.env;

const uri = `mongodb+srv://${MONGO_USUARIO}:${MONGO_CONTRASENA}@${MONGO_CONEXION}/?retryWrites=true&w=majority&appName=${MONGO_CLUSTER}`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let cliente = null;

const conexionBaseDeDatos = async () => {
  if (!cliente) {
    cliente = await client.connect();
    console.log("Conectado a Mongo.");
  }
  return cliente;
};

const obtenerColeccion = async (coleccion) => {
  const cliente = await conexionBaseDeDatos();
  const baseDeDatos = cliente.db(MONGO_BASE_DE_DATOS);
  return baseDeDatos.collection(coleccion);
};

module.exports = obtenerColeccion;
