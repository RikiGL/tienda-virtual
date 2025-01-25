//Llama a los modulos que instalamos mediante npm
const express = require("express");
const cors = require("cors");
const Cliente = require("./models/cliente.model");
require('dotenv').config();
const { google } = require('googleapis');
const PDFDocument = require('pdfkit');
//const bcryptRoute = require('./routes/bcryptRoute');
const app = express(); //En app se almacena las funcionalidad de express
//const clienteRoutes = require("./routes/cliente.route");
const { OAuth2Client } = require("google-auth-library");
//Configuración
//Se usará el puerto que se asigne con por el S.O. con process.env.PORT
//de lo contrario, usará el puerto 4000
app.set("port", process.env.PORT || 4000);

// Google OAuth
const client = new OAuth2Client (process.env.GOOGLE_CLIENT_ID);// Usa tu Client ID aquí



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

// Usar las rutas de autenticación
app.use("/api/auth", require("./routes/auth.route"));

// Registrarse con Google
app.post("/api/auth/google", async (req, res) => {
  const { token, domicilio } = req.body;

  try {
    // Verificar el token con Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID, // Asegúrate de usar el mismo Client ID
    });

    // Obtener los datos del usuario
    const payload = ticket.getPayload();
    console.log("Datos del usuario en el back:", payload);

    const user = new Cliente ({
      nombre: payload.given_name,
      apellido: payload.family_name,
      email: payload.email,
      rol: "cliente",
      domicilio:{
        ciudad:domicilio.ciudad,
        direccion:domicilio.direccion,
        referencia:domicilio.referencia
      }
    });

    const clienteExistente = await Cliente.findOne({ email: user.email });
    if (clienteExistente) {
      console.log("Analisis de cliente existente");
      res.status(302).json({user});
    }else{
      console.log("Cliente no existente");
      await user.save();
      console.log("Usuario guardado");
      res.status(201).json({ success: true, user, message: "cliente creado exitosamente" });
    }

    console.log("Esquema de usuario: ", user);
    // Aquí podrías registrar al usuario en tu base de datos si es nuevo

  } catch (error) {
    console.error("Error al validar el token:", error);
    res.status(401).json({ success: false, message: "Token inválido" });
  }
});


// Login Con Google
app.post("/api/auth/google-reg", async (req, res) => {
  const { token } = req.body;

  try {
    // Verificar el token con Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID, // Asegúrate de usar el mismo Client ID
    });

    // Obtener los datos del usuario
    const payload = ticket.getPayload();
    console.log("Datos del usuario en el back:", payload);

    

    const clienteExistente = await Cliente.findOne({ email: payload.email });
    if (clienteExistente) {
      
      res.status(302).json({clienteExistente});
    }else{
      console.log("Cliente no existente");
      
      res.status(404).json({ success: false,  message: "Cliente no encontrado " });
    }

    console.log("Esquema de usuario: ", clienteExistente);
    // Aquí podrías registrar al usuario en tu base de datos si es nuevo

  } catch (error) {
    console.error("Error al validar el token:", error);
    res.status(401).json({ success: false, message: "Token inválido" });
  }
});

// FACTURA - Ruta para generar la factura
app.get('/api/generate-factura', (req, res) => {
  // Crear un nuevo documento PDF
  const doc = new PDFDocument();

  // Establecer encabezados para la respuesta HTTP (esto indica que es un PDF)
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="factura.pdf"');

  // Iniciar el flujo de salida para el archivo PDF
  doc.pipe(res);

  // Agregar contenido al PDF (por ejemplo, una factura simple)
  doc.fontSize(18).text('Factura', { align: 'center' });
  doc.fontSize(12).text('Fecha: 25/01/2025');
  doc.text('---------------------------------------');
  doc.text('Cliente: Juan Pérez');
  doc.text('Producto: Laptop');
  doc.text('Cantidad: 1');
  doc.text('Precio unitario: $1000');
  doc.text('Total: $1000');
  doc.text('---------------------------------------');

  // Finalizar el documento PDF
  doc.end();
});



















//app.use("/a")
//Se exporta el app para que sea utilizado en otras partes del proyecto
module.exports = app;
