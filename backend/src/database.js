const mongoose = require('mongoose');

//Cadena de conexión
//Usa la variable de entorno de MONGODB_URI
//Si no la cuentra, usa una base llamada 'dbtest'
const URI = process.env.MONGODB_URI
						
						

mongoose.connect(URI);

const connection = mongoose.connection();

connection.once('open', ()=>{
	console.log('La base de datos ha sido conectada: ', URI);
});