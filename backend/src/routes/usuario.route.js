const { Router } = require("express");
const router = Router();

//Estructura que se va a utilizar en las peticiones
//Si no se manda parametros, solo se hará consulta de todos o se creará un nuevo usuario
router.route("/").get().post();

//Si tengo la ID, será para poder seleccionar, eliminar o modificar
router.route("/:id").get().delete().put();

module.exports = router;
