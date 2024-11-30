const Factura = require('../models/factura.model');

// Definir el controlador para las facturas
const facturaCtrl = {};
/*
// Crear una nueva factura
facturaCtrl.crearFactura = async (req, res) => {
  const { id_cliente, total, metodo_pago } = req.body;

  // Crear una nueva instancia de Factura
  const nuevaFactura = new Factura({
    id_cliente,
    total,
    metodo_pago,
  });

  // Guardar la nueva factura
  await nuevaFactura.save((err, facturaGuardada) => {
    if (err) {
      return res.status(500).json({ message: 'Error al crear la factura', error: err });
    }
    res.status(201).json({ message: 'Factura creada exitosamente', factura: facturaGuardada });
  });
};
*/
facturaCtrl.crearFactura = async (req, res) => {
  const { id_cliente, total, metodo_pago } = req.body;

  if (!id_cliente || !total || !metodo_pago) {
    return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' }); 
  }

  const nuevaFactura = new Factura({
    id_cliente,
    total,
    metodo_pago,
  });

  try {
    await nuevaFactura.save();
    res.status(201).json({ mensaje: 'Factura creada exitosamente', factura: nuevaFactura });
  } catch (error) {
    // Manejo de errores (por ejemplo, si el correo ya existe)
    res.status(500).json({ mensaje: 'Error al crear la factura', error: error.message });
  }
}

// Obtener todas las facturas
facturaCtrl.obtenerFacturas = async (req, res) => {
  /*Factura.find((err, facturas) => {
    if (err) {
      return res.status(500).json({ message: 'Error al obtener las facturas', error: err });
    }
    res.status(200).json(facturas);
  });
  */
  try {
    const facturas = await Factura.find();
    res.status(200).json(facturas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener las facturas', error: error.message });
  }
};

// Obtener una factura por ID
facturaCtrl.obtenerFacturaPorId = (req, res) => {
  const { id } = req.params;

  Factura.findById(id, (err, factura) => {
    if (err) {
      return res.status(500).json({ message: 'Error al obtener la factura', error: err });
    }
    if (!factura) {
      return res.status(404).json({ message: 'Factura no encontrada' });
    }
    res.status(200).json(factura);
  });
};

// Actualizar una factura por ID
facturaCtrl.actualizarFactura = (req, res) => {
  const { id } = req.params;
  const { id_cliente, total, metodo_pago } = req.body;

  Factura.findByIdAndUpdate(id, { id_cliente, total, metodo_pago }, { new: true, runValidators: true }, (err, facturaActualizada) => {
    if (err) {
      return res.status(500).json({ message: 'Error al actualizar la factura', error: err });
    }
    if (!facturaActualizada) {
      return res.status(404).json({ message: 'Factura no encontrada' });
    }
    res.status(200).json({ message: 'Factura actualizada exitosamente', factura: facturaActualizada });
  });
};

// Eliminar una factura por ID
facturaCtrl.eliminarFactura = (req, res) => {
  const { id } = req.params;

  Factura.findByIdAndDelete(id, (err, facturaEliminada) => {
    if (err) {
      return res.status(500).json({ message: 'Error al eliminar la factura', error: err });
    }
    if (!facturaEliminada) {
      return res.status(404).json({ message: 'Factura no encontrada' });
    }
    res.status(200).json({ message: 'Factura eliminada exitosamente' });
  });
};

// Exportar el controlador
module.exports = facturaCtrl;
