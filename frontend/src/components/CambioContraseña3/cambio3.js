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

  const regexContraseña = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

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
        "La contraseña no cumple con los requisitos. Por favor, revisa las indicaciones."
      );
      return;
    }

    if (contraseña !== confirmarContraseña) {
      setModalMessage("Las contraseñas no coinciden. Por favor, verifícalas.");
      return;
    }

    try {
      // Enviar solo la nueva contraseña al backend
      const response = await fetch(`${process.env.REACT_APP_API_URL}clientes/cambio3`, {
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
     
    >
      {}
      <header className="principal-app-header">
        <div className="principal-logo">
          <img src={logo} alt="Tu Despensa Logo" className="principal-logo-img" />
          <div className="principal-name-asd">TU DESPENSA 🛒</div>
        </div>
      </header>

      {}
      <div className="cambio3-back-button-container">
        <button
          type="button"
          onClick={handleBack}
          className="cambio3-back-button"
        >
         ← Volver
        </button>
      </div>

      {}
      <main className="cambio3-change-password-main">
        <div className="cambio3-change-password-box">
        <div style={{ textAlign: 'center', marginBottom: '10px' }}>
  <img
    src="https://img.icons8.com/ios-filled/50/000000/lock--v1.png"
    alt="Password Icon"
    style={{ width: '30px', height: '30px' }}
  />
</div>

          <h2 className="cambio3-change-password-title">Ingrese su nueva contraseña</h2>
          <p className="password-reset-info">
          Cree una contraseña con:
            <ul className="styled-list">
              <li>8 o más caracteres.</li>
              <li>Al menos una letra.</li>
              <li>Un número.</li>
              <li>Un símbolo (@, $, !, %, *, ?, &).</li>
            </ul>
          </p>

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