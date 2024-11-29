const mongoose = require('mongoose');

const facturaSchema = new mongoose.Schema({
  id_cliente: {
    type: Number, // Identificador del cliente asociado a la factura
    required: true,
  },
  fecha_emision: {
    type: Date, // Fecha y hora de emisión de la factura
    required: true, // Campo obligatorio
    default: Date.now, // Valor por defecto: fecha/hora actual
  },
  total: {
    type: Number, // Total de la factura
    required: true, // Campo obligatorio
    min: 0, // No puede ser negativo
  },
  metodo_pago: {
    type: String, // Método de pago utilizado
    required: true, // Campo obligatorio
    enum: ['paypal'], // Solo acepta estos valores
  },

});

module.exports = mongoose.model('Factura', facturaSchema);
