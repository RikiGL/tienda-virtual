//Llama a los modulos que instalamos mediante npm
const express = require("express");
const cors = require("cors");
//const bcryptRoute = require('./routes/bcryptRoute');
const app = express(); //En app se almacena las funcionalidad de express
//const clienteRoutes = require("./routes/cliente.route");
const { OAuth2Client } = require("google-auth-library");
//Configuración
//Se usará el puerto que se asigne con por el S.O. con process.env.PORT
//de lo contrario, usará el puerto 4000
app.set("port", process.env.PORT || 4000);

// Google OAuth
const client = new OAuth2Client("215959712464-3spuv70q1mf9al6u6jbf31ot30eruouu.apps.googleusercontent.com"); // Usa tu Client ID aquí


//middlewares
app.use(cors()); // Para hacer consultas entre servidores
app.use(express.json()); // Envio de JSON cuando se hace peticiones


//rutas

app.get("/", (req, res) => {
  res.send("Bienvenido a la API Rest Full");
});


//app.use("/api/clientes", clienteRoutes);

//app.use('/auth', bcryptRoute);
//rutas para la API de clientes
app.use("/api/clientes", require("./routes/cliente.route"));

//rutas para la API de facturas
app.use("/api/facturas", require("./routes/factura.route"));

//rutas para la API de productos
app.use("/api/productos", require("./routes/productos.route"));


app.post("/api/auth/google", async (req, res) => {
  const { token, domicilio } = req.body;

  try {
    // Verificar el token con Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: "215959712464-3spuv70q1mf9al6u6jbf31ot30eruouu.apps.googleusercontent.com", // Asegúrate de usar el mismo Client ID
    });

    // Obtener los datos del usuario
    const payload = ticket.getPayload();
    console.log("Datos del usuario en el back:", payload);

    // Ejemplo: Manejo de usuario en tu sistema
    const user = {
      nombre: payload.given_name,
      apellido: payload.family_name,
      email: payload.email,
      domicilio:{
        ciudad:domicilio.ciudad,
        direccion:domicilio.descripcion,
        referencia:domicilio.referencia
      }
    };

    // Aquí podrías registrar al usuario en tu base de datos si es nuevo

    res.json({ success: true, user });
  } catch (error) {
    console.error("Error al validar el token:", error);
    res.status(401).json({ success: false, message: "Token inválido" });
  }
});

//app.use("/a")
//Se exporta el app para que sea utilizado en otras partes del proyecto
module.exports = app;
