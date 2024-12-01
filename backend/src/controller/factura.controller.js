const Factura = require("../models/factura.model");

// Definir el controlador para las facturas
const facturaCtrl = {};

//Nueva factura
facturaCtrl.crearFactura = async (req, res) => {
  const { id_cliente, total, metodo_pago } = req.body;

  if (!id_cliente || !total || !metodo_pago) {
    return res
      .status(400)
      .json({ mensaje: "Todos los campos son obligatorios" });
  }

  const nuevaFactura = new Factura({
    id_cliente,
    total,
    metodo_pago,
  });

  try {
    await nuevaFactura.save();
    res
      .status(201)
      .json({ mensaje: "Factura creada exitosamente", factura: nuevaFactura });
  } catch (error) {
    // Manejo de errores (por ejemplo, si el correo ya existe)
    res
      .status(500)
      .json({ mensaje: "Error al crear la factura", error: error.message });
  }
};

// Obtener todas las facturas
facturaCtrl.obtenerFacturas = async (req, res) => {
  try {
    const facturas = await Factura.find();
    res.status(200).json(facturas);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al obtener las facturas", error: error.message });
  }
};

// Obtener una factura por ID
facturaCtrl.obtenerFacturaPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const facturas = await Factura.findById(id);
    res.status(200).json(facturas);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al obtener las facturas", error: error.message });
  }
};

// Actualizar una factura por ID
facturaCtrl.actualizarFactura = async (req, res) => {
  const { id } = req.params;
  const { id_cliente, total, metodo_pago } = req.body;

  if (!id_cliente && !total && !metodo_pago) {
    return res
      .status(400)
      .json({ mensaje: "Se debe enviar al menos un campo para actualizar" });
  }

  try {
    const facturaActual = await Factura.findById(req.params.id);
    if (!facturaActual) {
      return es.status(404).json({ mensaje: "Factura no encontrada" });
    }

    const actualizacion = {};
    if (id_cliente) actualizacion.id_cliente = id_cliente;
    if (total) actualizacion.total = total;
    if (metodo_pago) actualizacion.metodo_pago = metodo_pago;

    const facturaActualizada = await Factura.findByIdAndUpdate(
      req.params.id,
      actualizacion,
      { new: true, runValidators: true }
    );

    res
      .status(200)
      .json({
        mensaje: "Factura actualizada exitosamente",
        factura: facturaActualizada,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        mensaje: "Error al actualizar la factura",
        error: error.message,
      });
  }
};

// Eliminar una factura por ID
facturaCtrl.eliminarFactura = async (req, res) => {
  try {
    const facturaEliminada = await Factura.findByIdAndDelete(req.params.id);

    if (!facturaEliminada) {
      return res.status(404).json({ mensaje: "Factura no encontrada" });
    }

    res.status(200).json({ mensaje: "Factura eliminada exitosamente" });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al eliminar la factura", error: error.message });
  }
};

// Exportar el controlador
module.exports = facturaCtrl;
