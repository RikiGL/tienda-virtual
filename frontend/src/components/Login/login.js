import React from "react";
import { useNavigate } from "react-router-dom";
import fondo from "../imagenes/fondo212.jpg";
import logo from '../imagenes/asdlogo.png';
import "./login.css";

function Login() {
  const navigate = useNavigate();

  return (
    <div>
      {}
      <header className="app-header">
        <div className="logo">
          <img src={logo} alt="Tu Despensa Logo" className="logo-img" />
          <div className="name">TU DESPENSA 🛒</div>
        </div>
      </header>

      {}
      <div className="login-container" style={{ backgroundImage: `url(${fondo})` }}>
        <button
          className="back-button"
          title="Volver"
          onClick={() => navigate("/principal")} 
        >
          ← Volver
        </button>
        <div className="login-box">
          <h2 className="login-title">Login</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault(); 
              navigate("/principal"); 
            }}
          >
            <div className="input-group">
              <label htmlFor="email" className="input-label">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                placeholder="Ingresa tu correo electrónico"
                className="input-field"
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password" className="input-label">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                placeholder="Ingresa tu contraseña"
                className="input-field"
                required
              />
            </div>
            <div className="forgot-password">
              <button
                type="button"
                onClick={() => navigate("/cambio")}
                className="forgot-password-link"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
            <button
              type="submit"
              className="login-button"
            >
              Iniciar Sesión
            </button>
            <div className="register-container">
              <span className="register-text">¿No tienes una cuenta?</span>{" "}
              <button
                type="button"
                onClick={() => navigate("/registro1")}
                className="register-link"
              >
                Regístrate
              </button>
            </div>
          </form>
        </div>
      </div>

      {}
      <footer className="app-footer">
        <p>© 2024 Tu Despensa. Todos los derechos reservados.</p>
        <p>Contacto: info@tudespensa.com</p>
      </footer>
    </div>
  );
}

export default Login;
