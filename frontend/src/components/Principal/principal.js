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
  
    return (
      <div className="app-container">
        <header className="app-header">
        <div className="logo">
        <img src={logo} alt="Tu Despensa Logo" className="logo-img" />
        <div className="name">TU DESPENSA 🛒</div>
      </div>
          
          <SearchBar onSearch={handleSearch} />
           {/* Botón de Login */}
           <button 
            className="header-button" 
            onClick={() => navigate("/login")}
          >
            Iniciar Sesión
          </button>
          
          {/* Botón para abrir/cerrar el carrito */}
          {!cartVisible && (
          <button 
            className="cart-button" 
            onClick={() => setCartVisible(!cartVisible)} 
            aria-label="Ver Carrito"
          >
            <FaShoppingCart size={30} /> {/* Icono de carrito */}
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
            {/* Lista de productos */}
            <ProductList products={filteredProducts} onAddToCart={handleAddToCart} />
          </main>
        </div>
  
        {/* Renderizar el carrito si está visible */}
        {cartVisible && (
          <Cart
            products={productsState.filter((product) => product.quantity > 0)}
            onAddToCart={handleAddToCart}
            onRemoveFromCart={handleRemoveFromCart}
            onClose={() => setCartVisible(false)} // Función para cerrar el carrito
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
