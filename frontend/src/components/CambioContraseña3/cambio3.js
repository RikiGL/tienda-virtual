import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import fondo from "../imagenes/fondo212.jpg";
import "./cambio3.css";
import logo from "../imagenes/asdlogo.png";

function CambioContrasena3() {
  const [contraseña, setContraseña] = useState("");
  const [confirmarContraseña, setConfirmarContraseña] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (contraseña !== confirmarContraseña) {
      alert("Las contraseñas no coinciden. Por favor, verifícalas.");
      return;
    }

    alert("¡Contraseña cambiada exitosamente!");
    navigate("/login"); 
  };

  const handleBack = () => {
    navigate(-1); 
  };

  return (
    <div
      className="change-password-container"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      {/* Header */}
      <header className="app-header">
        <div className="logo">
          <img src={logo} alt="Tu Despensa Logo" className="logo-img" />
          <div className="name">TU DESPENSA 🛒</div>
        </div>
      </header>

      {/* Botón Volver */}
      <div className="back-button-container">
        <button
          type="button"
          onClick={handleBack}
          className="back-button"
        >
          Volver
        </button>
      </div>

      {/* Formulario */}
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

      {/* Footer */}
      <footer className="app-footer">
        <p>© 2024 Tudespensa. Todos los derechos reservados.</p>
        <p>Contacto: info@tudespensa.com</p>
      </footer>
    </div>
  );
}

export default CambioContrasena3;
