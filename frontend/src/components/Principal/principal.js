import React, { useState, useCallback, useEffect } from "react";
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import productsData from "./data"; // Asegúrate de importar correctamente los datos
import ProductList from "./ProductList"; // Importa el componente ProductList
import SearchBar from "./SearchBar"; // Importa el componente SearchBar
import Cart from "./Cart"; // Importa el componente Carrito
import logo from '../imagenes/asdlogo.png';
import "./principal.css";

const Principal = () => {
    const [productsState, setProducts] = useState(productsData);
    const [filteredProducts, setFilteredProducts] = useState(productsData);
    const [selectedCategory, setSelectedCategory] = useState('Todas');
    const [searchQuery, setSearchQuery] = useState('');
    const [cartVisible, setCartVisible] = useState(false); // Estado para la visibilidad del carrito
    const navigate = useNavigate(); 
    const [usuarioNombre, setUsuarioNombre] = useState("");
    const categories = [
      'Todas',
      'Verduras-Legumbres',
      'Bebidas',
      'Lacteos',
      'Frutas',
      'Enlatados-Panificados',
      'Carnes-Embutidos',
      'Abastos',
    ];
  

    const [showMenu, setShowMenu] = useState(false);




    useEffect(() => {
     
      const nombre = localStorage.getItem("usuarioNombre");
      if (nombre) {
        setUsuarioNombre(nombre);
      }
    }, []);


    // Filtrar productos según la búsqueda y categoría seleccionada
    const filterProducts = useCallback(() => {
      const lowerQuery = searchQuery.toLowerCase();
      const filtered = productsState.filter(
        (product) =>
          product.nombre.toLowerCase().includes(lowerQuery) &&
          (selectedCategory === 'Todas' || product.categoria === selectedCategory)
      );
      setFilteredProducts(filtered);
    }, [searchQuery, selectedCategory, productsState]);
  
    // Efecto para actualizar los productos filtrados
    useEffect(() => {
      filterProducts();
    }, [filterProducts]);
  
    const handleSearch = (query) => {
      setSearchQuery(query);
    };
  
    const handleCategoryChange = (category) => {
      setSelectedCategory(category);
    };
  
    const handleAddToCart = (product) => {
      if (product.inventario > 0) {
        const updatedProducts = productsState.map((p) =>
          p.id === product.id
            ? { ...p, inventario: p.inventario - 1, quantity: (p.quantity || 0) + 1 }
            : p
        );
        setProducts(updatedProducts);
      }
    };
  
    const handleRemoveFromCart = (product) => {
      if (product.quantity > 0) {
        const updatedProducts = productsState.map((p) =>
          p.id === product.id
            ? { ...p, inventario: p.inventario + 1, quantity: p.quantity - 1 }
            : p
        );
        setProducts(updatedProducts);
      }
    };
  

    useEffect(() => {
      const handleOutsideClick = (event) => {
        if (!event.target.closest('.user-menu')) {
          setShowMenu(false);
        }
      };
      document.addEventListener('click', handleOutsideClick);
      return () => document.removeEventListener('click', handleOutsideClick);
    }, []);
    

    const handleClearCart = () => {
      const clearedProducts = productsState.map((product) => ({
        ...product,
        quantity: 0, // Restablece la cantidad a 0
        inventario: product.inventario + product.quantity, // Devuelve los productos al inventario
      }));
      setProducts(clearedProducts); // Actualiza el estado de los productos
    };
    

    return (
      <div className="app-container">
        <header className="app-header">
        <div className="logo">
        <img src={logo} alt="Tu Despensa Logo" className="logo-img" />
        <div className="name">TU DESPENSA 🛒</div>
      </div>
          
          <SearchBar onSearch={handleSearch} />
         
         
         
         
          {usuarioNombre ? (
  <div className="user-menu">
    <span
      className="header-button user-name"
      onClick={() => setShowMenu((prev) => !prev)} 
    >
      ¡Hola, {usuarioNombre}!
    </span>
    {showMenu && (
      <div className="dropdown-menu">
        <button
          className="dropdown-item"
          onClick={() => {
            localStorage.removeItem("usuarioNombre");
            setUsuarioNombre(""); 
            setShowMenu(false); 
          }}
        >
          Cerrar Sesión
        </button>
      </div>
    )}
  </div>
) : (
  <button
    className="header-button"
    onClick={() => navigate("/login")}
  >
    Iniciar Sesión
  </button>
)}

        
          {!cartVisible && (
          <button 
            className="cart-button" 
            onClick={() => setCartVisible(!cartVisible)} 
            aria-label="Ver Carrito"
          >
            <FaShoppingCart size={30} /> 
          </button>
        )}
        </header>
  
        <div className="main-container">
          <aside className="sidebar">
            <h3>Categorías</h3>
            <ul className="category-list">
              {categories.map((category) => (
                <li
                  key={category}
                  className={`category-item ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
          </aside>
  
          <main className="content">
        
            <ProductList products={filteredProducts} onAddToCart={handleAddToCart} />
          </main>
        </div>
  
    
        {cartVisible && (
  <Cart
    products={productsState.filter((product) => product.quantity > 0)}
    onAddToCart={handleAddToCart}
    onRemoveFromCart={handleRemoveFromCart}
    onClearCart={handleClearCart} 
    onClose={() => setCartVisible(false)} 
  />
)}

        <footer className="app-footer">
        <p>© 2024 Tudespensa. Todos los derechos reservados.</p>
        <p>Contacto: info@tudespensa.com</p>
        </footer>
      </div>
    );
  };
export default Principal;
