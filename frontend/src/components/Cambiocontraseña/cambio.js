import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fondo from "../imagenes/fondo212.jpg";
import "./cambio.css";
import logo from "../imagenes/asdlogo.png";
import Modal from "../Modal/modal"; 

function CambioContrasena() {
  const [email, setEmail] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false); 
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  const regexCorreo = /^[a-zA-Z0-9._%+-]+@(gmail|hotmail|yahoo|outlook|live|icloud)\.com$/;

  useEffect(() => {
    const handlePopState = () => {
      navigate("/login"); 
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setModalMessage("Por favor, ingresa tu correo electrónico.");
      setMostrarModal(true); 
      return;
    }

    if (!regexCorreo.test(email)) {
      setModalMessage("El correo electrónico no es válido.");
      setMostrarModal(true); 
      return;
    }

    setModalMessage(`Se ha enviado un enlace de recuperación a: ${email}`);
    setMostrarModal(true); 
  };

  const handleModalClose = () => {
    setMostrarModal(false); 
    if (modalMessage.includes("enlace de recuperación")) {
      navigate("/cambio2"); 
    }
  };

  const handleBack = () => {
    navigate("/login"); 
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

      <div className="back-button-container">
        <button type="button" onClick={handleBack} className="back-button">
          Volver
        </button>
      </div>

      <main className="change-password-main">
        <div className="change-password-box">
          <h2 className="change-password-title">Cambio de contraseña</h2>
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
              />
            </div>
            <button type="submit" className="change-password-button">
              Enviar mensaje
            </button>
          </form>
        </div>
      </main>

      <footer className="app-footer">
        <p>© 2024 TuDespensa. Todos los derechos reservados.</p>
        <p>Contacto: info@tudespensa.com</p>
      </footer>

      {}
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
