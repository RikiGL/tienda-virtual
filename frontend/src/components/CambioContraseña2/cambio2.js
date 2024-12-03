import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import fondo from "../imagenes/fondo212.jpg";
import "./cambio2.css";
import logo from "../imagenes/asdlogo.png";

function CambioCodigo() {
  const [codigo, setCodigo] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (codigo.length !== 6) {
      alert("El código debe contener exactamente 6 caracteres.");
      return;
    }
    alert(`Código ingresado correctamente: ${codigo}`);
    navigate("/cambio3"); 
  };

  const handleBack = () => {
    navigate(-1); // Regresa a la página anterior
  };

  return (
    <div
      className="change-code-container"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <header className="app-header">
        <div className="logo">
          <img src={logo} alt="Tu Despensa Logo" className="logo-img" />
          <div className="name">TU DESPENSA 🛒</div>
        </div>
      </header>

      <div className="back-button-container">
        <button
          type="button"
          onClick={handleBack}
          className="back-button"
        >
          Volver
        </button>
      </div>

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

      <footer className="app-footer">
        <p>© 2024 Tudespensa. Todos los derechos reservados.</p>
        <p>Contacto: info@tudespensa.com</p>
      </footer>
    </div>
  );
}

export default CambioCodigo;
