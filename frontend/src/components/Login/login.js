import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import fondo from "../imagenes/fondo212.jpg";
import logo from '../imagenes/asdlogo.png';

import Modal from "../Modal/modal"; 
import "./login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@(gmail|hotmail|yahoo|outlook|live|icloud)\.com$/;
    return regex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validación de campos
    if (!email.trim()) {
      setModalMessage("Por favor, ingresa un correo electrónico.");
      return;
    }

    if (!password.trim()) {
      setModalMessage("Por favor, ingresa una contraseña.");
      return;
    }

    if (!validateEmail(email)) {
      setModalMessage("Por favor, ingresa un correo válido.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/clientes/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, contrasenia: password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Guarda el nombre del usuario en el almacenamiento local o en un estado global
        localStorage.setItem("usuarioNombre", data.usuario.nombre);
        navigate("/principal");
      }  else {
        const errorData = await response.json();
        setErrorMessage(errorData.mensaje || "Error al iniciar sesión");
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      setErrorMessage("Error de conexión con el servidor");
    }
  };

  const closeModal = () => {
    setModalMessage("");
  };

  return (
    <div>
      <header className="app-header">
        <div className="logo">
          <img src={logo} alt="Tu Despensa Logo" className="logo-img" />
          <div className="name">TU DESPENSA 🛒</div>
        </div>
      </header>

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
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label htmlFor="email" className="input-label">
                Correo Electrónico
              </label>
              <input
                type="text" 
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu correo electrónico"
                className="input-field"
              />
            </div>
            <div className="input-group">
              <label htmlFor="password" className="input-label">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                className="input-field"
              />
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="forgot-password">
              <button
                type="button"
                onClick={() => navigate("/cambio")}
                className="forgot-password-link"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
            <button type="submit" className="login-button">
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

      <footer className="app-footer">
        <p>© 2024 TuDespensa. Todos los derechos reservados.</p>
        <p>Contacto: info@tudespensa.com</p>
      </footer>

      {modalMessage && <Modal message={modalMessage} onClose={closeModal} />}
    </div>
  );
}

export default Login;
