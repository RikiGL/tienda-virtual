const mongoose = require("mongoose");

// Cadena de conexión
// Usa la variable de entorno de MONGODB_URI o una base local por defecto
const URI = process.env.MONGODB_URI || "mongodb://localhost:27017/dbtest";
console.log(URI);

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("La base de datos ha sido conectada: ", URI))
  .catch((err) =>
    console.error("Error al conectar con la base de datos: ", err)
  );
