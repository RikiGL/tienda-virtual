import React from "react";
import { useNavigate } from "react-router-dom";

const Cart = ({ products, onAddToCart, onRemoveFromCart, onClose, onClearCart }) => {
  const navigate = useNavigate();

  const validProducts = Array.isArray(products) ? products : [];

  const subtotal = validProducts.reduce(
    (sum, item) => sum + item.precio * item.quantity,
    0
  );

  const handleProceedToPayment = () => {

    const user = {
      nombre: localStorage.getItem("usuarioNombre"),
      apellido: localStorage.getItem("usuarioApellido"),
      email: localStorage.getItem("usuarioEmail")
    };
  
    navigate("/pagoF", { state: { products: validProducts, subtotal, user } }); 
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
              src={`./img/${product.imagen_url}`}
              alt={product.nombre}
              className="principal-cart-item-image"
            />
            <div className="principal-cart-item-details">
              <span className="principal-cart-item-name">{product.nombre}</span>
              <span className="principal-cart-item-price">
                ${(product.precio * product.quantity).toFixed(2)}
              </span>
              <div className="principal-cart-controls">
                <button onClick={() => onRemoveFromCart(product)}>-</button>
                <span className="principal-cart-item-quantity">
                  {product.quantity}
                </span>
                <button
                  onClick={() => onAddToCart(product)}
                  disabled={product.inventario === 0}
                  className={
                    product.inventario === 0 ? "principal-disabled" : ""
                  }
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))
      )}
      <div className="principal-borrar-pedido">
        <button className="principal-borrar" onClick={onClearCart}>
          Vaciar carrito
        </button>
      </div>
      <h3 className="principal-cart-total">Subtotal: ${subtotal.toFixed(2)}</h3>
      {validProducts.length > 0 && (
        <button
          className="principal-proceed-to-payment"
          onClick={handleProceedToPayment}
        >
          Proceder al pago
        </button>
      )}
    </div>
  );
};

export default Cart;
