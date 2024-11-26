const { Router } = require("express");
const router = Router();

//Agrego las funciones hechas por el controlador
const {
  getUsuario,
  createUsuario,
  getUsuarioID,
  deleteUsuario,
  updateUsuario,
} = require("../controller/usuario.controller");

//Estructura que se va a utilizar en las peticiones
//Si no se manda parametros, solo se hará consulta de todos o se creará un nuevo usuario
router.route("/").get(getUsuario).post(createUsuario);

//Si tengo la ID, será para poder seleccionar, eliminar o modificar
router.route("/:id").get(getUsuarioID).delete(deleteUsuario).put(updateUsuario);

module.exports = router;
