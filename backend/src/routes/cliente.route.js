const express = require("express");
const router = express.Router();
const clienteCtrl = require("../controller/cliente.controller");
//const codigoCtrl = require("../controller/codigo.controller");
//const { verifyCode } = require("../controller/cliente.controller");
//const { requestPasswordReset } = require("../controller/codigo.controller");


//router.post("/:send-code", codigoCtrl.sendSecurityCode)
// Crear un nuevo cliente
router.post("/", clienteCtrl.crearCliente);

// Obtener todos los clientes
router.get("/", clienteCtrl.obtenerClientes);

// Obtener un cliente por ID
router.get("/:id", clienteCtrl.obtenerClientePorId);

// Actualizar un cliente por ID
router.put("/:id", clienteCtrl.actualizarCliente);

// Eliminar un cliente por ID
router.delete("/:id", clienteCtrl.eliminarCliente);

//Ruta del Login
router.post("/:login", clienteCtrl.loginCliente);

//Ruta para cambiar la contraseña
router.patch("/:cambio3", clienteCtrl.cambiarContrasenia);

module.exports = router;
