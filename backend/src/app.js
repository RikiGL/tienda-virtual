//Llama a los modulos que instalamos mediante npm
const express = require("express");
const cors = require("cors");
const Cliente = require("./models/cliente.model");
require("dotenv").config();
const { google } = require("googleapis");
const PDFDocument = require("pdfkit");
//const bcryptRoute = require('./routes/bcryptRoute');
const app = express(); //En app se almacena las funcionalidad de express
//const clienteRoutes = require("./routes/cliente.route");
const { OAuth2Client } = require("google-auth-library");
const { find } = require("./models/factura.model");
const Table = require("pdfkit-table"); // Importar el constructor de la tabla correctamente

//Configuración
//Se usará el puerto que se asigne con por el S.O. con process.env.PORT
//de lo contrario, usará el puerto 4000
app.set("port", process.env.PORT || 4000);

// Google OAuth
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID); // Usa tu Client ID aquí

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

    const user = new Cliente({
      nombre: payload.given_name,
      apellido: payload.family_name,
      email: payload.email,
      rol: "cliente",
      domicilio: {
        ciudad: domicilio.ciudad,
        direccion: domicilio.direccion,
        referencia: domicilio.referencia,
      },
    });

    const clienteExistente = await Cliente.findOne({ email: user.email });
    if (clienteExistente) {
      console.log("Analisis de cliente existente");
      res.status(302).json({ user });
    } else {
      console.log("Cliente no existente");
      await user.save();
      console.log("Usuario guardado");
      res
        .status(201)
        .json({ success: true, user, message: "cliente creado exitosamente" });
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
      res.status(302).json({ clienteExistente });
    } else {
      console.log("Cliente no existente");

      res
        .status(404)
        .json({ success: false, message: "Cliente no encontrado " });
    }

    console.log("Esquema de usuario: ", clienteExistente);
    // Aquí podrías registrar al usuario en tu base de datos si es nuevo
  } catch (error) {
    console.error("Error al validar el token:", error);
    res.status(401).json({ success: false, message: "Token inválido" });
  }
});

