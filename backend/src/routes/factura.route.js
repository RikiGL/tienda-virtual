const express = require('express');
const facturaCtrl = require('../controllers/factura.controller'); // Importamos el controlador de facturas
const router = express.Router();

// Ruta para crear una nueva factura (POST)
router.post('/facturas', facturaCtrl.crearFactura);

// Ruta para obtener todas las facturas (GET)
router.get('/facturas', facturaCtrl.obtenerFacturas);

// Ruta para obtener una factura por ID (GET)
router.get('/facturas/:id', facturaCtrl.obtenerFacturaPorId);

// Ruta para actualizar una factura por ID (PUT)
router.put('/facturas/:id', facturaCtrl.actualizarFactura);

// Ruta para eliminar una factura por ID (DELETE)
router.delete('/facturas/:id', facturaCtrl.eliminarFactura);

module.exports = router;
