import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fondo from "../imagenes/fondo212.jpg";
import "./cambio.css";
import logo from "../imagenes/asdlogo.png";
import Modal from "../Modal/modal";

function CambioContrasena() {
  const [email, setEmail] = useState(""); // Estado para el correo electrónico
  const [mostrarModal, setMostrarModal] = useState(false); // Estado para mostrar el modal
  const [modalMessage, setModalMessage] = useState(""); // Estado para mensajes en el modal
  const navigate = useNavigate();

  // Regex para validar dominios permitidos de correo
  const regexCorreo = /^[a-zA-Z0-9._%+-]+@(gmail|hotmail|yahoo|outlook|live|icloud)\.com$/;

  // Manejar el comportamiento del botón "Atrás"
  useEffect(() => {
    const handlePopState = () => {
      navigate("/login");
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

  // Función para cerrar el modal
  const handleModalClose = () => {
    setMostrarModal(false);
    if (modalMessage.includes("enlace de recuperación")) {
      localStorage.setItem("email", email); // Almacenar correo para la siguiente pantalla
      navigate("/cambio2"); // Navegar a la siguiente pantalla
    }
  };

  // Función para el botón "Volver"
  const handleBack = () => {
    navigate("/login");
  };

  // Función para enviar la solicitud al backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones del correo electrónico
    if (!email) {
      setModalMessage("Por favor, ingresa tu correo electrónico.");
      setMostrarModal(true);
      return;
    }

    if (!regexCorreo.test(email)) {
      setModalMessage("El correo electrónico no es válido. Usa dominios permitidos como Gmail, Hotmail, Yahoo, etc.");
      setMostrarModal(true);
      return;
    }

    try {
      // Petición al servidor usando fetch
      const response = await fetch("http://localhost:4000/api/codigo/sendSecurityCode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        // Mostrar mensaje de éxito si todo sale bien
        setModalMessage("Se ha enviado un enlace de recuperación a tu correo.");
        setMostrarModal(true);
      } else {
        // Mostrar mensaje de error si hay un problema en el servidor
        setModalMessage(data.message || "Ocurrió un error al enviar el enlace.");
        setMostrarModal(true);
      }
    } catch (error) {
      // Capturar errores de conexión
      setModalMessage("Error de conexión con el servidor. Inténtalo de nuevo más tarde.");
      setMostrarModal(true);
    }
  };

  return (
    <div
      className="change-password-container"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <header className="app-header">
        <div className="logo">
          <img src={logo} alt="Tu Despensa Logo" className="logo-img" />
          <div className="name">TU DESPENSA 🛒</div>
        </div>
      </header>

      {/* Botón Volver */}
      <div className="back-button-container">
        <button type="button" onClick={handleBack} className="back-button">
          Volver
        </button>
      </div>

      {/* Contenido principal */}
      <main className="change-password-main">
        <div className="change-password-box">
          <h2 className="change-password-title">Cambio de contraseña</h2>
          <p className="verification-instruction">
            Ingresa tu correo electrónico para enviarte un código de recuperación.
          </p>
          <form onSubmit={handleSubmit} noValidate>
            <div className="input-group">
              <label htmlFor="email" className="input-label">
                Correo Electrónico:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu correo electrónico"
                className="input-field"
                required
              />
            </div>
            <button type="submit" className="change-password-button">
              Enviar mensaje
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>© 2024 TuDespensa. Todos los derechos reservados.</p>
        <p>Contacto: info@tudespensa.com</p>
      </footer>

      {/* Modal */}
      {mostrarModal && (
        <Modal
          message={modalMessage}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}

export default CambioContrasena;
