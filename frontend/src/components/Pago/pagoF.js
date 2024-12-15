import React from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
import "./pagoF.css";
import { useState, useEffect } from "react"; 
import logo from "../imagenes/asdlogo.png";

const PaymentConfirmation = () => {
  const navigate = useNavigate();
  const { state } = useLocation(); 
  const { products = [], subtotal = 0, user = {} } = state || {};
  console.log("Datos del usuario en pagoF:", user);

  const handleBackClick = () => {
    navigate("/principal"); 
  };

  

  return (
    <div className="pagoC-page">
      <header className="pagoC-app-header">
        <div className="pagoC-logo">
          <img src={logo} alt="Tu Despensa Logo" className="pagoC-logo-img" />
          <div className="pagoC-name">TU DESPENSA 🛒</div>
        </div>
      </header>
      <div className="pagoC-back-button-container">
        <button className="pagoC-back-button" onClick={handleBackClick}>
          Volver
        </button>
      </div>

      <main className="pagoC-payment-confirmation">
        <h1>Confirmación de Pago</h1>

 
        <div className="pagoC-user-info">
          <h2>Información del Usuario</h2>
          <p>
         
            <strong>Nombre:</strong>  {user.nombre} {user.apellido}
          </p>
          <p>
          <strong>Correo electrónico:</strong> 
          </p>
          <p>
          <strong>Dirección:</strong> 
          </p>
        </div>


        <div className="pagoC-product-info">
          <h2>Productos</h2>
          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.nombre}</td>
                  <td>{product.quantity}</td>
                  <td>${product.precio.toFixed(2)}</td>
                  <td>${(product.precio * product.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

  
        <div className="pagoC-total-amount">
        <h2>Total a Pagar</h2>
        {/* Subtotal */}
        <div className="pagoC-row">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        {/* Costo de Envío */}
        <div className="pagoC-row">
          <span>Costo de Envío:</span>
          <span>$1.50</span>
        </div>
        {/* Total */}
        <div className="pagoC-row pagoC-final-total">
          <span>Total:</span>
          <span>${(subtotal + 1.5).toFixed(2)}</span>
        </div>
      </div>
     
        <button className="pagoC-confirm-button">Pagar con PayPal</button>
      </main>

      <footer className="pagoC-app-footer">
        <p>© 2024 Tu Despensa. Todos los derechos reservados.</p>
        <p>Contacto: info@tudespensa.com</p>
      </footer>
    </div>
  );
};

export default PaymentConfirmation;