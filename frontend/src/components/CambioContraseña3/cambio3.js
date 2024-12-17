import React, { useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import fondo from "../imagenes/fondo212.jpg";
import "./cambio3.css";
import logo from "../imagenes/asdlogo.png";
import Modal from "../Modal/modal"; 

function CambioContrasena3() {
  const [contraseña, setContraseña] = useState("");
  const [confirmarContraseña, setConfirmarContraseña] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  // Recuperamos el email desde el estado de la navegación
  const email = location.state?.email || "";

  const regexContraseña = /^(?=.[a-zA-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%*?&]{8,}$/;

  useEffect(() => {
    const handlePopState = () => {
      navigate("/cambio"); 
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!regexContraseña.test(contraseña)) {
      setModalMessage(
        "La contraseña debe tener al menos 8 caracteres e incluir un carácter especial."
      );
      return;
    }

    if (contraseña !== confirmarContraseña) {
      setModalMessage("Las contraseñas no coinciden. Por favor, verifícalas.");
      return;
    }

    try {
      // Enviar solo la nueva contraseña al backend
      const response = await fetch("http://localhost:4000/api/clientes/cambio3", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, contrasenia: contraseña }),  // Cambiado a 'contrasenia'
      });

      const data = await response.json();

      if (response.ok) {
        setModalMessage("¡Contraseña cambiada exitosamente!");
      } else {
        setModalMessage(data.message || "Error al cambiar la contraseña.");
      }
    } catch (error) {
      setModalMessage("Hubo un problema con el servidor. Inténtalo más tarde.");
    }  
  };

  const closeModal = () => {
    if (modalMessage === "¡Contraseña cambiada exitosamente!") {
      navigate("/login"); 
    }
    setModalMessage(""); 
  };

  const handleBack = () => {
    navigate("/cambio"); 
  };

  return (
    <div
      className="cambio3-change-password-container"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      {}
      <header className="cambio3-app-header">
        <div className="cambio3-logo">
          <img src={logo} alt="Tu Despensa Logo" className="cambio3-logo-img" />
          <div className="cambio3-name">TU DESPENSA 🛒</div>
        </div>
      </header>

      {}
      <div className="cambio3-back-button-container">
        <button
          type="button"
          onClick={handleBack}
          className="cambio3-back-button"
        >
          Volver
        </button>
      </div>

      {}
      <main className="cambio3-change-password-main">
        <div className="cambio3-change-password-box">
          <h2 className="cambio3-change-password-title">Ingrese su nueva contraseña</h2>
          <form onSubmit={handleSubmit}>
            <div className="cambio3-input-group">
              <label htmlFor="contraseña" className="cambio3-input-label">
                Contraseña:
              </label>
              <input
                type="password"
                id="contraseña"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                placeholder="Ingresa tu contraseña"
                className="cambio3-input-field"
                required
              />
            </div>
            <div className="cambio3-input-group">
              <label htmlFor="confirmarContraseña" className="cambio3-input-label">
                Confirmar contraseña:
              </label>
              <input
                type="password"
                id="confirmarContraseña"
                value={confirmarContraseña}
                onChange={(e) => setConfirmarContraseña(e.target.value)}
                placeholder="Ingresa tu contraseña"
                className="cambio3-input-field"
                required
              />
            </div>
            <button type="submit" className="cambio3-change-password-button">
              Confirmar
            </button>
          </form>
        </div>
      </main>

      {}
      <footer className="cambio3-app-footer">
        <p>© 2024 TuDespensa. Todos los derechos reservados.</p>
        <p>Contacto: info@tudespensa.com</p>
      </footer>

      {}
      {modalMessage && <Modal message={modalMessage} onClose={closeModal} />}
    </div>
  );
}

export default CambioContrasena3;