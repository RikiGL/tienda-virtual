const express = require('express');
const router = express.Router();
const clienteCtrl = require('../controllers/cliente.controller');

// Crear un nuevo cliente
router.post('/clientes', clienteCtrl.crearCliente);

// Obtener todos los clientes
router.get('/clientes', clienteCtrl.obtenerClientes);

// Obtener un cliente por ID
router.get('/clientes/:id', clienteCtrl.obtenerClientePorId);

// Actualizar un cliente por ID
router.put('/clientes/:id', clienteCtrl.actualizarCliente);

// Eliminar un cliente por ID
router.delete('/clientes/:id', clienteCtrl.eliminarCliente);

module.exports = router;
