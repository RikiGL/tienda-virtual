const express = require('express');
const router = express.Router();

// Importar el controlador de productos
const productoCtrl = require('../controllers/productos.controller');

// Ruta para crear un nuevo producto
router.post('/productos', productoCtrl.crearProducto);

// Ruta para obtener todos los productos
router.get('/productos', productoCtrl.obtenerProductos);

// Ruta para obtener un producto por ID
router.get('/productos/:id', productoCtrl.obtenerProductoPorId);

// Ruta para actualizar un producto
router.put('/productos/:id', productoCtrl.actualizarProducto);

// Ruta para eliminar un producto
router.delete('/productos/:id', productoCtrl.eliminarProducto);

module.exports = router;
