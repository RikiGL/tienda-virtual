import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import fondo from "../imagenes/fondo212.jpg";
import logo from "../imagenes/asdlogo.png";
import "./registro1.css";

function Registro1() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [confirmarContraseña, setConfirmarContraseña] = useState("");
  const [direccion, setDireccion] = useState({
    ciudad: "",
    descripcion: "",
    referencia: "",
  });
  const [mensaje, setMensaje] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!regexNombre.test(nombre)) {
      setMensaje("El nombre solo debe contener letras y espacios.");
      return;
    }

    if (!regexNombre.test(apellido)) {
      setMensaje("El apellido solo debe contener letras y espacios.");
      return;
    }

    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(correo)) {
      setMensaje("Por favor, ingresa un correo válido.");
      return;
    }

    if (contraseña.length < 6) {
      setMensaje("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (contraseña !== confirmarContraseña) {
      setMensaje("Las contraseñas no coinciden.");
      return;
    }

    const regexCiudad = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!regexCiudad.test(direccion.ciudad)) {
      setMensaje("La ciudad solo debe contener letras y espacios.");
      return;
    }

    if (!direccion.descripcion || !direccion.referencia) {
      setMensaje("Por favor, completa todos los campos de dirección.");
      return;
    }

    const rol = "cliente";

    setMensaje("¡Registro exitoso!");
    navigate("/login");
  };

  return (
    <div>
      <header className="app-header">
        <div className="logo">
          <img src={logo} alt="Tu Despensa Logo" className="logo-img" />
          <div className="name">TU DESPENSA 🛒</div>
        </div>
      </header>
      <div className="registro-container" style={{ backgroundImage: `url(${fondo})` }}>
        <button onClick={() => navigate(-1)} className="back-button" title="Volver">
          ← Volver
        </button>
        <div className="registro-box">
          <h2 className="registro-title">Registro</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div>
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ingresa tu nombre"
                  className="form-input"
                />
              </div>
              <div>
                <label className="form-label">Apellido</label>
                <input
                  type="text"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  placeholder="Ingresa tu apellido"
                  className="form-input"
                />
              </div>
            </div>
            <div>
              <label className="form-label">Correo</label>
              <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="Ingresa tu correo"
                className="form-input"
              />
            </div>
            <div className="form-grid">
              <div>
                <label className="form-label">Contraseña</label>
                <input
                  type="password"
                  value={contraseña}
                  onChange={(e) => setContraseña(e.target.value)}
                  placeholder="Crea tu contraseña"
                  className="form-input"
                />
              </div>
              <div>
                <label className="form-label">Confirmar Contraseña</label>
                <input
                  type="password"
                  value={confirmarContraseña}
                  onChange={(e) => setConfirmarContraseña(e.target.value)}
                  placeholder="Confirma tu contraseña"
                  className="form-input"
                />
              </div>
            </div>
            <div className="direccion-container">
              <label className="form-label">Dirección</label>
              <input
                type="text"
                value={direccion.ciudad}
                onChange={(e) => setDireccion({ ...direccion, ciudad: e.target.value })}
                placeholder="Ciudad"
                className="form-input"
              />
              <input
                type="text"
                value={direccion.descripcion}
                onChange={(e) => setDireccion({ ...direccion, descripcion: e.target.value })}
                placeholder="Describe tu dirección"
                className="form-input"
              />
              <input
                type="text"
                value={direccion.referencia}
                onChange={(e) => setDireccion({ ...direccion, referencia: e.target.value })}
                placeholder="Referencia"
                className="form-input"
              />
            </div>
            <button type="submit" className="registro-button">
              Registrarse
            </button>
          </form>
          {mensaje && (
            <p className={`mensaje ${mensaje.includes("exitoso") ? "success" : "error"}`}>
              {mensaje}
            </p>
          )}
        </div>
      </div>
      <footer className="app-footer">
        <p>© 2024 Tu Despensa. Todos los derechos reservados.</p>
        <p>Contacto: info@tudespensa.com</p>
      </footer>
    </div>
  );
}

export default Registro1;
