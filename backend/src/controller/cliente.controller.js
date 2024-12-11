const Cliente = require("../models/cliente.model");
const bcrypt = require("bcryptjs");

const clienteCtrl = {};

// Crear un nuevo cliente
clienteCtrl.crearCliente = async (req, res) => {
  const { nombre, apellido, email, contrasenia, rol, domicilio, carrito } =
    req.body;

  if (!nombre || !apellido || !email || !contrasenia || !rol || !domicilio) {
    return res
      .status(400)
      .json({ mensaje: "Todos los campos son obligatorios" });
  }

  try {
    // Verificar si el correo ya existe
    const clienteExistente = await Cliente.findOne({ email });
    if (clienteExistente) {
      return res
        .status(400)
        .json({ mensaje: "El correo ya está registrado" });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(contrasenia, 10);

    // Crear el nuevo cliente
    const nuevoCliente = new Cliente({
      nombre,
      apellido,
      email,
      contrasenia: hashedPassword, // Guardar la contraseña encriptada
      rol,
      domicilio: {
        ciudad: domicilio.ciudad || "Ciudad",
        direccion: domicilio.direccion || "Dirección",
        referencia: domicilio.referencia || "Referencia",
      },
      carrito,
    });

    // Guardar el cliente en la base de datos
    const clienteGuardado = await nuevoCliente.save();
    res.status(201).json({
      mensaje: "Cliente creado exitosamente",
      cliente: clienteGuardado,
    });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al crear el cliente", error: error.message });
  }
};

// Inicio de sesión del cliente
clienteCtrl.loginCliente = async (req, res) => {
  const { email, contrasenia } = req.body;

  if (!email || !contrasenia) {
    return res.status(400).json({
      mensaje: "Correo y contraseña son obligatorios",
    });
  }

  try {
    // Buscar cliente por correo
    const cliente = await Cliente.findOne({ email });

    if (!cliente) {
      return res.status(404).json({
        mensaje: "El correo no está registrado",
      });
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(contrasenia, cliente.contrasenia);
    if (!isMatch) {
      return res.status(401).json({
        mensaje: "Contraseña incorrecta",
      });
    }

    // Aquí puedes generar un token JWT si es necesario
    res.status(200).json({
      mensaje: "Inicio de sesión exitoso",
      cliente,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error en el servidor",
      error: error.message,
    });
  }
};

// Obtener todos los clientes
clienteCtrl.obtenerClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener los clientes",
      error: error.message,
    });
  }
};

// Obtener un cliente por ID
clienteCtrl.obtenerClientePorId = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) {
      return res.status(404).json({
        mensaje: "Cliente no encontrado",
      });
    }
    res.status(200).json(cliente);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener el cliente",
      error: error.message,
    });
  }
};

// Actualizar un cliente por ID
clienteCtrl.actualizarCliente = async (req, res) => {
  const { nombre, apellido, email, contrasenia, rol, domicilio, carrito } =
    req.body;

  if (
    !nombre &&
    !apellido &&
    !email &&
    !contrasenia &&
    !rol &&
    !domicilio &&
    !carrito
  ) {
    return res
      .status(400)
      .json({
        mensaje: "Se debe enviar al menos un campo para actualizar",
      });
  }

  try {
    const clienteActual = await Cliente.findById(req.params.id);
    if (!clienteActual) {
      return res.status(404).json({
        mensaje: "Cliente no encontrado",
      });
    }

    const actualizacion = {};
    if (nombre) actualizacion.nombre = nombre;
    if (apellido) actualizacion.apellido = apellido;
    if (email) actualizacion.email = email;
    if (contrasenia) {
      // Encriptar nueva contraseña
      actualizacion.contrasenia = await bcrypt.hash(contrasenia, 10);
    }
    if (rol) actualizacion.rol = rol;
    if (carrito) actualizacion.carrito = carrito;

    if (domicilio) {
      actualizacion.domicilio = {
        ciudad: domicilio.ciudad || clienteActual.domicilio.ciudad,
        direccion: domicilio.direccion || clienteActual.domicilio.direccion,
        referencia: domicilio.referencia || clienteActual.domicilio.referencia,
      };
    }

    const clienteActualizado = await Cliente.findByIdAndUpdate(
      req.params.id,
      actualizacion,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      mensaje: "Cliente actualizado exitosamente",
      cliente: clienteActualizado,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar el cliente",
      error: error.message,
    });
  }
};

// Eliminar un cliente por ID
clienteCtrl.eliminarCliente = async (req, res) => {
  try {
    const clienteEliminado = await Cliente.findByIdAndDelete(req.params.id);

    if (!clienteEliminado) {
      return res.status(404).json({
        mensaje: "Cliente no encontrado",
      });
    }

    res.status(200).json({
      mensaje: "Cliente eliminado exitosamente",
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar el cliente",
      error: error.message,
    });
  }
};

// Exportar el controlador
module.exports = clienteCtrl;
