//Llama a los modulos que instalamos mediante npm
const express = require("express");
const cors = require("cors");
const app = express(); //En app se almacena las funcionalidad de express

//Configuración
//Se usará el puerto que se asigne con por el S.O. con process.env.PORT
//de lo contrario, usará el puerto 4000
app.set("port", process.env.PORT || 4000);

//middlewares
app.use(cors()); // Para hacer consultas entre servidores
app.use(express.json()); // Envio de JSON cuando se hace peticiones

//rutas
app.get("/", (req, res) => {
  res.send("Bienvenido a la API Rest Full");
});



//rutas para la API de clientes
app.use("/api/clientes", require("./routes/cliente.route"));

//rutas para la API de facturas
app.use("/api/facturas", require("./routes/factura.route"));

//rutas para la API de productos
app.use("/api/productos", require("./routes/productos.route"));

//Se exporta el app para que sea utilizado en otras partes del proyecto
module.exports = app;
