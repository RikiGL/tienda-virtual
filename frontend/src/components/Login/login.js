import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import fondo from "../imagenes/fondo_.png";
import "./login.css";

function Login() {
  const navigate = useNavigate();

  // Estado para los inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Función para manejar el envío del formulario
  const handleLogin = async (e) => {
    e.preventDefault(); // Evitar recargar la página
    try {
      // Solicitud al backend
      const response = await fetch("http://localhost:4000/api/clientes/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, contrasenia: password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Aquí puedes manejar los datos recibidos, por ejemplo, guardar un token en localStorage
        console.log(data);
        navigate("/principal"); // Redirigir al usuario
      } else {
        // Manejo de errores en la respuesta del backend
        const errorData = await response.json();
        setErrorMessage(errorData.mensaje || "Error al iniciar sesión");
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      setErrorMessage("Error de conexión con el servidor");
    }
  };

  return (
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
              type="email"
              id="email"
              placeholder="Ingresa tu correo electrónico"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Actualizar estado
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
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Actualizar estado
              required
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Mostrar errores */}
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
  );
}

export default Login;