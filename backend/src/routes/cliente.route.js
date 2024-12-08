const express = require("express");
const router = express.Router();
const clienteCtrl = require("../controller/cliente.controller");

// Crear un nuevo cliente
router.post("/", clienteCtrl.crearCliente);

//router.post("/login", clienteCtrl.loginCliente);

// Obtener todos los clientes
router.get("/", clienteCtrl.obtenerClientes);

// Obtener un cliente por ID
router.get("/:id", clienteCtrl.obtenerClientePorId);

// Actualizar un cliente por ID
router.put("/:id", clienteCtrl.actualizarCliente);

// Eliminar un cliente por ID
router.delete("/:id", clienteCtrl.eliminarCliente);

//Verificar el login:
router.post("/login", clienteCtrl.loginCliente);

module.exports = router;
