const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: {
    type: String, // Texto que representa el nombre del producto
    required: true, // Campo obligatorio
    trim: true, // Elimina espacios al inicio y final
  },
  descripcion: {
    type: String, // Texto con la descripción del producto
    required: true, // Campo obligatorio
    trim: true,
  },
  precio: {
    type: Number, // Número decimal para el precio
    required: true, // Campo obligatorio
    min: 0, // El precio no puede ser negativo
  },
  categoria: {
    type: String, // Texto que representa la categoría
    required: true, // Campo obligatorio
    trim: true,
  },
  imagen_url: {
    type: String, // URL en formato de texto para la imagen del producto
    required: true, // Campo obligatorio
    validate: {
      validator: function (v) {
        return /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(v); // Validar formato de URL
      },
      message: "Debe ser una URL válida de imagen",
    },
  },
  inventario: {
    type: Number, // Numero entero para el stock disponible
    required: true, // Campo obligatorio
    min: 0, // No puede ser negativo
  },
});

module.exports = mongoose.model('Producto', productoSchema);