import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import fondo from "../imagenes/fondo212.jpg";
import logo from "../imagenes/asdlogo.png";
import Modal from "../Modal/modal"; 
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
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!regexNombre.test(nombre)) {
      setModalMessage("El nombre solo debe contener letras y espacios.");
      return;
    }

    if (!regexNombre.test(apellido)) {
      setModalMessage("El apellido solo debe contener letras y espacios.");
      return;
    }

    const regexCorreo = /^[a-zA-Z0-9._%+-]+@(gmail|hotmail|yahoo|outlook|live|icloud)\.com$/;
    if (!regexCorreo.test(correo)) {
      setModalMessage("Por favor, ingresa un correo válido.");
      return;
    }

    const regexContraseña = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!regexContraseña.test(contraseña)) {
      setModalMessage("La contraseña debe tener al menos 8 caracteres e incluir un carácter especial.");
      return;
    }

    if (contraseña !== confirmarContraseña) {
      setModalMessage("Las contraseñas no coinciden.");
      return;
    }

    const regexCiudad = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!regexCiudad.test(direccion.ciudad)) {
      setModalMessage("La ciudad solo debe contener letras y espacios.");
      return;
    }

    const regexDescripcion = /^[a-zA-Z0-9\s-]+$/;
    if (!regexDescripcion.test(direccion.descripcion)) {
      setModalMessage("La descripción de la dirección solo puede contener letras, números y el símbolo '-'");
      return;
    }

    const regexReferencia = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!regexReferencia.test(direccion.referencia)) {
      setModalMessage("La referencia solo debe contener letras y espacios.");
      return;
    }

    if (!direccion.descripcion || !direccion.referencia) {
      setModalMessage("Por favor, completa todos los campos de dirección.");
      return;
    }

    // Crear el objeto cliente
    const cliente = {
      nombre,
      apellido,
      email: correo,
      contrasenia: contraseña,
      rol: "cliente", // Asignar un rol predeterminado
      domicilio: {
        ciudad: direccion.ciudad,
        direccion: direccion.descripcion,
        referencia: direccion.referencia,
      },
      carrito: [], // Inicialmente vacío
    };

    try {
      // Solicitud al backend
      const response = await fetch("http://localhost:4000/api/clientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cliente),
      });

      const data = await response.json();

      if (response.ok) {
        setModalMessage("¡Registro exitoso!");
        setTimeout(() => navigate("/login"), 2000); // Redirigir al login después de 2 segundos
      } else {
        setModalMessage(data.mensaje || "Error al registrar el cliente");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setModalMessage("Hubo un problema al conectar con el servidor");
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
                type="text"
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

export default Registro1;
