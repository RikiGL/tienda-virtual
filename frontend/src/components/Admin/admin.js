import React, { useState, useEffect } from "react";
import logo from "../imagenes/asdlogo.png";
import "./admin.css";
import { useNavigate } from "react-router-dom";
import { isAdmin } from "../auth";

function AdminProductos() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [vista, setVista] = useState("crear");
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    categoria: "",
    inventario: "",
    imagen: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login"); // Redirige al login si no está autenticado
    }
  }, [navigate]);
  
  useEffect(() => {
    if (!isAdmin()) {
      navigate("/login");
    }
  }, [navigate]);
  

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        // Realizamos la solicitud GET para obtener los productos
        const response = await fetch('http://localhost:4000/api/productos'); // Cambia la URL según sea necesario
        const data = await response.json();

        // Actualizamos el estado con los productos obtenidos
        setProductos(data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    obtenerProductos();
  }, []); // El array vacío asegura que se ejecute solo una vez al montar el componente

  
  const handleCerrarSesion = () => {
    localStorage.clear(); // Elimina toda la información almacenada
    navigate("/login");   // Redirige al login
  };
  


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto({ ...nuevoProducto, [name]: value });
  };
  const crearProducto = async () => {
    if (!nuevoProducto.nombre || !nuevoProducto.precio || !nuevoProducto.categoria || !nuevoProducto.inventario) {
      alert("Por favor completa los campos obligatorios.");
      return;
    }
    const productoConId = {
      ...nuevoProducto,
      precio: parseFloat(nuevoProducto.precio),
      inventario: parseInt(nuevoProducto.inventario, 10) || 0,
    };

    setProductos([...productos, productoConId]);
    try {
      const response = await fetch ("http://localhost:4000/api/productos/", {
        method:"POST",
        headers:{
          "Content-Type": "application/json"
        },
        body:JSON.stringify({
          nombre: productoConId.nombre,
          descripcion: productoConId.descripcion,
          precio: productoConId.precio,
          categoria: productoConId.categoria,
          inventario: productoConId.inventario,
          imagen_url: productoConId.imagen
        })

      }) 
      console.log("Json enviado al back:",productoConId)
      const data = await response.json();
      if(response.status === 201){
        alert("Producto Creado");
        console.log("respuesta del back", data);
        setNuevoProducto({ nombre: "", descripcion: "", precio: "", categoria: "", inventario: "", imagen: "" });  
      }
    } catch (error) {
      console.error("Error en la solicitud: ", error)
    }
  };




  const filtrarProductos = () => {
    return productos.filter((producto) =>
      producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );
  };

  const actualizarInventario = async (id, accion) => {
    const productoActualizado = productos.find((producto) => producto._id === id);
    if (!productoActualizado) {
      alert("Producto no encontrado");
      return;
    }
  
    // Calcular el nuevo inventario
    const nuevoInventario =
      accion === "incrementar"
        ? productoActualizado.inventario + 1
        : Math.max(productoActualizado.inventario - 1, 0);
  
    console.log("ID enviado al servidor:", id);
    console.log("Cuerpo enviado al servidor:", JSON.stringify({ inventario: nuevoInventario }));
  
    // Enviar el cambio al backend
    try {
      const response = await fetch(`http://localhost:4000/api/productos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inventario: nuevoInventario }),
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Error al actualizar el inventario:", errorMessage);
        alert(`Error del servidor: ${errorMessage}`);
        return;
      }

      // Reflejar el cambio en el frontend
      setProductos((prevProductos) =>
        prevProductos.map((producto) =>
          producto._id === id
            ? { ...producto, inventario: nuevoInventario }
            : producto
        )
      );
  
      console.log("Inventario actualizado en el servidor correctamente.");
    } catch (error) {
      console.error("Error en la solicitud al servidor:", error);
      alert("Error al comunicarse con el servidor.");
    }
  };
  
  const eliminarProducto = (id) => {
    setProductos((prevProductos) => prevProductos.filter((producto) => producto.id !== id));
  };

  const renderVista = () => {
    switch (vista) {
      case "crear":
        return (
          <div className="admin-form-section">
            <h2>Crear Producto</h2>
            <div className="admin-form-control">
              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={nuevoProducto.nombre}
                onChange={handleInputChange}
                placeholder="Ingrese el nombre del producto"
              />
            </div>
            <div className="admin-form-control">
              <label htmlFor="descripcion">Descripción:</label>
              <textarea
                id="descripcion"
                name="descripcion"
                rows="3"
                value={nuevoProducto.descripcion}
                onChange={handleInputChange}
                placeholder="Ingrese una descripción"
              ></textarea>
            </div>
            <div className="admin-form-control">
              <label htmlFor="precio">Precio:</label>
              <input
                type="number"
                id="precio"
                name="precio"
                value={nuevoProducto.precio}
                onChange={handleInputChange}
                placeholder="Ingrese el precio"
              />
            </div>
            <div className="admin-form-control">
              <label htmlFor="categoria">Categoría:</label>
              <select
                id="categoria"
                name="categoria"
                value={nuevoProducto.categoria}
                onChange={handleInputChange}
              >
                <option value="">Seleccione una categoría</option>
                <option value="Verduras-Legumbres">Verduras-Legumbres</option>
                <option value="Bebidas">Bebidas</option>
                <option value="Lacteos">Lacteos</option>
                <option value="Frutas">Frutas</option>
                <option value="Enlatados-Panificados">Enlatados-Panificados</option>
                <option value="Canes-Embutidos">Carnes-Embutidos</option>
                <option value="Abastos">Abastos</option>
              </select>
            </div>
            <div className="admin-form-control">
              <label htmlFor="imagen">Imagen (opcional):</label>
              <input type="text" id="imagen" name = "imagen" value={nuevoProducto.imagen} onChange={handleInputChange} placeholder="Ingrese la url de la imagen" />

            </div>
            <div className="admin-form-control">
              <label htmlFor="inventario">Inventario:</label>
              <input
                type="number"
                id="inventario"
                name="inventario"
                value={nuevoProducto.inventario}
                onChange={handleInputChange}
                placeholder="Ingrese la cantidad inicial"
              />
            </div>
            <button className="admin-btn" onClick={crearProducto}>Crear Producto</button>
          </div>
        );

        case "modificar":
          return (
            <div className="admin-form-section">
              <h2>Modificar Inventario</h2>
              <div className="admin-search-bar">
                <input
                  type="text"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  placeholder="Buscar producto por nombre"
                />
              </div>
              <div className="admin-product-list">
                <table>
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Inventario</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                  {filtrarProductos().map((producto) => (
                    <tr key={producto.id}>
                      <td>{producto.nombre}</td>
                      <td>{producto.inventario}</td>
                      <td className="admin-actions">
                        <button className="aumentar-btn " onClick={() => actualizarInventario(producto._id, "incrementar")}>
                          Aumentar
                        </button>
                        <button className="disminuir-btn"onClick={() => actualizarInventario(producto._id, "decrementar")}>
                          Disminuir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>

                </table>
              </div>
            </div>
          );
        

          case "eliminar":
            return (
              <div className="admin-form-section">
                <h2>Eliminar Producto</h2>
                <div className="admin-search-bar">
                  <input
                    type="text"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    placeholder="Buscar producto por nombre"
                  />
                </div>
                <div className="admin-product-list">
                  <table>
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtrarProductos().map((producto) => (
                        <tr key={producto.id}>
                          <td>{producto.nombre}</td>
                          <td className="admin-actions">
                            <button
                              className="eliminar-btn"
                              onClick={() => eliminarProducto(producto.id)}
                            >
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          
      default:
        return null;
    }
  };

  return (
    <div>
    <header className="admin-header">
        <div className="admin-logo">
          <img src={logo} alt="Tu Despensa Logo" className="principal-logo-img" />
          <div className="principal-name">TU DESPENSA </div>
        </div>

        
          <button
            className="principal-admin-button"
            onClick={() => navigate("/login")}
          >
            Cerrar Sesión
          </button>
        

   
      </header>

      <div className="admin-container">
        <h1>Administración de Productos</h1>

        <div className="admin-buttons">
          <button className="admin-btn" onClick={() => setVista("crear")}>Crear Producto</button>
          <button className="admin-btn" onClick={() => setVista("modificar")}>Modificar Inventario</button>
          <button className="admin-btn" onClick={() => setVista("eliminar")}>Eliminar Producto</button>
        </div>

        {renderVista()}
      </div>

      <footer className="admin-footer">
        <p>© 2024 TuDespensa. Todos los derechos reservados.</p>
        <p>Contacto: info@tudespensa.com</p>
      </footer>
    </div>
  );
}

export default AdminProductos;
