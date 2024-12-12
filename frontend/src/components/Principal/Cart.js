import React, { useState } from 'react';
import Pago from './Pago';

const Cart = ({ products, onAddToCart, onRemoveFromCart, onClose, onClearCart }) => {
  const [showModal, setShowModal] = useState(false);
  const [paymentOption, setPaymentOption] = useState(null);
  // Aseguramos que products es un array
  const validProducts = Array.isArray(products) ? products : [];

  // Calculamos el subtotal solo si hay productos en el carrito
  const subtotal = validProducts.reduce(
    (sum, item) => sum + item.precio * item.quantity,
    0
  );
  const handleProceedToPayment = () => {
    setShowModal(true); // Muestra el modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Cierra el modal
  };

  const handleSelectPaymentOption = (option) => {
    setPaymentOption(option); // Guarda la opción seleccionada
    alert(`Opción de pago seleccionada: ${option}`);
    handleCloseModal(); // Cierra el modal después de seleccionar una opción

    // Aquí podrías realizar alguna acción según la opción seleccionada
    if (option === 'paypal') {
      // Redirigir a la página de pago con PayPal
   
    }
  };

  return (
    <div className="cart">
      <button className="close-cart" onClick={onClose}>✖</button>
      <h2>Carrito</h2>
      {validProducts.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        validProducts.map((product) => (
          <div key={product._id} className="cart-item">
            <img 
              src={`./img/${product.imagen_url}`} 
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

      <div className="borrarPedido">
        <button className="borrar" onClick={onClearCart}>
          Vaciar carrito
        </button>
      </div>
      <h3 className="cart-total">Subtotal: ${subtotal.toFixed(2)}</h3>
      {validProducts.length > 0 && (
        <button className="proceed-to-payment" onClick={handleProceedToPayment}>
          Proceder al pago
        </button>
      )}
      
      {showModal && (
        <Pago
          subtotal={subtotal}
          onClose={handleCloseModal}
          onSelectPaymentOption={handleSelectPaymentOption}
        />
      )}
    </div>
  );
};

export default Cart;
