const usuarioCtrl = {};

const usuarioModel = require("../models/usuario.model");

//Funciones que no requieren parámetro

usuarioCtrl.getUsuario = async (req, res) => {
  const usuarios = await usuarioModel.find();
  res.json(usuarios);
};

usuarioCtrl.createUsuario = async (req, res) => {
  const { nombre, apellido, edad, telefono, correo } = req.body;
  const newUsuario = new usuarioModel({
    nombre: nombre,
    apellido: apellido,
    edad: edad,
    telefono: telefono,
    correo: correo,
  });
  await newUsuario.save();
  res.json({ message: "El usuario ha sido guardado." });
};

//Funciones que requieren el parámetro ID

usuarioCtrl.getUsuarioID = async (req, res) => {
  const usuario = await usuarioModel.findById(req.params.id);
  res.json(usuario);
};

usuarioCtrl.deleteUsuario = async (req, res) => {
  await usuarioModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Usuario eliminado" });
};

usuarioCtrl.updateUsuario = async (req, res) => {
  const { nombre, apellido, edad, telefono, correo } = req.body;
  await usuarioModel.findByIdAndUpdate(req.params.id, {
    nombre,
    apellido,
    edad,
    telefono,
    correo,
  });
  res.json({
    message: "El usuario ha sido actualizado.",
  });
};

module.exports = usuarioCtrl;