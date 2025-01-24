import React, { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ProductList from "./ProductList";
import SearchBar from "./SearchBar";
import Cart from "./Cart";
import logo from "../imagenes/asdlogo.png";
import "./principal.css";
import Modal from "../Modal/modal";
import { isAdmin, isAuthenticated } from "../auth";
import { FaCheckCircle } from 'react-icons/fa';
const Principal = () => {
  const [productsState, setProducts] = useState([]);
  const [initialProducts, setInitialProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartVisible, setCartVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [usuarioNombre, setUsuarioNombre] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [showMenuHamburguesa, setShowMenuHamburguesa] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Controla el estado del tamaño de la pantalla
  const [notificationMessage, setNotificationMessage] = useState('');
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);

  const categories = [
    "Todas",
    "Verduras-Legumbres",
    "Bebidas",
    "Lacteos",
    "Frutas",
    "Enlatados-Panificados",
    "Carnes-Embutidos",
    "Abastos",
  ];

  const handleCerrarSesion = () => {
    localStorage.clear(); // Limpiar todos los datos
    setUsuarioNombre(""); // Resetear usuarioNombre
    navigate("/login"); // Redirigir al login
  };
  

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const handleRemoveAllFromCart = (product) => {
    const updatedProducts = productsState.map((p) =>
      p._id === product._id
        ? { ...p, quantity: 0, inventario: p.inventario + p.quantity }
        : p
    );
    setProducts(updatedProducts);
    saveCartToLocalStorage(updatedProducts);
  };


  const handleClearCartAfterPayment = async () => {
    try {
      const clearedProducts = productsState.map((product) => ({
        ...product,
        quantity: 0,
        inventario: product.inventario,
      }));
      setProducts(clearedProducts);
      localStorage.removeItem("cart"); // Limpia el carrito del almacenamiento local
  
      // Si tienes una API para actualizar el inventario del backend, puedes agregar esto:
      await fetch("http://localhost:4000/api/actualizarInventario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clearedProducts),
      });
    } catch (error) {
      console.error("Error al limpiar el carrito después del pago:", error);
    }
  };
  



  const saveCartToLocalStorage = (updatedProducts) => {
    const cartItems = updatedProducts
      .filter((product) => product.quantity > 0)
      .map((product) => ({
        _id: product._id,
        nombre: product.nombre,
        precio: product.precio,
        quantity: product.quantity,
      }));
    localStorage.setItem("cart", JSON.stringify(cartItems));
  };

  /*useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }
  }, [navigate]);
  */

  useEffect(() => {

    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch("http://localhost:4000/api/productos/");
        if (!response.ok) throw new Error("Error al cargar los productos");

        const data = await response.json();
        if (!Array.isArray(data)) throw new Error("Formato de datos inválido");

        setInitialProducts(data);

        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        const syncedProducts = data.map((product) => {
          const cartItem = storedCart.find((item) => item._id === product._id);
          return cartItem
            ? {
                ...product,
                quantity: cartItem.quantity,
                inventario: Math.max(0, product.inventario - cartItem.quantity),
              }
            : product;
        });

        setProducts(syncedProducts);
        setFilteredProducts(syncedProducts);
      } catch (error) {
        setError(error.message);
        console.error("Error al cargar los productos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filterProducts = () => {
      const lowerQuery = searchQuery.toLowerCase();
      const filtered = productsState.filter(
        (product) =>
          product.nombre.toLowerCase().includes(lowerQuery) &&
          (selectedCategory === "Todas" || product.categoria === selectedCategory)
      );
      setFilteredProducts(filtered);
    };

    filterProducts();
  }, [searchQuery, selectedCategory, productsState]);

  
  
  // nueva parte 

  useEffect(() => {
    const nombre = localStorage.getItem("usuarioNombre");
    if (isAuthenticated()) {
      setUsuarioNombre(nombre || ""); // Establece el nombre del usuario si está autenticado
    } else {
      setUsuarioNombre(""); // Asegúrate de limpiar el nombre del usuario si no está autenticado
    }
  }, []);
  

  ///////////////////
   
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setShowMenu(false);
  };

  const handleAddToCart = (product) => {
    if (!usuarioNombre) {
      setModalMessage("Primero inicia sesión para agregar al carrito los productos.");
      setIsModalVisible(true);
      return; // Evita que continúe si no ha iniciado sesión
    }
    if (product.inventario > 0) {
      const updatedProducts = productsState.map((p) =>
        p._id === product._id
          ? {
              ...p,
              inventario: Math.max(0, p.inventario - 1),
              quantity: (p.quantity || 0) + 1,
            }
          : p
      );
      setProducts(updatedProducts);
      saveCartToLocalStorage(updatedProducts);
      setNotificationMessage(`"${product.nombre}" agregado correctamente`);
      setIsNotificationVisible(true);

      // Hacer desaparecer el mensaje después de 3 segundos
      setTimeout(() => {
        setIsNotificationVisible(false);
      }, 3000);
    }
  };

  const handleRemoveFromCart = (product) => {
    if (product.quantity > 0) {
      const updatedProducts = productsState.map((p) =>
        p._id === product._id
          ? {
              ...p,
              inventario: p.inventario + 1,
              quantity: Math.max(0, p.quantity - 1),
            }
          : p
      );
      setProducts(updatedProducts);
      saveCartToLocalStorage(updatedProducts);
    }
  };

  const handleClearCart = () => {
    const clearedProducts = productsState.map((product) => {
      const initialProduct = initialProducts.find((p) => p._id === product._id);
      return {
        ...product,
        quantity: 0,
        inventario: initialProduct ? initialProduct.inventario : product.inventario,
      };
    });
    setProducts(clearedProducts);
    localStorage.removeItem("cart");
  };
  // Detecta el tamaño de la pantalla
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 912);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="principal-app-container">
      <header className="principal-app-header">
        <div className="principal-logo">
          <img src={logo} alt="Tu Despensa Logo" className="principal-logo-img" />
          <div className="principal-name">TU DESPENSA 🛒</div>
        </div>

        <SearchBar onSearch={handleSearch} />
        {usuarioNombre ? (



<div className="principal-user-menu">
  {isAdmin() && (
    <button
      className="principal-header-button principal-admin-button-asd"
      onClick={() => navigate("/admin")}
    >
      Gestionar Inventario
    </button>
  )}

  <span
    className="principal-header-button principal-user-name"
    onClick={() => setShowMenu((prev) => !prev)}
  >
    ¡Hola, {usuarioNombre}!
  </span>

  {showMenu && (
    <div className="principal-dropdown-menu">
      <button
        className="principal-dropdown-item"
        onClick={handleCerrarSesion}
      >
        Cerrar Sesión
      </button>
    </div>
  )}
</div>







        ) : (
          <button
            className="principal-header-button"
            onClick={() => navigate("/login")}
          >
            Iniciar Sesión
          </button>
        )}

        {!cartVisible && (
          <button
            className="principal-cart-button"
            onClick={() => setCartVisible(!cartVisible)}
            aria-label="Ver Carrito"
          >
            <FaShoppingCart size={30} />
          </button>
        )}
      </header>
      <div>
      {/* Botón hamburguesa solo en pantallas pequeñas */}
      {isMobile && (
        <div className="menu-toggle" onClick={() =>  {
          setShowMenuHamburguesa((prev) => !prev); // Alterna el menú hamburguesa
          setShowMenu(false); // Asegúrate de cerrar el menú de usuario
        }}>
          ☰
        </div>
      )}

      {/* Menú de navegación */}
      {isMobile && showMenuHamburguesa && (
    <div className="nav-menu active">
      <button className="close-btn" onClick={() => setShowMenuHamburguesa(false)}>
        ×
      </button>
      <h3 className="category-title">Categorías</h3>
      <ul className="principal-category-list">
        {categories.map((category, index) => (
          <li
            className="principal-category-item"
            key={index}
            onClick={() => {
              handleCategoryChange(category);
              setShowMenuHamburguesa(false); // Cerrar el menú al seleccionar una categoría
            }}
          >
            {category}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>

    <div className="principal-main-container">
    {/* Barra lateral solo visible en pantallas grandes */}
    {!isMobile && (
      <aside className="principal-sidebar">
        <h3>Categorías</h3>
        <ul className="principal-category-list">
          {categories.map((category) => (
            <li
              key={category}
              className={`principal-category-item ${
                selectedCategory === category ? "principal-active" : ""
              }`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </aside>
    )}

        <main className="principal-content">
          {isLoading ? (
            <p>Cargando productos...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <ProductList
              products={filteredProducts}
              onAddToCart={handleAddToCart}
            />
          )}
        </main>
      </div>

      {cartVisible && (
     <Cart
     products={productsState.filter((product) => product.quantity > 0)}
     onAddToCart={handleAddToCart}
     onRemoveFromCart={handleRemoveFromCart}
     onClearCart={handleClearCart}
     onRemoveAllFromCart={handleRemoveAllFromCart}
     onClearCartAfterPayment={handleClearCartAfterPayment}
     onClose={() => setCartVisible(false)} 
/>
      )}

      {isModalVisible && (
        <Modal
          message={modalMessage}
          onClose={() => setIsModalVisible(false)}
        />
      )}
      {isNotificationVisible && (
        <div className="notification-container">
          <FaCheckCircle className="notification-icon" />  {/* Mostrar ícono de check */}
          <span>{notificationMessage}</span>
        </div>
      )}
    

      <footer className="principal-app-footer">
        <p>© 2024 Tudespensa. Todos los derechos reservados.</p>
        <p>Contacto: info@tudespensa.com</p>
      </footer>
    </div>
    
  );
};

export default Principal;
