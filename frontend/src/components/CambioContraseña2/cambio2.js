import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import fondo from "../imagenes/fondo212.jpg";
import "./cambio2.css";
import logo from "../imagenes/asdlogo.png";
import Modal from "../Modal/modal";

function CambioCodigo() {
  const [codigo, setCodigo] = useState(""); // Estado para el código ingresado
  const [modalMessage, setModalMessage] = useState(""); // Estado para mensajes en el modal
  const [email] = useState(localStorage.getItem("email") || ""); // Obtener el correo desde localStorage
  const navigate = useNavigate();

  // Manejar la solicitud de verificación
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (codigo.length !== 6) {
      setModalMessage("El código debe contener exactamente 6 caracteres.");
      return;
    }

    try {
      // Petición al backend usando fetch
      const response = await fetch("http://localhost:4000/api/codigo/verify-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, code: codigo }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al verificar el código.");
      }

      // Mostrar mensaje de éxito
      setModalMessage(data.message || "Código verificado correctamente.");
    } catch (error) {
      // Capturar errores y mostrar el mensaje en el modal
      setModalMessage(error.message || "Error al verificar el código.");
    }
  };

  // Navegación al cerrar el modal
  const closeModal = () => {
    if (modalMessage.includes("correctamente")) {
      navigate("/cambio3"); // Navegar a cambioContraseña3 si el código es correcto
    }
    setModalMessage("");
  };

  // Volver a la página anterior
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div
      className="change-code-container"
      style={{ backgroundImage: 'url(${fondo})' }}
    >
      {/* Encabezado */}
      <header className="app-header">
        <div className="logo">
          <img src={logo} alt="Tu Despensa Logo" className="logo-img" />
          <div className="name">TU DESPENSA 🛒</div>
        </div>
      </header>

      {/* Botón para volver */}
      <div className="back-button-container">
        <button
          type="button"
          onClick={handleBack}
          className="back-button"
        >
          Volver
        </button>
      </div>

      {/* Contenido principal */}
      <main className="change-code-main">
        <div className="change-code-box">
          <h2 className="change-code-title">Ingrese el código de verificación</h2>
          <p className="verification-instruction">
            Ingrese el código de verificación que ha sido enviado a su correo electrónico
          </p>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                id="codigo"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                placeholder="XXXXXX"
                className="input-field verification-code-input"
                maxLength={6}
                required
              />
            </div>
            <button type="submit" className="change-code-button">
              Enviar
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
      {modalMessage && <Modal message={modalMessage} onClose={closeModal} />}
    </div>
  );
}

export default CambioCodigo;
