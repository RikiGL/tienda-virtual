import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./pagoF.css"
import styled from "styled-components";
import { FaArrowLeft } from "react-icons/fa";
import logo from "../imagenes/asdlogo.png";


const StyledWrapper = styled.div`
 
  
  /* Animaciones e íconos */
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    margin-top: 10px;
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
  const { state } = useLocation();
  const {
    products = [],
    subtotal = 0,
    user = {
      nombre: "Invitado",
      apellido: "",
      email: "No disponible",
      domicilio: {
        direccion: "No disponible",
        ciudad: "No disponible",
        referencia: "No disponible",
      },
    },
    onClearCartAfterPayment,
  } = state || {};


  const navigate = useNavigate();


  const totalAmount = (subtotal + 1.5).toFixed(2);



  ////////////////
  const savedUser = {
    nombre: localStorage.getItem("usuarioNombre") || "Invitado",
    apellido: localStorage.getItem("usuarioApellido") || "",
    email: localStorage.getItem("usuarioEmail") || "No disponible",
    domicilio: {
      direccion: localStorage.getItem("usuarioDireccion") || "No disponible",
      ciudad: localStorage.getItem("usuarioCiudad") || "No disponible",
      referencia: localStorage.getItem("usuarioReferencia") || "No disponible",
    }
  };
  const finalUser = { ...savedUser, ...user };

  // Manejo de estados
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);
  const [cedula, setCedula] = useState('');
  const [celular, setCelular] = useState('');
  const [isCedulaValid, setIsCedulaValid] = useState(false);
  const [isCelularValid, setIsCelularValid] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');



  // Memo
  const memoizedProducts = useMemo(() => products, [products]);
  const handleCedulaChange = (event) => {
    const value = event.target.value;
    if (/^\d{0,10}$/.test(value)) {  // Solo números y máximo 10 dígitos
      setCedula(value);
      setIsCedulaValid(value.length === 10);  // Verifica si tiene 10 dígitos
    }
  };

  const handleCelularChange = (event) => {
    const value = event.target.value;
    if (/^\d{0,10}$/.test(value)) {  // Solo números y máximo 10 dígitos
      setCelular(value);
      setIsCelularValid(value.length === 10);  // Verifica si tiene 10 dígitos
    }
  };


  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (isCedulaValid && isCelularValid) {
      setIsFormValid(true);
      setWarningMessage('');
    } else {
      setIsFormValid(false);
      if (!isCedulaValid || !cedula) {
        setWarningMessage('Debe ingresar una cédula válida.');
      } else if (!isCelularValid || !celular) {
        setWarningMessage('Debe ingresar un número de celular válido.');
      }
    }
  }, [isCedulaValid, isCelularValid, cedula, celular]);


  useEffect(() => {
    if (showConfirmationModal) {
      handleSendEmail();
    }
  }, [showConfirmationModal]);

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

    // Validar si los campos de cédula y celular están completos
    const isFormValid = cedula.length === 10 && celular.length === 10;


    const initializePayPalButtons = () => {
      const buttonContainer = document.getElementById("paypal-button-container");
      if (!isFormValid) {
        buttonContainer.innerHTML = ''; // Elimina el botón si los campos no están completos
        setWarningMessage('Debe completar todos los campos antes de proceder.');
        return;
      }
      
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
                console.log("Pago capturado:", details);
                localStorage.removeItem("cart");
                // Crear la factura en el backend
                const factura = {
                  id_cliente: Number(localStorage.getItem("usuarioId")), // Cambiar según lógica de cliente
                  total: Number(totalAmount),
                  metodo_pago: "paypal",
                  cedula: document.getElementById("cedula").value, // Leer directamente del input
                  celular: document.getElementById("telefono").value, // Leer directamente del input
                  productos: memoizedProducts,

                };
                console.log(memoizedProducts)

                //CAMBIAR DESPUES
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

                // Eliminar productos del inventario
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

                // Vaciar el carrito en el frontend
                if (typeof onClearCartAfterPayment === "function") {
                  onClearCartAfterPayment(); // Vacía el carrito en `principal.js`
                }

                // Mostrar el modal de confirmación de pago
                setShowConfirmationModal(true);
              } catch (error) {
                console.error("Error al procesar el pago:", error);
                alert("El pago fue exitoso, pero ocurrió un error al procesar la factura o actualizar el inventario.");
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
  }, [totalAmount, memoizedProducts, cedula, celular, isFormValid]);

  const handleChangeAddress = () => {
    navigate("/CambioDireccion");
  };
  const handleBackClick = () => {
    navigate("/principal");
  };


  // Descargar factura
  const handleDownloadInvoice = async () => {
    try {
      const response = await handeGenerateFactura();
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Factura-${invoiceData.nuevaFactura._id}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error al descargar la factura:', error);
    }
  };

  const handeGenerateFactura = async () => {
    try {
      console.log("invoiceData", invoiceData);
      const response = await fetch(`http://localhost:4000/api/generate-factura/${invoiceData.nuevaFactura._id}/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Error al generar la factura.");
      }

      return response;
    } catch (error) {
      console.error('Error al generar la factura:', error);
    }
  };

  const handleSendEmail = async () => {
    try {
      const formData = new FormData();
      const responseDoc = await handeGenerateFactura();
      const fileBlob = await responseDoc.blob();
      formData.append("file", fileBlob, "archivo.pdf");
      formData.append("email", finalUser.email);
      console.log("file", fileBlob);
      console.log("finalUser.email", finalUser.email);
      const response = await fetch(`http://localhost:4000/api/envio-factura/`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error al enviar el correo.");
      }
      const result = await response.json();
      console.log("Archivo enviado con éxito:", result);

    } catch (error) {
      console.error('Error al enviar el correo:', error);
    }
  }; 

  // Cerrar modal y volver
  const handleGoHome = () => {
    setShowConfirmationModal(false);
    navigate("/principal");
  };

  return (
    <StyledWrapper>
      {/* ========== HEADER ========== */}
      <header className="principal-app-header">
        <div className="principal-logo">
          <img src={logo} alt="Tu Despensa Logo" className="principal-logo-img" />
          <div className="principal-name-asd">TU DESPENSA 🛒</div>
        </div>
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
            <p>Tu factura se ha enviado a tu correo electronico.</p>
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
          <p><strong>Nombre:</strong> {finalUser.nombre} {finalUser.apellido}</p>
          <p><strong>Correo electrónico:</strong> {finalUser.email}</p>
          <p><strong>Dirección:</strong> {finalUser.domicilio.direccion}</p>
          <p><strong>Ciudad:</strong> {finalUser.domicilio.ciudad}</p>
          <p><strong>Referencia:</strong> {finalUser.domicilio.referencia}</p>

          <div className="pagoC-row">
            <label htmlFor="cedula">Cédula:</label>
            <input type="text" id="cedula" value={cedula} onChange={handleCedulaChange} placeholder="Ingrese su cédula" required />
          </div>
          <div className="pagoC-row">
            <label htmlFor="telefono">Número de Celular:</label>
            <input type="text" id="telefono" value={celular} onChange={handleCelularChange} placeholder="Ingrese su número de celular" required />
          </div>
          <div className="change-address-button">
            <button onClick={handleChangeAddress}>Cambiar Dirección</button>
          </div>
        </div>

        {/* Mensaje de advertencia si los campos no son válidos */}
        {warningMessage && (
          <div className="warning-message">
            <p>{warningMessage}</p>
          </div>
        )}

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
