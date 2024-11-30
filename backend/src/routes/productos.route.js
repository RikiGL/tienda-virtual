const express = require('express');
const router = express.Router();

// Importar el controlador de productos
const productoCtrl = require('../controller/productos.controller');

// Ruta para crear un nuevo producto
router.post('/', productoCtrl.crearProducto);

// Ruta para obtener todos los productos
router.get('/', productoCtrl.obtenerProductos);

// Ruta para obtener un producto por ID
router.get('/:id', productoCtrl.obtenerProductoPorId);

// Ruta para actualizar un producto
router.put('/:id', productoCtrl.actualizarProducto);

// Ruta para eliminar un producto
router.delete('/:id', productoCtrl.eliminarProducto);

module.exports = router;
