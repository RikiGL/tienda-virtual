const mongoose = require("mongoose");

const AutoIncrement = require("mongoose-sequence")(mongoose);

//Se definen los tipos de datos que se van a usar en la colección de mongo
//Se quiere que tenga estas validaciones para poder escribir en la base de datos

const clienteSchema = new mongoose.Schema({
  _id: {
    type: Number,
  },
  nombre: {
    type: String, // Nombre del cliente
    required: true, // Campo obligatorio
    trim: true,
  },
  apellido: {
    type: String, // Apellido del cliente
    required: true, // Campo obligatorio
    trim: true,
  },
  email: {
    type: String, // Correo electrónico del cliente
    required: true, // Campo obligatorio
    unique: true, // Asegura que no se repitan correos
    trim: true,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Validar formato de correo
      },
      message: "Debe ser un correo electrónico válido",
    },
  },
  contrasenia: {
    type: String, // Contrasenia cifrada del cliente
    required: true, // Campo obligatorio
  },
  rol: {
    type: String, // Rol del usuario (ej: cliente, administrador)
    required: true, // Campo obligatorio
    enum: ["cliente", "admin"], // Valores permitidos
  },
  domicilio: {
    ciudad: {
      type: String, // Ciudad del cliente
      required: true, // Campo obligatorio
      trim: true,
    },
    direccion: {
      type: String, // Dirección del cliente
      required: true, // Campo obligatorio
      trim: true,
    },
    referencia: {
      type: String, // Referencia adicional para la dirección
      trim: true, // Campo opcional
    },
  },
  carrito: [
    {
      id_producto: {
        type: Number, // Identificador del producto
        required: true,
      },
      cantidad: {
        type: Number, // Cantidad del producto
        required: true,
        min: 1, // No puede ser menor que 1
      },
      subtotal: {
        type: Number, // Subtotal del producto
        required: true,
        min: 0, // No puede ser negativo
      },
    },
  ],
});

//El identificador será solo numérico y se asignará automaticamente incrementando.
clienteSchema.plugin(AutoIncrement, { id: "cliente_seq", inc_field: "_id" });

//El esquema se exporta como modelo para que sea usado por el controlador
//Se define un nombre de modelo y un esquema
module.exports = mongoose.model("Cliente", clienteSchema);
