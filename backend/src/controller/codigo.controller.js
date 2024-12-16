const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const bcrypt = require("bcryptjs");
const SecurityCode = require("../models/codigo.model");
const Cliente = require("../models/cliente.model");
require("dotenv").config(); // Cargar variables de entorno

// Configuración de OAuth2 para enviar correos
const OAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);
OAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

// Función para enviar correos con el código de verificación
async function sendSecurityCode(email, code) {
    try {
        console.log(`Preparando para enviar el correo a: ${email}`); // Verificación de que el código se ejecuta

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: process.env.EMAIL_USER,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER, // Usar correo del remitente configurado
            to: email,
            subject: "Código de Verificación - Tu Despensa",
            html: `
                <div style="font-family: Arial, sans-serif; background-color: #F5F5F5; padding: 20px; border-radius: 8px; border: 1px solid #E0E0E0; color: #333;">
                    <h1 style="color: #4CAF50; text-align: center;">¡Bienvenido a Tu Despensa!</h1>
                    <p style="font-size: 16px; text-align: center;">Hola,</p>
                    <p style="font-size: 16px; text-align: center;">Gracias por elegir Tu Despensa. Para completar el proceso de cambio de contraseña, por favor usa el siguiente código de verificación:</p>
                    <h2 style="font-size: 28px; color: #FF7043; text-align: center;">${code}</h2>
                    <p style="font-size: 16px; text-align: center;">Este código expirará en 5 minutos. Si no lo solicitaste, por favor ignora este mensaje.</p>
                    <p style="font-size: 16px; text-align: center; color: #4CAF50;">¡Gracias por confiar en nosotros!</p>
                    <p style="font-size: 16px; text-align: center; font-weight: bold;">El equipo de Tu Despensa 🛒</p>
                </div>`,
        };

        // Enviar el correo
        await transporter.sendMail(mailOptions);
        console.log(`Correo enviado exitosamente a: ${email}`);
    } catch (error) {
        console.error("Error al enviar el correo:", error);
        throw new Error("No se pudo enviar el correo");
    }
}

// Función para guardar o actualizar el código en la base de datos
async function saveOrUpdateSecurityCode(email, code) {
    const expirationTime = new Date(Date.now() + 5 * 60 * 1000); // 5 minutos de expiración

    try {
        const existingCode = await SecurityCode.findOne({ email });

        if (existingCode) {
            // Actualizar código existente
            existingCode.code = code;
            existingCode.expiration = expirationTime;
            await existingCode.save();
            console.log("Código actualizado exitosamente.");
        } else {
            // Crear nuevo código
            const newCode = new SecurityCode({ email, code, expiration: expirationTime });
            await newCode.save();
            console.log("Código guardado exitosamente.");
        }
    } catch (error) {
        console.error("Error guardando el código en la base de datos:", error);
        throw new Error("Error guardando el código en la base de datos");
    }
}

// Función para verificar si han pasado más de 3 minutos desde el último código enviado
async function checkLastCodeSentTime(email) {
    try {
        const lastCode = await SecurityCode.findOne({ email }).sort({ _id: -1 }); // Obtener el último código enviado

        if (lastCode) {
            const timeDifference = new Date() - lastCode.createdAt;
            if (timeDifference < 3 * 60 * 1000) {
                // Si el último código fue enviado hace menos de 3 minutos
                return { canSendCode: false, message: "Ya se ha enviado un código recientemente. Espera 3 minutos para solicitarlo nuevamente." };
            }
        }

        return { canSendCode: true };
    } catch (error) {
        console.error("Error verificando el tiempo del último código enviado:", error);
        throw new Error("Error al verificar el tiempo del último código enviado");
    }
}

// Función para verificar el correo
async function verificarCorreo(email) {
    try {
        const user = await Cliente.findOne({ email });

        if (!user) {
            return { valid: false, message: "El correo no está registrado." };
        }

        return { valid: true, message: "Correo válido." };
    } catch (error) {
        console.error("Error verificando el correo:", error);
        throw new Error("Error verificando el correo");
    }
}

