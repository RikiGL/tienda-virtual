import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import fondo from "../imagenes/fondo212.jpg";
import logo from "../imagenes/asdlogo.png";
import Modal from "../Modal/modal"; 
import "./login.css";
//import google from "../imagenes/googleI-.png";
import { GoogleLogin } from "@react-oauth/google";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const recaptchaRef = useRef(null); // Crear una referencia para el reCAPTCHA

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
      recaptchaRef.current?.reset(); // Reiniciar el reCAPTCHA
      return;
    }

    if (!password.trim()) {
      setModalMessage("Por favor, ingresa una contraseña.");
      recaptchaRef.current?.reset(); // Reiniciar el reCAPTCHA
      return;
    }

    if (!validateEmail(email)) {
      setModalMessage("Por favor, ingresa un correo válido.");
      recaptchaRef.current?.reset(); // Reiniciar el reCAPTCHA
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
        localStorage.setItem("usuarioNombre", data.usuario.nombre);
        localStorage.setItem("usuarioApellido", data.usuario.apellido);
        localStorage.setItem("usuarioEmail", data.usuario.email);
        localStorage.setItem("userRole", data.usuario.rol); // Almacenar el rol
        localStorage.setItem("isLoggedIn", "true"); // Confirmar que está autenticado
      
        // Redirigir según el rol
        if (data.usuario.rol === "admin") {
          navigate("/admin");
        } else {
          navigate("/principal");
        }
      }
       else {
        const errorData = await response.json();
        setErrorMessage(errorData.mensaje || "Error al iniciar sesión");
        recaptchaRef.current?.reset(); // Reiniciar el reCAPTCHA si hay un error
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      setErrorMessage("Error de conexión con el servidor");
      recaptchaRef.current?.reset(); // Reiniciar el reCAPTCHA en caso de error
    }
  };

  const closeModal = () => {
    setModalMessage("");
  };


  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential; // Accediendo al token
      const response = await fetch("http://localhost:4000/api/auth/google-reg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }), // Enviando solo el token al backend
      });
  
      const data = await response.json();

      if (response.status === 302) {
        setModalMessage("¡Dirección y token enviados exitosamente!");
        console.log("Respuesta del backend:", data);
        // Guardar el nombre del usuario
        localStorage.setItem("usuarioNombre", data.clienteExistente.nombre);
        navigate("/principal");

      } else {
        console.error("Error en la solicitud:", data.message);
        setModalMessage(data.message || "Error al enviar los datos al servidor.");
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      setModalMessage("Hubo un problema al enviar los datos.");
    }
}


  return (
    <div>
      <header className="login-header">
        <div className="login-logo">
          <img src={logo} alt="Tu Despensa Logo" className="login-logo-img" />
          <div className="login-name">TU DESPENSA 🛒</div>
        </div>
      </header>

      <div
        className="login-container"
        style={{ backgroundImage: `url(${fondo})` }}
      >
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
            {errorMessage && (
              <p className="login-error-message">{errorMessage}</p>
            )}

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
                ref={recaptchaRef} 
              />
            </div>

            <button type="submit" className="login-button">
              Iniciar Sesión
            </button>

            <GoogleLogin
            buttonText="Iniciar sesión con Google"
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse); // Token recibido de Google
                // Aquí puedes enviar el token a tu backend para validarlo
                const token = credentialResponse.credential;
                handleGoogleLogin(credentialResponse)
                 
              }}
              onError={() => {
                console.log("Error al iniciar sesión con Google");
              }}
            />

            <div className="login-register-container">
              <span className="login-register-text">
                ¿No tienes una cuenta?
              </span>{" "}
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
