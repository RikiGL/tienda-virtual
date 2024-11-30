const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

//Se definen los tipos de datos que se van a usar en la colección de mongo
//Se quiere que tenga estas validaciones para poder escribir en la base de datos

const facturaSchema = new mongoose.Schema({
  _id: {
    type: Number,
  },
  id_cliente: {
    type: Number, // Identificador del cliente asociado a la factura
    required: true,
  },
  fecha_emision: {
    type: Date, // Fecha y hora de emisión de la factura
    //required: true, // Campo obligatorio
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


//El identificador será solo numérico y se asignará automaticamente incrementando.
facturaSchema.plugin(AutoIncrement, { id: 'factura_seq', inc_field: '_id' });

//El esquema se exporta como modelo para que sea usado por el controlador
//Se define un nombre de modelo y un esquema
module.exports = mongoose.model('Factura', facturaSchema);