async function verifySecurityCode(code) {
    try {
        const securityCode = await SecurityCode.findOne({ code });

        console.log(`Código recibido: ${code}`);
        console.log(`Código en base de datos: ${securityCode?.code}`);

        if (!securityCode) {
            return { valid: false, message: "Código incorrecto." };
        }

        if (new Date() > securityCode.expiration) {
            return { valid: false, message: "El código ha expirado." };
        }

        return { valid: true, message: "Código verificado correctamente." };
    } catch (error) {
        console.error("Error al verificar el código:", error.message);
        throw new Error("Error al verificar el código");
    }
}


const verifyCode = async (req, res) => {
    const {code } = req.body; // Obtén email y código de req.body

    if (!code) {
        return res.status(400).json({ error: "El correo y el código son requeridos." });
    }

    try {
        const result = await verifySecurityCode(code.trim()); // Pasa email y código como argumentos

        if (result.valid) {
            console.log("Código verificado correctamente para:", email);
            res.status(200).json({ message: result.message });
        } else {
            console.log("Código incorrecto o expirado.");
            res.status(400).json({ error: result.message });
        }
    } catch (error) {
        console.error("Error al verificar el código:", error.message);
        res.status(500).json({ error: "Hubo un problema con el servidor. Inténtalo más tarde." });
    }
};


const codigosController = {
    enviarCodigo: async (req, res) => {
        try {
            const { email } = req.body;

            if (!email) {
                return res.status(400).json({ error: "El correo electrónico es requerido." });
            }

            const emailLimpio = email.trim().toLowerCase(); // Limpieza de espacios y formato
            console.log("Correo recibido para enviar código:", emailLimpio);

            // Verificar si el correo pertenece a un cliente registrado
            const user = await Cliente.findOne({ email: emailLimpio });
            if (!user) {
                return res.status(404).json({ error: "El correo no está registrado." });
            }

            // Verificar si han pasado más de 3 minutos desde el último código enviado
            const canSendCode = await checkLastCodeSentTime(emailLimpio);
            if (!canSendCode.canSendCode) {
                console.log("Intento de envío de código antes del tiempo permitido.");
                return res.status(400).json({ error: canSendCode.message });
            }

            // Generar código de 6 dígitos
            const code = Math.floor(100000 + Math.random() * 900000).toString();
            console.log("Código generado:", code);

            // Guardar o actualizar el código en la base de datos
            await saveOrUpdateSecurityCode(emailLimpio, code);

            // Enviar correo con el código
            console.log('Enviando correo a:', emailLimpio);
            await sendSecurityCode(emailLimpio, code);

            res.status(200).json({ message: "Código enviado exitosamente." });
        } catch (error) {
            console.error("Error en el envío del código:", error.message);
            res.status(500).json({ error: "Error del servidor. No se pudo enviar el código." });
        }
    },

    verificarCodigo: async (req, res) => {
        const { code } = req.body; // Obtén el código desde el cuerpo de la solicitud

        if (!code) {
            return res.status(400).json({ error: "El código es requerido." });
        }

        try {
            // Verificar el código
            const result = await verifySecurityCode(code.trim());

            if (result.valid) {
                console.log("Código verificado correctamente.");
                res.status(200).json({ message: result.message });
            } else {
                console.log("Código incorrecto o expirado.");
                res.status(400).json({ error: result.message });
            }
        } catch (error) {
            console.error("Error al verificar el código:", error.message);
            res.status(500).json({ error: "Hubo un problema con el servidor. Inténtalo más tarde." });
        }
    },

    verificarCorreo: async (req, res) => {
        try {
            const { email } = req.body;

            if (!email) {
                return res.status(400).json({ error: "El correo electrónico es requerido." });
            }

            const emailLimpio = email.trim().toLowerCase();
            console.log("Verificando existencia del correo:", emailLimpio);

            const result = await verificarCorreo(emailLimpio);

            if (result.valid) {
                console.log("Correo encontrado:", emailLimpio);
                res.status(200).json({ message: result.message });
            } else {
                console.log("Correo no encontrado.");
                res.status(404).json({ error: result.message });
            }
        } catch (error) {
            console.error("Error al verificar el correo:", error.message);
            res.status(500).json({ error: "Error del servidor. No se pudo verificar el correo." });
        }
    },
};

module.exports = codigosController;