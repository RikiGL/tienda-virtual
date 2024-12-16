import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import fondo from "../imagenes/fondo212.jpg";
import "./cambio2.css";
import logo from "../imagenes/asdlogo.png";
import Modal from "../Modal/modal";

function CambioCodigo() {
  const [codigo, setCodigo] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (codigo.length !== 6) {
      setModalMessage("El código debe contener exactamente 6 caracteres.");
      return;
    }

    setModalMessage(`Código ingresado correctamente: ${codigo}`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const closeModal = () => {
    if (modalMessage.includes("correctamente")) {
      navigate("/cambio3");
    }
    setModalMessage("");
  };

  // Volver a la página anterior
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div
      className="cambio2-change-code-container"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <header className="cambio2-app-header">
        <div className="cambio2-logo">
          <img src={logo} alt="Tu Despensa Logo" className="cambio2-logo-img" />
          <div className="cambio2-name">TU DESPENSA 🛒</div>
        </div>
      </header>

      <div className="cambio2-back-button-container">
        <button
          type="button"
          onClick={handleBack}
          className="cambio2-back-button"
        >
          Volver
        </button>
      </div>

      <main className="cambio2-change-code-main">
        <div className="cambio2-change-code-box">
          <h2 className="cambio2-change-code-title">Ingrese el código de verificación</h2>
          <p className="cambio2-verification-instruction">
            Ingrese el código de verificación que ha sido enviado a su correo electrónico
          </p>
          <form onSubmit={handleSubmit}>
            <div className="cambio2-input-group">
              <input
                type="text"
                id="codigo"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                placeholder="XXXXXX"
                className="cambio2-input-field cambio2-verification-code-input"
                maxLength={6}
                required
              />
            </div>
            <button type="submit" className="cambio2-change-code-button">
              Enviar
            </button>
          </form>
        </div>
      </main>

      <footer className="cambio2-app-footer">
        <p>© 2024 TuDespensa. Todos los derechos reservados.</p>
        <p>Contacto: info@tudespensa.com</p>
      </footer>

      {modalMessage && <Modal message={modalMessage} onClose={closeModal} />}
    </div>
  );
}

export default CambioCodigo;
