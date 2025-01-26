import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt } from 'react-icons/fa';  
import { FaTimesCircle } from "react-icons/fa";  

const Cart = ({ 
  products, 
  onAddToCart, 
  onRemoveFromCart, 
  onClose, 
  onClearCart, 
  onRemoveAllFromCart
}) => {
  const navigate = useNavigate();
  const [notificationMessage, setNotificationMessage] = useState("");
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);

  const validProducts = Array.isArray(products) ? products : [];

  const subtotal = validProducts.reduce(
    (sum, item) => sum + item.precio * item.quantity,
    0
  );

  const handleProceedToPayment = () => {
    const user = {
      nombre: localStorage.getItem("usuarioNombre"),
      apellido: localStorage.getItem("usuarioApellido"),
      email: localStorage.getItem("usuarioEmail"),
    };
    navigate("/pagoF", {
      state: { 
        products: validProducts, 
        subtotal, 
        user,
      },
    });
  };

  const handleRemoveFromCart = (product) => {
    if (product.quantity === 1) {
      setNotificationMessage(`${product.nombre} eliminado correctamente`);
      setIsNotificationVisible(true);

      setTimeout(() => {
        onRemoveFromCart(product);
        setIsNotificationVisible(false);
      }, 3000);
    } else {
      onRemoveFromCart(product);
    }
  };

  const handleRemoveAllFromCart = (product) => {
    setNotificationMessage(` ${product.nombre} eliminado correctamente`);
    setIsNotificationVisible(true);

    setTimeout(() => {
      onRemoveAllFromCart(product);
      setIsNotificationVisible(false);
    }, 3000);
  };

  return (
    <div className="principal-cart">
      <h2 className="tituloCarrito">Carrito</h2>
      <button className="principal-close-cart" onClick={onClose}>
        ✖
      </button>

      {validProducts.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        validProducts.map((product) => (
          <div key={product._id} className="principal-cart-item">
            <img
              src={product.imagen_url && product.imagen_url.startsWith("http") ? product.imagen_url : `/img/${product.imagen_url || "default-image.jpg"}`}
              alt={product.nombre || "Producto sin nombre"}
              className="principal-cart-item-image"
            />
            <div className="principal-cart-item-details">
              <span className="principal-cart-item-name">{product.nombre}</span>
              <span className="principal-cart-item-price">${(product.precio * product.quantity).toFixed(2)}</span>
              <div className="principal-cart-controls">
                <button onClick={() => handleRemoveFromCart(product)}>-</button>
                <span className="principal-cart-item-quantity">{product.quantity}</span>
                <button
                  onClick={() => onAddToCart(product)}
                  disabled={product.inventario === 0}
                  className={product.inventario === 0 ? "principal-disabled" : ""}
                >
                  +
                </button>
              </div>
              <button className="remove-all-button" onClick={() => handleRemoveAllFromCart(product)}>
                <FaTrashAlt />
              </button>
            </div>
          </div>
        ))
      )}
      {/* Mostrar el botón "Vaciar carrito" solo si hay productos */}
      {validProducts.length > 0 && (
        <div className="principal-borrar-pedido">
          <button className="principal-borrar" onClick={onClearCart}>
            Vaciar carrito
          </button>
        </div>
      )}
      <h3 className="principal-cart-total">Subtotal: ${subtotal.toFixed(2)}</h3>
      {validProducts.length > 0 && (
        <button
          className="principal-proceed-to-payment"
          onClick={handleProceedToPayment}
        >
          Proceder al pago
        </button>
      )}
      {isNotificationVisible && (
        <div className="notification-container-eliminar">
          <FaTimesCircle className="notification-icon-eli" />
          <span>{notificationMessage}</span>
        </div>
      )}
    </div>
  );
};

export default Cart;
