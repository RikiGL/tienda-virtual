import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import fondo from "../imagenes/fondo212.jpg";
import logo from "../imagenes/asdlogo.png";
import Modal from "../Modal/modal"; 
import "./login.css";
import google from "../imagenes/googleI-.png";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState("");

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@(gmail|hotmail|yahoo|outlook|live|icloud)\.com$/;
    return regex.test(email);
  };

  
  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token); 
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

    if (!recaptchaToken) {
      setModalMessage("Por favor, completa el reCAPTCHA.");
      return;
    }

    try {
      // Enviar el token al backend para validación
      const response = await fetch("http://localhost:4000/api/clientes/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, contrasenia: password, captcha: recaptchaToken }),
      });

      if (response.ok) {
        const data = await response.json();
        // Guardar el nombre del usuario
        localStorage.setItem("usuarioNombre", data.usuario.nombre);
        navigate("/principal");
      } else {
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
      <header className="login-header">
        <div className="login-logo">
          <img src={logo} alt="Tu Despensa Logo" className="login-logo-img" />
          <div className="login-name">TU DESPENSA 🛒</div>
        </div>
      </header>

      <div className="login-container" style={{ backgroundImage: `url(${fondo})` }}>
        <button
          className="login-back-button"
          title="Volver"
          onClick={() => navigate("/principal")}
        >
          ← Volver
        </button>
        <div className="login-box">
          <h2 className="login-title">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="login-input-group">
              <label htmlFor="email" className="login-input-label">
                Correo Electrónico
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu correo electrónico"
                className="login-input-field"
              />
            </div>
            <div className="login-input-group">
              <label htmlFor="password" className="login-input-label">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                className="login-input-field"
              />
            </div>
            {errorMessage && <p className="login-error-message">{errorMessage}</p>}

            <div className="login-forgot-password">
              <button
                type="button"
                onClick={() => navigate("/cambio")}
                className="login-forgot-password-link"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
           
           
            <div className="login-captcha-container">
              <ReCAPTCHA
                sitekey="6Lf_BZsqAAAAADM6ft64QtrZJ-jpqaDPbrfrQh4m" 
                onChange={handleRecaptchaChange}
              />
            </div>
            
            <button type="submit" className="login-button">
              Iniciar Sesión
            </button>
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="login-google-button"
            >
              <img src={google} alt="Logo de Google" className="login-google-img" />
              Google
            </button>
            <div className="login-register-container">
              <span className="login-register-text">¿No tienes una cuenta?</span>{" "}
              <button
                type="button"
                onClick={() => navigate("/registro1")}
                className="login-register-link"
              >
                Regístrate
              </button>
            </div>
          </form>
        </div>
      </div>

      <footer className="login-footer">
        <p>© 2024 TuDespensa. Todos los derechos reservados.</p>
        <p>Contacto: info@tudespensa.com</p>
      </footer>

      {modalMessage && <Modal message={modalMessage} onClose={closeModal} />}
    </div>
  );
}

export default Login;
