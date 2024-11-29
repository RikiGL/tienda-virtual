const Cliente = require('../models/cliente.model');

const clienteCtrl = {};

// Crear un nuevo cliente
clienteCtrl.crearCliente = async (req, res) => {
  // Desestructuración de los datos recibidos en el cuerpo de la solicitud
  const { nombre, apellido, email, contrasenia, rol, domicilio, carrito } = req.body;

  // Validación de campos obligatorios
  if (!nombre || !apellido || !email || !contrasenia || !rol || !domicilio || !carrito) {
    return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
  }

  // Crear el nuevo cliente
  const nuevoCliente = new Cliente({
    nombre,
    apellido,
    email,
    contrasenia,
    rol,
    domicilio: {
      ciudad: domicilio.ciudad,
      direccion: domicilio.direccion,
      referencia: domicilio.referencia || null, // Si referencia es opcional
    },
    carrito,
  });

  try {
    // Guardar el nuevo cliente en la base de datos
    await nuevoCliente.save();
    res.status(201).json({ mensaje: 'Cliente creado exitosamente', cliente: nuevoCliente });
  } catch (error) {
    // Manejo de errores (por ejemplo, si el correo ya existe)
    res.status(500).json({ mensaje: 'Error al crear el cliente', error: error.message });
  }
};

// Obtener todos los clientes
clienteCtrl.obtenerClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los clientes', error: error.message });
  }
};

// Obtener un cliente por ID
clienteCtrl.obtenerClientePorId = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }
    res.status(200).json(cliente);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el cliente', error: error.message });
  }
};

// Actualizar un cliente por ID
clienteCtrl.actualizarCliente = async (req, res) => {
  const { nombre, apellido, email, contrasenia, rol, domicilio, carrito } = req.body;

  // Validar que al menos uno de los campos sea enviado
  if (!nombre && !apellido && !email && !contrasenia && !rol && !domicilio && !carrito) {
    return res.status(400).json({ mensaje: 'Se debe enviar al menos un campo para actualizar' });
  }

  try {
    const clienteActualizado = await Cliente.findByIdAndUpdate(
      req.params.id,
      {
        nombre,
        apellido,
        email,
        contrasenia,
        rol,
        domicilio: {
          ciudad: domicilio ? domicilio.ciudad : undefined,
          direccion: domicilio ? domicilio.direccion : undefined,
          referencia: domicilio ? domicilio.referencia : undefined,
        },
        carrito: carrito || undefined,
      },
      { new: true, runValidators: true }
    );

    if (!clienteActualizado) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }

    res.status(200).json({ mensaje: 'Cliente actualizado exitosamente', cliente: clienteActualizado });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el cliente', error: error.message });
  }
};

// Eliminar un cliente por ID
clienteCtrl.eliminarCliente = async (req, res) => {
  try {
    const clienteEliminado = await Cliente.findByIdAndDelete(req.params.id);

    if (!clienteEliminado) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }

    res.status(200).json({ mensaje: 'Cliente eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el cliente', error: error.message });
  }
};

module.exports = clienteCtrl;