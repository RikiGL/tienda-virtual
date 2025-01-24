import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./pagoF.css"

import styled from "styled-components";


import { FaArrowLeft } from "react-icons/fa";

import logo from "../imagenes/asdlogo.png";

// 3) Definir StyledWrapper con tus estilos (el snippet + adaptaciones)
const StyledWrapper = styled.div`
 
  
  /* Animaciones e íconos */
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    margin-top: 10px;
  }

  .icon {
    font-size: 2em;
    color: #03a9f4;
    transition: all 0.3s ease;
  }

  .icon-left {
    animation: floatLeft 3s ease-in-out infinite;
  }
  .icon-right {
    animation: floatRight 3s ease-in-out infinite;
  }

  @keyframes floatLeft {
    0%, 100% {
      transform: translateX(0) scale(1);
    }
    50% {
      transform: translateX(10px) scale(1.1);
    }
  }

  @keyframes floatRight {
    0%, 100% {
      transform: translateX(0) scale(1);
    }
    50% {
      transform: translateX(-10px) scale(1.1);
    }
  }

  .button {
    position: relative;
    border: none;
    background: transparent;
    --stroke-color: #ffffff7c;
    --ani-color: rgba(95, 3, 244, 0);
    --color-gar: linear-gradient(90deg,#03a9f4,#f441a5,#ffeb3b,#03a9f4);
    letter-spacing: 3px;
    font-size: 1.2em;
    font-family: "Arial";
    text-transform: uppercase;
    color: transparent;
    -webkit-text-stroke: 1px var(--stroke-color);
    cursor: pointer;
    outline: none;
  }
  .actual-text {
    color: black;
    -webkit-text-stroke: 0;
  }
  .front-text {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: var(--color-gar);
    -webkit-background-clip: text;
    background-clip: text;
    background-size: 200%;
    opacity: 0;
    transition: opacity 0.3s ease;
    animation: 8s ani infinite;
    border-bottom: 2px solid transparent;
  }
  .button:hover .front-text {
    opacity: 1;
    border-bottom: 2px solid #03a9f4;
    -webkit-text-stroke: 1px var(--ani-color);
  }
  .button:hover ~ .icon {
    color: rgb(65, 244, 65);
    transform: scale(1.2);
  }
  @keyframes ani {
    0% {
      background-position: 0%;
    }
    50% {
      background-position: 400%;
    }
    100% {
      background-position: 0%;
    }
  }

  /* --------- EXTRA: Estilos para la estructura principal --------- */
  body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    background-color: #f4f4f9;
  }

  /* HEADER (antes .pagoC-app-header) */
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    height: 60px;
    padding: 10px 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
  .logo-section {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .logo-img {
    width: 50px;
    height: auto;
  }
  .header-title {
    font-size: 24px;
    font-weight: bold;
    color: #0c5304;
  }

  /* BACK BUTTON container */
  .back-button-container {
    margin-left: 20px;
    margin-top: 10px;
  }

  .back-button {
    padding: 8px 16px;
    font-size: 14px;
    color: #fff;
    background-color: #0c5304;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s;
  }
  .back-button:hover {
    background-color: #0a4203;
    transform: scale(1.05);
  }

  /* MAIN (antes .pagoC-payment-confirmation) */
  .main-container {
    max-width: 1200px;
    margin: 20px auto;
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    min-height: calc(100vh - 120px);
    display: flex;
    flex-direction: column;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    transition: transform 0.3s, box-shadow 0.3s;
    animation: fadeIn 0.5s ease-in-out;
  }
  .main-container:hover {
    transform: scale(1.01);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  }

  h1 {
    text-align: center;
    color: #333;
    margin-bottom: 20px;
    font-size: 24px;
  }
  h2 {
    color: #0c5304;
    margin-bottom: 10px;
    text-align: center;
    font-size: 20px;
  }

  /* Información de usuario y productos (info-section) */
  .info-section {
    margin-bottom: 25px;
    font-size: 16px;
    color: #333;
  }

  /* Filas y labels */
  .pagoC-row {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
  }
  .pagoC-row label {
    font-weight: bold;
    margin-right: 10px;
  }
  .pagoC-row input {
    flex: 1;
    padding: 6px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  /* Botón "Cambiar Dirección" */
  .change-address-button {
    margin-top: 10px;
  }
  .change-address-button button {
    padding: 8px 16px;
    font-size: 14px;
    background-color: #0c5304;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s;
  }
  .change-address-button button:hover {
    background-color: #0a4203;
    transform: scale(1.05);
  }

  /* Tabla de productos */
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 15px;
    font-size: 14px;
  }
  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  th {
    background-color: #f8f9fa;
    font-weight: bold;
    color: #333;
  }
  /* Efecto hover en las filas */
  tbody tr:hover {
    background-color: #eef0f1;
  }

  /* Sección total (pagoC-total-amount) */
  .total-amount {
    margin-top: 30px;
    padding: 20px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    transition: box-shadow 0.3s;
  }
  .total-amount:hover {
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.08);
  }
  .final-total {
    font-size: 18px;
    font-weight: bold;
    color: #0c5304;
    margin-top: 15px;
  }

  /* Contenedor PayPal (centrado) */
  #paypal-button-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  /* MODAL (antes .modal-overlay, .confirmation-modal) */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    animation: fadeIn 0.4s ease;
  }
  .confirmation-modal {
    background: #fff;
    padding: 2rem;
    border-radius: 8px;
    text-align: center;
    max-width: 400px;
    width: 90%;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
  }
  .modal-buttons {
    margin-top: 20px;
  }
  .fin-btn {
    background-color: #0c5304;
    color: #fff;
    border: none;
    padding: 10px 16px;
    cursor: pointer;
    border-radius: 4px;
    font-size: 14px;
    font-weight: bold;
    margin: 0 5px;
    transition: background-color 0.3s ease, transform 0.3s;
  }
  .fin-btn:hover {
    background-color: #0a4203;
    transform: scale(1.05);
  }

  /* Efecto blur en el contenido cuando el modal está activo */
  .blur-content {
    filter: blur(2px);
    pointer-events: none;
  }

  /* FOOTER (antes .pagoC-app-footer) */
  .footer {
    background-color: #333;
    color: #fff;
    text-align: center;
    padding: 10px 0;
    font-size: 14px;
    width: 100%;
    position: relative;
    bottom: 0;
    left: 0;
  }
  .footer p {
    margin: 5px 0;
  }

  /* Animación fadeIn */
  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(-10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const PaymentConfirmation = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { products = [], subtotal = 0, user = {} } = state || {};
  const totalAmount = (subtotal + 1.5).toFixed(2);

  // Manejo de estados
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);

  // Memo
  const memoizedProducts = useMemo(() => products, [products]);

  useEffect(() => {
    const loadPayPalScript = () => {
      if (document.getElementById("paypal-sdk")) {
        initializePayPalButtons();
        return;
      }
      const script = document.createElement("script");
      script.id = "paypal-sdk";
      // Reemplaza con tu verdadero Client ID si es diferente
      script.src = `https://www.paypal.com/sdk/js?client-id=ATtZcCKaqQhq6HWExO-YM8HaLEffYoqEbPsIG6S7Lr8VoFkynDSwVXIO9d7pm6NhkQhq3iB1efjh-b1U&currency=USD`;
      script.async = true;
      script.onload = initializePayPalButtons;
      script.onerror = () => {
        console.error("Error al cargar el SDK de PayPal.");
      };
      document.body.appendChild(script);
    };

    const initializePayPalButtons = () => {
      const buttonContainer = document.getElementById("paypal-button-container");
      if (buttonContainer) {
        buttonContainer.innerHTML = "";
      }
      if (window.paypal) {
        window.paypal
          .Buttons({
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [
                  { amount: { value: totalAmount } },
                ],
              });
            },
            onApprove: async (data, actions) => {
              try {
                // Capturar el pago
                const details = await actions.order.capture();
                // Mensaje emergente con nombre del pagador
                //alert(`Pago completado con éxito por ${details.payer.name.given_name}`);

                // Crear la factura en backend
                const factura = {
                  id_cliente: 6, 
                  total: totalAmount,
                  metodo_pago: "paypal",
                };
                const response = await fetch("http://localhost:4000/api/facturas", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(factura),
                });
                if (!response.ok) {
                  throw new Error("Error al guardar la factura.");
                }

                const responseData = await response.json();
                console.log("Factura creada:", responseData);
                setInvoiceData(responseData);

                // Eliminar productos
                const productIdsWithQuantities = memoizedProducts.map((product) => ({
                  productId: product._id,
                  quantity: product.quantity,
                }));
                const deleteResponse = await fetch("http://localhost:4000/api/productos/id", {
                  method: "DELETE",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ productIdsWithQuantities }),
                });
                if (!deleteResponse.ok) {
                  throw new Error("Error al eliminar los productos.");
                }

                console.log("Productos eliminados correctamente");

                // Mostramos el modal en lugar de redirigir
                setShowConfirmationModal(true);

              } catch (error) {
                console.error("Error al procesar la factura:", error);
                alert("El pago fue exitoso, pero ocurrió un error al guardar la factura.");
              }
            },
            onError: (err) => {
              console.error("Error durante el pago:", err);
              alert("Hubo un error al procesar el pago. Por favor, inténtalo nuevamente.");
            },
          })
          .render("#paypal-button-container")
          .catch((err) => {
            console.error("Error al renderizar PayPal:", err);
          });
      } else {
        console.error("SDK de PayPal no disponible.");
      }
    };

    loadPayPalScript();
  }, [totalAmount, memoizedProducts]);

  const handleChangeAddress = () => {
    navigate("/CambioDireccion");
  };
  const handleBackClick = () => {
    navigate("/principal");
  };

  // Descargar factura
  const handleDownloadInvoice = () => {
    if (!invoiceData) return;
    window.open(`http://localhost:4000/api/facturas/${invoiceData.id}/descargar`, "_blank");
  };

  // Cerrar modal y volver
  const handleGoHome = () => {
    setShowConfirmationModal(false);
    navigate("/principal");
  };

  return (
    <StyledWrapper>
      {/* ========== HEADER ========== */}
      <header className="header">
        <div className="logo-section">
          <img src={logo} alt="Logo" className="logo-img" />
          <div className="header-title">TU DESPENSA 🛒</div>
        </div>
        {/* Si quisieras algo a la derecha, lo agregarías aquí */}
      </header>

      {/* ========== BOTÓN VOLVER ========== */}
      <div className="back-button-container">
        <button className="back-button" onClick={handleBackClick}>
          <FaArrowLeft style={{ marginRight: "8px" }} />
          Volver
        </button>
      </div>

      {/* ========== MODAL DE CONFIRMACIÓN ========== */}
      {showConfirmationModal && (
        <div className="modal-overlay">
          <div className="confirmation-modal">
            <h2>¡Pago realizado con éxito!</h2>
            <p>Tu pago se ha procesado correctamente.</p>
            <div className="modal-buttons">
              <button className="fin-btn" onClick={handleDownloadInvoice}>Descargar Factura</button>
              <button className="fin-btn" onClick={handleGoHome}>Volver al Inicio</button>
            </div>
          </div>
        </div>
      )}

      {/* ========== MAIN CONTAINER ========== */}
      <main className={`main-container ${showConfirmationModal ? "blur-content" : ""}`}>
        <h1>Confirmación de Pago</h1>

        {/* Información del Usuario */}
        <div className="info-section">
          <h2>Información del Usuario</h2>
          <p><strong>Nombre:</strong> {user.nombre && user.apellido}</p>
          <p><strong>Correo electrónico:</strong> {user.correo || "No disponible"}</p>
          <p><strong>Dirección:</strong> {user.domicilio || "No disponible"}</p>

          <div className="pagoC-row">
            <label htmlFor="cedula">Cédula:</label>
            <input type="text" id="cedula" placeholder="Ingrese su cédula" required />
          </div>
          <div className="pagoC-row">
            <label htmlFor="telefono">Número de Celular:</label>
            <input type="text" id="telefono" placeholder="Ingrese su número de celular" required />
          </div>

          <div className="change-address-button">
            <button onClick={handleChangeAddress}>Cambiar Dirección</button>
          </div>
        </div>

        {/* Productos */}
        <div className="info-section">
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

        {/* Total a Pagar */}
        <div className="total-amount">
          <h2>Total a Pagar</h2>
          <div className="pagoC-row">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="pagoC-row">
            <span>Costo de Envío:</span>
            <span>$1.50</span>
          </div>
          <div className="pagoC-row final-total">
            <span>Total:</span>
            <span>${totalAmount}</span>
          </div>
        </div>

    
        <div id="paypal-button-container"></div>
      </main>

      <footer className="footer">
        <p>© 2024 Tu Despensa. Todos los derechos reservados.</p>
        <p>Contacto: info@tudespensa.com</p>
      </footer>
    </StyledWrapper>
  );
};

export default PaymentConfirmation;
