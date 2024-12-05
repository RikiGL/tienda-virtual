import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import fondo from "../imagenes/fondo212.jpg";
import logo from "../imagenes/asdlogo.png";
<<<<<<< HEAD
import Modal from "../Modal/modal";
=======
import Modal from "../Modal/modal"; 
>>>>>>> da208fafc648d142ea2254a163594a7d2951a965
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
<<<<<<< HEAD
  const [modalMessage, setModalMessage] = useState("");
=======
  const [modalMessage, setModalMessage] = useState(""); 
>>>>>>> da208fafc648d142ea2254a163594a7d2951a965
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

<<<<<<< HEAD
    // Validaciones previas
=======
    
>>>>>>> da208fafc648d142ea2254a163594a7d2951a965
    const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!regexNombre.test(nombre)) {
      setModalMessage("El nombre solo debe contener letras y espacios.");
      return;
    }

    if (!regexNombre.test(apellido)) {
      setModalMessage("El apellido solo debe contener letras y espacios.");
      return;
    }

<<<<<<< HEAD
=======
    
>>>>>>> da208fafc648d142ea2254a163594a7d2951a965
    const regexCorreo = /^[a-zA-Z0-9._%+-]+@(gmail|hotmail|yahoo|outlook|live|icloud)\.com$/;
    if (!regexCorreo.test(correo)) {
      setModalMessage("Por favor, ingresa un correo válido.");
      return;
    }

<<<<<<< HEAD
=======
    
>>>>>>> da208fafc648d142ea2254a163594a7d2951a965
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

<<<<<<< HEAD
    const regexDescripcion = /^[a-zA-Z0-9\s-]+$/;
    if (!regexDescripcion.test(direccion.descripcion)) {
      setModalMessage("La descripción de la dirección solo puede contener letras, números y el símbolo '-'.");
      return;
    }

    const regexReferencia = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!regexReferencia.test(direccion.referencia)) {
      setModalMessage("La referencia solo debe contener letras y espacios.");
      return;
    }

    // Crear el objeto de datos
    const clienteData = {
      nombre,
      apellido,
      email: correo,
      contrasenia: contraseña,
      rol: "cliente", // Puedes ajustar el rol según tu lógica
      domicilio: {
        ciudad: direccion.ciudad,
        direccion: direccion.descripcion,
        referencia: direccion.referencia,
      },
      carrito: [], // Opcional si no hay información inicial del carrito
    };

    try {
      // Llamada al backend
      const response = await fetch("http://localhost:4000/api/clientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clienteData),
      });

      if (response.ok) {
        const result = await response.json();
        setModalMessage(result.mensaje); // Mostrar mensaje de éxito
        setTimeout(() => navigate("/login"), 2000); // Redirigir al login
      } else {
        const errorData = await response.json();
        setModalMessage(errorData.mensaje || "Error en el registro.");
      }
    } catch (error) {
      setModalMessage("Hubo un error al conectar con el servidor.");
    }
  };

  const closeModal = () => {
    setModalMessage("");
=======
    
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

    
    setModalMessage("¡Registro exitoso!");
    setTimeout(() => navigate("/login"), 2000); 
>>>>>>> da208fafc648d142ea2254a163594a7d2951a965
  };

  const closeModal = () => {
    setModalMessage(""); 
  }

  return (
    <div>
      <header className="app-header">
        <div className="logo">
          <img src={logo} alt="Tu Despensa Logo" className="logo-img" />
          <div className="name">TU DESPENSA 🛒</div>
        </div>
      </header>
<<<<<<< HEAD
      <div
        className="registro-container"
        style={{ backgroundImage: `url(${fondo})` }}
      >
=======
      <div className="registro-container" style={{ backgroundImage: `url(${fondo})` }}>
>>>>>>> da208fafc648d142ea2254a163594a7d2951a965
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
<<<<<<< HEAD
                onChange={(e) =>
                  setDireccion({ ...direccion, ciudad: e.target.value })
                }
=======
                onChange={(e) => setDireccion({ ...direccion, ciudad: e.target.value })}
>>>>>>> da208fafc648d142ea2254a163594a7d2951a965
                placeholder="Ciudad"
                className="form-input"
              />
              <input
                type="text"
                value={direccion.descripcion}
<<<<<<< HEAD
                onChange={(e) =>
                  setDireccion({ ...direccion, descripcion: e.target.value })
                }
=======
                onChange={(e) => setDireccion({ ...direccion, descripcion: e.target.value })}
>>>>>>> da208fafc648d142ea2254a163594a7d2951a965
                placeholder="Describe tu dirección"
                className="form-input"
              />
              <input
                type="text"
                value={direccion.referencia}
<<<<<<< HEAD
                onChange={(e) =>
                  setDireccion({ ...direccion, referencia: e.target.value })
                }
=======
                onChange={(e) => setDireccion({ ...direccion, referencia: e.target.value })}
>>>>>>> da208fafc648d142ea2254a163594a7d2951a965
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

<<<<<<< HEAD
=======
      {}
>>>>>>> da208fafc648d142ea2254a163594a7d2951a965
      {modalMessage && <Modal message={modalMessage} onClose={closeModal} />}
    </div>
  );
}

export default Registro1;
