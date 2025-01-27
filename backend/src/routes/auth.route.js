const express = require("express");
const router = express.Router();
const codigosController = require("../controller/codigo.controller");

// Ruta para enviar el código de seguridad
router.post("/cambio", codigosController.enviarCodigo);

// Ruta para verificar el código de seguridad
router.post("/cambio2", codigosController.verificarCodigo);

// Ruta para verificar si un correo electrónico existe en el sistema
router.post("/cambio", codigosController.verificarCorreo);



module.exports = router;