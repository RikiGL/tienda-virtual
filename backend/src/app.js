//Llama a los modulos que instalamos mediante npm
const express = require('express');
const cors = require('cors');
const app = express(); //En app se almacena las funcionalidad de express

//Configuración
//Se usará el puerto que se asigne con por el S.O. con process.env.PORT
//de lo contrario, usará el puerto 4000
app.set('port', process.env.PORT || 4000);

//Se exporta el app para que sea utilizado en otras partes del proyecto
module.exports = app;