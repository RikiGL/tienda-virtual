const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const SecurityCode = require("../models/codigo.model");

const codigoCtrl = {};

// Configura OAuth2
const OAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);
OAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

// Función para enviar el correo con el código
async function sendSecurityCode(email, code) {
  try {
    const accessToken = await OAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    const mailOptions = {
      from: 'Mi Despensa <${process.env.EMAIL_USER}>',
      to: email,
      subject: 'Código para cambio de contraseña',
      html: `<h1> de Contraseña</h1>
             <p>Tu código de verificación es: <strong>${code}</strong></p>
             <p>Este código expirará en 10 minutos.</p>`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Correo enviado a:", email);
  } catch (error) {
    console.error("Error enviando correo:", error);
    throw new Error("Error enviando el correo");
  }
}

// Función para guardar el código en la base de datos
async function saveSecurityCode(email, code) {
  const expirationTime = new Date(Date.now() + 10 * 60 * 1000); // 10 minutos
  const newCode = new SecurityCode({ email, code, expiration: expirationTime });
  await newCode.save();
}

module.exports = codigoCtrl;

exports.verifyCode = async (req, res) => {
    try {
      const { email, code } = req.body;
      const record = await SecurityCode.findOne({ email, code });
  
      if (!record) {
        return res.status(400).json({ message: "Código inválido" });
      }
  
      if (record.expiration < Date.now()) {
        return res.status(400).json({ message: "El código ha expirado" });
      }
  
      res.status(200).json({ message: "Código verificado correctamente" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  
// Controlador para manejar la solicitud de envío del código
exports.requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const code = Math.floor(100000 + Math.random() * 900000).toString(); // Código de 6 dígitos
    await saveSecurityCode(email, code);
    await sendSecurityCode(email, code);
    res.status(200).json({ message: "Código enviado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};