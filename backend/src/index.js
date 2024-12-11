require("dotenv").config();

//Llama al modulo que se exportó
const app = require("./app");
require("./database");

//Ejecución del servidor
async function main() {
  //Inicia un listener en el puerto asignado en la configuración
  app.listen(app.get("port"));
  //Imprime el puerto que se está usando para que el desarrollador compruebe
  console.log("El servidor se está ejecutando en el puerto: ", app.get("port"));
}

//Se ejecuta la función principal
main();
