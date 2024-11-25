const { Schema, model } = require("mongoose");

//Se definen los tipos de datos que se van a usar en la colección de mongo
//Se quiere que tenga estas validaciones para poder escribir en la base de datos
const usuarioSchema = new Schema(
  {
    nombre: String,
    apellido: String,
    edad: Number,
    telefono: String,
    correo: String,
  },
  {
    timestamps: true,
  }
);

//El esquema se exporta como modelo para que sea usado por el controlador
//Se define un nombre de modelo y un esquema
module.exports = model("Usuario", usuarioSchema);
