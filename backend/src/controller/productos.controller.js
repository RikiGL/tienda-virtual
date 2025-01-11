const Producto = require("../models/productos.model");

// Crear un nuevo producto
const productoCtrl = {};

// Crear un nuevo producto
productoCtrl.crearProducto = async (req, res) => {
  const { nombre, descripcion, precio, categoria, imagen_url, inventario } =
    req.body;

  const nuevoProducto = new Producto({
    nombre,
    descripcion,
    precio,
    categoria,
    imagen_url,
    inventario,
  });

  // Guardar el nuevo producto
  await nuevoProducto
    .save()
    .then(() => {
      res
        .status(201)
        .json({
          message: "Producto creado exitosamente",
          producto: nuevoProducto,
        });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Error al crear el producto", error: err });
    });
};

// Obtener todos los productos
productoCtrl.obtenerProductos = async (req, res) => {
  Producto.find()
    .then((productos) => {
      res.status(200).json(productos);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Error al obtener productos", error: err });
    });
};

// Obtener un producto por ID
productoCtrl.obtenerProductoPorId = async (req, res) => {
  const { id } = req.params;

  Producto.findById(id)
    .then((producto) => {
      if (!producto) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }
      res.status(200).json(producto);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Error al obtener el producto", error: err });
    });
};

// Actualizar un producto por ID
productoCtrl.actualizarProducto = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, categoria, imagen_url, inventario } =
    req.body;

  Producto.findByIdAndUpdate(
    id,
    {
      nombre,
      descripcion,
      precio,
      categoria,
      imagen_url,
      inventario,
    },
    { new: true, runValidators: true }
  )
    .then((productoActualizado) => {
      if (!productoActualizado) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }
      res
        .status(200)
        .json({
          message: "Producto actualizado exitosamente",
          producto: productoActualizado,
        });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Error al actualizar el producto", error: err });
    });
};

// Eliminar un productos por ID
productoCtrl.eliminarProductos = async (req, res) => {
  const { productIdsWithQuantities } = req.body;

  if (!productIdsWithQuantities || !Array.isArray(productIdsWithQuantities)) {
    return res.status(400).json({ error: "Lista de productos con cantidades no válida." });
  }

  try {
    // Lógica para actualizar el inventario de los productos según la cantidad comprada
    const updatePromises = productIdsWithQuantities.map(({ productId, quantity }) => {
      return Producto.findByIdAndUpdate(
        productId,
        { $inc: { inventario: -quantity } }, // Reducir el inventario por la cantidad comprada
        { new: true }
      );
    });

    // Esperar a que se actualicen todos los productos
    await Promise.all(updatePromises);

    res.status(200).json({ message: "Inventario actualizado correctamente." });
  } catch (error) {
    console.error("Error al actualizar el inventario:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};


module.exports = productoCtrl;
