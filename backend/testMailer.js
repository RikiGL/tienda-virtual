const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv").config();

// Configuración de OAuth2
const OAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);
OAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

async function testSendMail() {
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
            from: process.env.EMAIL_USER,
            to: "maferarias2003@gmail.com", // Cambia esto por tu correo para probar
            subject: "Prueba de envío",
            text: "Este es un correo de prueba enviado desde Node.js",
        };

        const result = await transporter.sendMail(mailOptions);
        console.log("Correo enviado:", result.response);
    } catch (error) {
        console.error("Error enviando el correo:", error.message);
    }
}

testSendMail();
