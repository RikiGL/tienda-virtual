const express = require('express');
const facturaCtrl = require('../controller/factura.controller'); // Importamos el controlador de facturas
const router = express.Router();

// Ruta para crear una nueva factura (POST)
router.post('/', facturaCtrl.crearFactura);

// Ruta para obtener todas las facturas (GET)
router.get('/', facturaCtrl.obtenerFacturas);

// Ruta para obtener una factura por ID (GET)
router.get('/:id', facturaCtrl.obtenerFacturaPorId);

// Ruta para actualizar una factura por ID (PUT)
router.put('/:id', facturaCtrl.actualizarFactura);

// Ruta para eliminar una factura por ID (DELETE)
router.delete('/:id', facturaCtrl.eliminarFactura);

module.exports = router;
