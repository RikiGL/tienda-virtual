import React from 'react';


const Pago = ({ subtotal, onClose, onSelectPaymentOption }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Resumen de Pago</h2>
        <p><strong>Total a pagar:</strong> ${subtotal.toFixed(2)}</p>
        
        <h3>Selecciona una opción de pago:</h3>
        <div className="payment-options">
          <button onClick={() => onSelectPaymentOption('tarjeta')}>Pagar con tarjeta</button>
          <button onClick={() => onSelectPaymentOption('paypal')}>Pagar con PayPal</button>
          <button onClick={() => onSelectPaymentOption('efectivo')}>Pagar en efectivo</button>
        </div>
        
        <button onClick={onClose} className="close-button">✖</button>
      </div>
    </div>
  );
};

export default Pago;