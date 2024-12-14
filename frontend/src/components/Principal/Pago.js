import React from 'react';

const Pago = ({ subtotal, onClose, onSelectPaymentOption }) => {
  return (
    <div className="principal-modal-overlay">
      <div className="principal-modal-content">
        <h2>Resumen de Pago</h2>
        <p><strong>Total a pagar:</strong> ${subtotal.toFixed(2)}</p>

        <h3>Selecciona una opción de pago:</h3>
        <div className="principal-payment-options">
          <button onClick={() => onSelectPaymentOption('paypal')}>Pagar con PayPal</button>
        </div>

        <button onClick={onClose} className="principal-close-button">✖</button>
      </div>
    </div>
  );
};

export default Pago;

