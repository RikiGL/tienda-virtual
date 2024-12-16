import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fondo from "../imagenes/fondo212.jpg";
import "./cambio3.css";
import logo from "../imagenes/asdlogo.png";
import Modal from "../Modal/modal"; 

function CambioContrasena3() {
  const [contraseña, setContraseña] = useState("");
  const [confirmarContraseña, setConfirmarContraseña] = useState("");
  const [modalMessage, setModalMessage] = useState(""); 
  const navigate = useNavigate();


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

  const handleSubmit = (e) => {
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

    setModalMessage("¡Contraseña cambiada exitosamente!");
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
      className="change-password-container"
      style={{ backgroundImage: 'url(${fondo})' }}
    >
      {}
      <header className="app-header">
        <div className="logo">
          <img src={logo} alt="Tu Despensa Logo" className="logo-img" />
          <div className="name">TU DESPENSA 🛒</div>
        </div>
      </header>

      {}
      <div className="back-button-container">
        <button
          type="button"
          onClick={handleBack}
          className="back-button"
        >
          Volver
        </button>
      </div>

      {}
      <main className="change-password-main">
        <div className="change-password-box">
          <h2 className="change-password-title">Ingrese su nueva contraseña</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="contraseña" className="input-label">
                Contraseña:
              </label>
              <input
                type="password"
                id="contraseña"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                placeholder="Ingresa tu contraseña"
                className="input-field"
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="confirmarContraseña" className="input-label">
                Confirmar contraseña:
              </label>
              <input
                type="password"
                id="confirmarContraseña"
                value={confirmarContraseña}
                onChange={(e) => setConfirmarContraseña(e.target.value)}
                placeholder="Ingresa tu contraseña"
                className="input-field"
                required
              />
            </div>
            <button type="submit" className="change-password-button">
              Confirmar
            </button>
          </form>
        </div>
      </main>

      {}
      <footer className="app-footer">
        <p>© 2024 TuDespensa. Todos los derechos reservados.</p>
        <p>Contacto: info@tudespensa.com</p>
      </footer>

      {}
      {modalMessage && <Modal message={modalMessage} onClose={closeModal} />}
    </div>
  );
}

export default CambioContrasena3;
