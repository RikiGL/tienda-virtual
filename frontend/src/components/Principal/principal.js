import React, { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ProductList from "./ProductList";
import SearchBar from "./SearchBar";
import Cart from "./Cart";
import logo from "../imagenes/asdlogo.png";
//import "./principal.css";
import "./princ.css";
import Modal from "../Modal/modal";
import { isAdmin, isAuthenticated } from "../auth";
import { FaCheckCircle } from 'react-icons/fa';
import imagen1 from "../imagenes/slider/imagen1.PNG";
import imagen2 from "../imagenes/slider/imagen2.PNG";
import imagen3 from "../imagenes/slider/imagen3.PNG";
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
  
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);




  const images = [imagen1, imagen2, imagen3];
  
  const [currentIndex, setCurrentIndex] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval); // Limpieza del intervalo
  }, [images.length]);
///// menu hamburguesa

const [showSearch, setShowSearch] = useState(false);
const [showCategories, setShowCategories] = useState(false);
const [showUserOptions, setShowUserOptions] = useState(false);


const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para abrir/cerrar menú

const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Alterna entre abierto y cerrado
};

// Función para manejar el cambio de categoría
const handleMenuCategoryChange = (category) => {
  setSelectedCategory(category);
  setIsMenuOpen(false); // Cierra el menú después de seleccionar
};


// Función para manejar el cambio en la barra de búsqueda
const handleSearchChange = (e) => {
  setSearchQuery(e.target.value); // Actualiza la búsqueda
};

///////////////////





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
  const categoryImages = {
    Todas: "https://despensallena.com/wp-content/uploads/2024/05/cat-combos-home.png",
    "Verduras-Legumbres": "https://ziclop.coopcycle.org/media/cache/product_thumbnail_1x1/62/10/6210e8404eaff.jpeg",
    Bebidas: "https://despensallena.com/wp-content/uploads/2024/03/Icono-Bebidas.png",
    Lacteos: "data:image/jpeg;base64,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",
    Frutas: "https://ziclop.coopcycle.org/media/cache/product_thumbnail_1x1/62/10/6210eda087732.jpeg",
    "Enlatados-Panificados": "https://despensallena.com/wp-content/uploads/2024/03/Icono-PAnaderia.png",
    "Carnes-Embutidos": "https://despensallena.com/wp-content/uploads/2024/03/Icono-Carniceria.png",
    Abastos: "https://despensallena.com/wp-content/uploads/2024/11/DespensaDepot.png",
  };

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
      await fetch(`${process.env.REACT_APP_API_URL}actualizarInventario`, {
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

        const response = await fetch(`${process.env.REACT_APP_API_URL}productos`);
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

  
  /// cuando es movil
  useEffect(() => {
    const handleResize = () => {
        const isMobileView = window.innerWidth <= 912;
        setIsMobile(isMobileView);
        if (!isMobileView) {
            setIsMenuOpen(false); // Cierra el menú si ya no es móvil
        }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
}, []);




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


  return (
    <div className="principal-app-container">
      <header className="principal-app-header">
        <div className="principal-logo">
          <img src={logo} alt="Tu Despensa Logo" className="principal-logo-img" />
          <div className="principal-name">TU DESPENSA 🛒</div>
        </div>







{/* Icono del menú hamburguesa */}
{/* Icono del menú hamburguesa */}
{isMobile && (
  <div className="p-hamburger-icon" onClick={handleToggleMenu}>
    ☰
  </div>
)}






{/* Menú desplegable */}
{isMenuOpen && (
  <div className="hamburger-menu">
    {/* Buscar Productos */}
    <div className="principal-menu-section">
      <h4
        className="principal-menu-title"
        onClick={() => setShowSearch((prev) => !prev)}
      >
        Buscar Productos
      </h4>
      {showSearch && (
        <input
          type="text"
          placeholder="Buscar..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="principal-hamburger-search-bar"
        />
      )}
    </div>

    {/* Categorías */}
    <div className="principal-menu-section">
      <h4
        className="principal-menu-title"
        onClick={() => setShowCategories((prev) => !prev)}
      >
        Categorías
      </h4>
      {showCategories && (
        <ul className="principal-category-list">
          {categories.map((category) => (
            <li
              key={category}
              className="principal-category-item"
              onClick={() => handleMenuCategoryChange(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      )}
    </div>

    {/* Usuario */}
    {usuarioNombre ? (
      <div className="principal-menu-section">
        <h4
          className="principal-menu-title"
          onClick={() => setShowUserOptions((prev) => !prev)}
        >
          Usuario
        </h4>
        {showUserOptions && (
          <ul className="principal-user-options">
            {isAdmin() && (
              <li
                className="principal-admin-option"
                onClick={() => {
                  navigate("/admin");
                  setIsMenuOpen(false);
                }}
              >
                Gestionar Inventario
              </li>
            )}
            <li
              className="principal-logout-option"
              onClick={handleCerrarSesion}
            >
              Cerrar Sesión
            </li>
          </ul>
        )}
      </div>
    ) : (
      <div className="principal-menu-section">
        <button
          className="principal-login-button"
          onClick={() => navigate("/login")}
        >
          Iniciar Sesión
        </button>
      </div>
    )}
  </div>
)}











        <SearchBar onSearch={handleSearch} />
        {usuarioNombre ? (



<div className="principal-user-menu">
  {isAdmin() && (
    <button
      className="principal-header-button  principal-admin-button-asd"
      onClick={() => navigate("/admin")}
    >
      Gestionar Inventario
    </button>
  )}

  <span
    className="principal-header-button-principal-user-name"
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
   


    </div>

    <div className="principal-main-container">
    <div className="carousel-container">
        <img
          src={images[currentIndex]}
          alt={`Imagen ${currentIndex + 1}`}
          className="carousel-image"
          style={{ width: "100%", height: "300px", objectFit: "cover", borderRadius: "8px" }}
        />
      </div>


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
    
              <img
              src={categoryImages[category]} // Obtiene la imagen asociada a la categoría
              alt={category}
            />
            {/* Nombre de la categoría */}
            <span>{category}</span>
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



