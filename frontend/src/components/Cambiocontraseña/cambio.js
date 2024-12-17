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
  const [isSubmitting, setIsSubmitting] = useState(false);  // Estado para controlar el clic en el botón
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Evita múltiples envíos
    if (isSubmitting) return;

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

    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:4000/api/auth/cambio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setModalMessage(`Se ha enviado un código de verificación a: ${email}`);
      } else {
        setModalMessage(data.message || "El correo no está registrado.");
      }
    } catch (error) {
      setModalMessage("Hubo un problema con el servidor. Inténtalo más tarde.");
    } finally {
      setMostrarModal(true);
      setIsSubmitting(false);
    }

  };

  const handleModalClose = () => {
    setMostrarModal(false);
    if (modalMessage.includes("código de verificación")) {
      navigate("/cambio2", { state: { email } }); // Pasamos el correo al siguiente paso
    }
  };

  const handleBack = () => {
    navigate("/login"); 
  };

  return (
    <div
      className="cambio1-change-password-container"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <header className="cambio1-app-header">
        <div className="cambio1-logo">
          <img src={logo} alt="Tu Despensa Logo" className="cambio1-logo-img" />
          <div className="cambio1-name">TU DESPENSA 🛒</div>
        </div>
      </header>

      <div className="cambio1-back-button-container">
        <button type="button" onClick={handleBack} className="cambio1-back-button">
          Volver
        </button>
      </div>

      <main className="cambio1-change-password-main">
        <div className="cambio1-change-password-box">
          <h2 className="cambio1-change-password-title">Cambio de contraseña</h2>
          <form onSubmit={handleSubmit} noValidate>
            <div className="cambio1-input-group">
              <label htmlFor="email" className="cambio1-input-label">
                Correo Electrónico:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu correo electrónico"
                className="cambio1-input-field"
              />
            </div>
            <button type="submit" className="cambio1-change-password-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar mensaje"}
            </button>
          </form>
        </div>
      </main>

      <footer className="cambio1-app-footer">
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