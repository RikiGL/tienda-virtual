import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import fondo from "../imagenes/fondo_.png"; 
import "./cambio.css"; 

function CambioContrasena() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Las contraseñas no coinciden. Por favor, verifica.");
      return;
    }

    alert("¡Contraseña actualizada con éxito!");
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
      <div className="change-password-box">
        <h2 className="change-password-title">Cambiar Contraseña</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email" className="input-label">
              Correo Electrónico
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
          <div className="input-group">
            <label htmlFor="new-password" className="input-label">
              Nueva Contraseña
            </label>
            <input
              type="password"
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Ingresa tu nueva contraseña"
              className="input-field"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirm-password" className="input-label">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirma tu nueva contraseña"
              className="input-field"
              required
            />
          </div>
          <button type="submit" className="change-password-button">
            Actualizar Contraseña
          </button>
          <button
            type="button"
            onClick={handleBack}
            className="back-button"
          >
            Volver
          </button>
        </form>
      </div>
    </div>
  );
}

export default CambioContrasena;
