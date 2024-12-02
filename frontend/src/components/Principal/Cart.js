import React from 'react';

const Cart = ({ products, onAddToCart, onRemoveFromCart, onClose }) => {
  // Aseguramos que products es un array
  const validProducts = Array.isArray(products) ? products : [];

  // Calculamos el subtotal solo si hay productos en el carrito
  const subtotal = validProducts.reduce(
    (sum, item) => sum + item.precio * item.quantity,
    0
  );

  return (
    <div className="cart">
      <button className="close-cart" onClick={onClose}>✖</button>
      <h2>Carrito</h2>
      {validProducts.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        validProducts.map((product) => (
          <div key={product.id} className="cart-item">
            <img 
              src={`./img/${product.imagen}`} 
              alt={product.nombre} 
              className="cart-item-image" 
            />
            <div className="cart-item-details">
              <span className="cart-item-name">{product.nombre}</span>
              <span className="cart-item-price">${(product.precio * product.quantity).toFixed(2)}</span>
              <div className="cart-controls">
              <button onClick={() => onRemoveFromCart(product)}>-</button>
              <span className="cart-item-quantity">{product.quantity}</span>
              <button 
                onClick={() => onAddToCart(product)} 
                disabled={product.inventario === 0}
                className={product.inventario === 0 ? 'disabled' : ''}
              >
                +
              </button>
            </div>
            </div>
          </div>
        ))
      )}
      <h3 className="cart-total">Subtotal: ${subtotal.toFixed(2)}</h3>
    </div>
  );
};

export default Cart;