// FACTURA - Ruta para generar la factura
app.get("/api/generate-factura", async (req, res) => {
  const { factura } = req.body;

  const id_cliente = factura.id_cliente;
  const total = factura.total;
  const metodo_pago = factura.metodo_pago;
  const cedula = factura.cedula;
  const celular = factura.celular;
  const productos = factura.productos;

  const cliente = await Cliente.findOne({ _id: id_cliente });
  // Generamos el arreglo de filas
  const rows = productos.map((producto) => {
    const total = producto.precio * producto.quantity;
    return [producto.descripcion, producto.quantity, producto.precio, total];
  });
  // Datos para la tabla
  const headers = ["Producto", "Cantidad", "Precio", "Total"];
  // Dimensiones y posición inicial
  let startX = 45;
  let startY = 255;
  let columnWidthProduct = 290; // Ancho de la primera columna (Producto)
  let columnWidthOther = 77; // Ancho de las otras columnas
  let rowHeight = 25;

  // Crear un nuevo documento PDF
  const doc = new PDFDocument();

  // Establecer encabezados para la respuesta HTTP (esto indica que es un PDF)
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", 'attachment; filename="factura.pdf"');

  // Iniciar el flujo de salida para el archivo PDF
  doc.pipe(res);

  // Obtener la fecha y hora actual
  const now = new Date();
  const formattedDate = now.toLocaleDateString("es-ES"); // Formato de fecha: dd/mm/yyyy
  const formattedTime = now.toLocaleTimeString("es-ES"); // Formato de hora: hh:mm:ss
  doc
    .font("Helvetica-Bold") // Cambiar a una fuente en negrilla
    .fontSize(20)
    .text("Tu Despensa", { align: "center" }) // Nombre de la tienda
    .fontSize(10)
    .moveDown();

  // Línea divisoria después del título
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, doc.y) // Comienza en la posición actual del cursor
    .lineTo(550, doc.y)
    .stroke()
    .moveDown(0.5);

  // Agregar contenido al PDF (por ejemplo, una factura simple)
  doc.fontSize(12).text(`Fecha de emisión: ${formattedDate}`);
  doc.fontSize(12).text(`Hora de emisión: ${formattedTime}`);
  doc.fontSize(12).text("FACTURA", { align: "center" });

  // Línea divisoria después de la fecha, hora y título
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, doc.y) // Comienza en la posición actual del cursor
    .lineTo(550, doc.y)
    .stroke()
    .moveDown(0.5);

  doc.fontSize(12).text("Cédula: " + cedula);
  doc.fontSize(12).text("Cliente: " + cliente.nombre + " " + cliente.apellido);
  doc.fontSize(12).text("Dirección: " + cliente.domicilio.direccion);
  doc.fontSize(12).text("Teléfono: " + celular);
  doc.fontSize(12).text("Correo: " + cliente.email);
  doc.moveDown(0.5);

  // Dibujar encabezados
  headers.forEach((header, i) => {
    // Ancho de la primera columna es diferente
    let columnWidth = i === 0 ? columnWidthProduct : columnWidthOther;

    doc
      .rect(
        startX +
          (i === 0 ? 0 : columnWidthProduct + (i - 1) * columnWidthOther),
        startY,
        columnWidth,
        rowHeight
      )
      .stroke();
    doc.text(
      header,
      startX +
        (i === 0 ? 0 : columnWidthProduct + (i - 1) * columnWidthOther) +
        5,
      startY + 5
    );
  });

  // Dibujar filas
  rows.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      // Ancho de la primera columna es diferente
      let columnWidth = cellIndex === 0 ? columnWidthProduct : columnWidthOther;

      doc
        .rect(
          startX +
            (cellIndex === 0
              ? 0
              : columnWidthProduct + (cellIndex - 1) * columnWidthOther),
          startY + (rowIndex + 1) * rowHeight,
          columnWidth,
          rowHeight
        )
        .stroke();
      doc.text(
        cell,
        startX +
          (cellIndex === 0
            ? 0
            : columnWidthProduct + (cellIndex - 1) * columnWidthOther) +
          5,
        startY + (rowIndex + 1) * rowHeight + 5
      );
    });
  });
  doc.moveDown(0.5);
  let subtotal = rows.reduce((sum, row) => {
    let totalValue = row[3];  // Asumimos que row[3] es un número
    return sum + totalValue;  // Sumar el valor numérico
  }, 0);
  // Redondear el resultado a dos decimales
  subtotal = parseFloat(subtotal.toFixed(2));
  const pageWidth = doc.page.width; // Ancho de la página
   // Añadir el footer centrado
  const subtotalStr ="Subtotal: $" + subtotal + "\n" + "Costo de envio: $1.50" + "\n" + "Total: $" + total;

 // Calcular la posición X para centrar el texto en el pie de página
 const subtotalWidth = doc.widthOfString(subtotalStr); // Obtener el ancho del texto
 const subtotalX = (pageWidth - subtotalWidth) / 2; // Calcular la posición X para centrar

 doc
   .moveDown(2) // Añadir un espacio antes del footer
   .fontSize(10)
   .text(subtotalStr, subtotalX, doc.y, { align: "right" }); // Alineamos el texto con el cálculo de la posición X

 // Finalizar el documento PDF




  // Línea divisoria para separar los detalles de la factura
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, doc.y + 10) // Ajustar espacio después del contenido
    .lineTo(550, doc.y + 10)
    .stroke()
    .moveDown(1);

  // Pie de página
  // Añadir el footer centrado
  const footerText =
    "Gracias por su compra en Tu Despensa.\nContactanos: info@tudespensa.com";

  // Calcular la posición X para centrar el texto en el pie de página
  const footerWidth = doc.widthOfString(footerText); // Obtener el ancho del texto
  const footerX = (pageWidth - footerWidth) / 2; // Calcular la posición X para centrar

  doc
    .moveDown(2) // Añadir un espacio antes del footer
    .fontSize(10)
    .text(footerText, footerX, doc.y, { align: "center" }); // Alineamos el texto con el cálculo de la posición X

  // Finalizar el documento PDF
  doc.end();
});

//Envio de Factura
app.get("/api/envio-factura", (req, res) => {
  const { email, link } = req.body;
  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: email, // Change to your recipient
    from: "rikiguallichico16@gmail.com", // Change to your verified sender
    subject: "Factura Electrónica - Tu Despensa",
    text: "Factura electrónica enviada desde Tu Despensa. Revisa tu correo para más detalles.",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #007BFF; text-align: center;">Factura Electrónica</h2>
        <p>Estimado cliente,</p>
        <p>Gracias por tu compra en <strong>Tu Despensa</strong>. Adjuntamos a este correo tu factura electrónica en formato PDF.</p>
        <p style="margin-top: 20px;">Si tienes alguna consulta, no dudes en contactarnos respondiendo a este correo o a través de nuestro soporte: <strong>info@tudespensa.com</strong>.</p>
        <hr style="border: 0; border-top: 1px solid #ccc;" />
        <footer style="text-align: center; font-size: 12px; color: #777;">
          <p>Tu Despensa © 2025</p>
          <p>Gracias por confiar en nosotros.</p>
        </footer>
      </div>
    `,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
      res.status(200).json({ success: true, message: "Token valido" });
    })
    .catch((error) => {
      console.error(error);
    });
});

//app.use("/a")
//Se exporta el app para que sea utilizado en otras partes del proyecto
module.exports = app;
