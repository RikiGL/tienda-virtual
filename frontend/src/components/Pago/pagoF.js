import React, { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./pagoF.css";
import logo from "../imagenes/asdlogo.png";

const PaymentConfirmation = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { products = [], subtotal = 0, user = {} } = state || {};
  const totalAmount = (subtotal + 1.5).toFixed(2); // Total con costo de envío

  // Usar memoización para evitar reejecuciones innecesarias
  const memoizedProducts = useMemo(() => products, [products]);

  useEffect(() => {
    const loadPayPalScript = () => {
      // Verificar si el script ya está cargado
      if (document.getElementById("paypal-sdk")) {
        initializePayPalButtons();
        return;
      }

      const script = document.createElement("script");
      script.id = "paypal-sdk";
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
        buttonContainer.innerHTML = ""; // Limpia cualquier contenido previo
      }
      if (window.paypal) {
        window.paypal
          .Buttons({
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: totalAmount, // Total a pagar
                    },
                  },
                ],
              });
            },
            onApprove: async (data, actions) => {
              try {
                const details = await actions.order.capture();
                alert(`Pago completado con éxito por ${details.payer.name.given_name}`);

                // Crear la factura en el backend
                const factura = {
                  id_cliente: 6, // Usar el ID del cliente
                  total: totalAmount,
                  metodo_pago: "paypal",
                };

                const response = await fetch(`${process.env.REACT_APP_API_URL}facturas`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(factura),
                });

                if (!response.ok) {
                  throw new Error("Error al guardar la factura.");
                }

                const responseData = await response.json();
                console.log("Factura creada:", responseData);

                // Eliminar los productos de la base de datos según la cantidad
                const productIdsWithQuantities = memoizedProducts.map((product) => ({
                  productId: product._id,
                  quantity: product.quantity,
                }));

                const deleteResponse = await fetch(`${process.env.REACT_APP_API_URL}productos/id`, {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ productIdsWithQuantities }),
                });

                if (!deleteResponse.ok) {
                  throw new Error("Error al eliminar los productos.");
                }

                console.log("Productos eliminados correctamente");
                // Redirigir después del pago
                navigate("/principal");
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
            console.error("Error al renderizar el botón de PayPal:", err);
          });
      } else {
        console.error("El SDK de PayPal no está disponible.");
      }
    };

    // Cargar el script de PayPal cuando el componente se monta
    loadPayPalScript();
  }, [totalAmount, user.id, navigate, memoizedProducts]);

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
            <strong>Nombre:</strong> {user.nombre && user.apellido}
          </p>
          <p>
            <strong>Correo electrónico:</strong> {user.correo || "No disponible"}
          </p>
          <p>
            <strong>Dirección:</strong> {user.domicilio || "No disponible"}
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
          <div className="pagoC-row">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="pagoC-row">
            <span>Costo de Envío:</span>
            <span>$1.50</span>
          </div>
          <div className="pagoC-row pagoC-final-total">
            <span>Total:</span>
            <span>${totalAmount}</span>
          </div>
        </div>

        <div id="paypal-button-container"></div>
      </main>

      <footer className="pagoC-app-footer">
        <p>© 2024 Tu Despensa. Todos los derechos reservados.</p>
        <p>Contacto: info@tudespensa.com</p>
      </footer>
    </div>
  );
};

export default PaymentConfirmation;
