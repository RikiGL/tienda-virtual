const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

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
    enum: ["paypal"], // Solo acepta estos valores
  },
  cedula:{
    type: String,
    required: true,
    //match: /^\d{10}$/, // Validación para una cédula ecuatoriana de 10 dígitos
  },
  celular:{
    type: String,
    required: true,
    //match: /^\d{10}$/, // Validación para una cédula ecuatoriana de 10 dígitos
  },

  productos: [
    {
      categoria: {
        type: String, // Categoría del producto
        required: true, // Asegura que se ingrese la categoría
      },
      descripcion: {
        type: String, // Descripción del producto
        required: true, // Asegura que se ingrese una descripción
      },
      imagen_url: {
        type: String, // URL de la imagen del producto
        required: true, // Asegura que se ingrese una URL de imagen
      },
      inventario: {
        type: Number, // Cantidad de productos en inventario
        required: true, // Asegura que se ingrese el inventario
        min: 0, // No puede ser negativo
      },
      nombre: {
        type: String, // Nombre del producto
        required: true, // Asegura que se ingrese el nombre del producto
      },
      precio: {
        type: Number, // Precio del producto
        required: true, // Asegura que se ingrese el precio
        min: 0, // No puede ser negativo
      },
      quantity: {
        type: Number, // Cantidad comprada del producto
        required: true, // Asegura que se ingrese la cantidad
        min: 1, // No puede ser menor a 1
      },
      __v: {
        type: Number, // Versión del documento
        default: 0, // Valor por defecto
      },
      _id: {
        type: Number, // ID único del producto (en caso de que quieras tener control sobre este campo)
        required: true, // Asegura que se ingrese un ID
      },
    },
  ]
  
});

//El identificador será solo numérico y se asignará automaticamente incrementando.
facturaSchema.plugin(AutoIncrement, { id: "factura_seq", inc_field: "_id" });

//El esquema se exporta como modelo para que sea usado por el controlador
//Se define un nombre de modelo y un esquema
module.exports = mongoose.model("Factura", facturaSchema);
