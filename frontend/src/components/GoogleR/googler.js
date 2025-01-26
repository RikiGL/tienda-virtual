
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import fondo from "../imagenes/fondo212.jpg";
import logo from "../imagenes/asdlogo.png";
import Modal from "../Modal/modal";
import "./googler.css";
import google from '../imagenes/googleI-.png';

function GoogleR() {
  const location = useLocation();
  const token = location.state?.token || localStorage.getItem("googleToken");


  const [direccion, setDireccion] = useState({
    ciudad: "",
    descripcion: "",
    referencia: "",
  });
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    if (!direccion.descripcion) {
      setModalMessage("La descripción de la dirección es obligatoria.");
      return;
    }

    const capitalize = (text) =>
      text
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    const domicilio = {
      ciudad: capitalize(direccion.ciudad),
      direccion: capitalize(direccion.descripcion),
      referencia: direccion.referencia ? capitalize(direccion.referencia) : "",
    };
    if (!token) {
      setModalMessage("No se encontró el token de Google. Por favor, vuelve a iniciar sesión.");
      return;
    }else{
      console.log( token)

      console.log(typeof token)
    }
    // Combina el token con la dirección y envía al backend
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, domicilio }),
      });
  
      const data = await response.json();

      if (response.ok && response.status !== 302) {
        console.log("¡Dirección y token enviados exitosamente!");
        console.log("Respuesta del backend:", data);
        setModalMessage("Registro Exitoso");
        setTimeout(() => navigate("/login"), 800);

      } else {
        console.error("Error en la solicitud:", data.message);
        setModalMessage(data.message || "Error al enviar los datos al servidor.");
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      setModalMessage("Hubo un problema al enviar los datos.");
    }
  };

    
  
  

  const closeModal = () => {
    setModalMessage("");
  };

  return (
    <div>
      <header className="registroGoogle-header">
        <div className="registroGoogle-logo">
          <img src={logo} alt="Tu Despensa Logo" className="registroGoogle-logo-img" />
          <div className="registroGoogle-name">TU DESPENSA 🛒</div>
        </div>
      </header>
      <div className="registroGoogle-container" style={{ backgroundImage: `url(${fondo})` }}>
        <button onClick={() => navigate(-1)} className="registroGoogle-back-button" title="Volver">
          ← Volver
        </button>
        <div className="registroGoogle-box">
          <h2 className="registroGoogle-title">Registro de Dirección</h2>
          <form onSubmit={handleSubmit}>
            <div className="registroGoogle-direccion-container">
              <label className="registroGoogle-form-label">Ciudad</label>
              <input
                type="text"
                value={direccion.ciudad}
                onChange={(e) => setDireccion({ ...direccion, ciudad: e.target.value })}
                placeholder="Ciudad"
                className="registroGoogle-form-input"
              />
              <label className="registroGoogle-form-label">Descripción</label>
              <input
                type="text"
                value={direccion.descripcion}
                onChange={(e) => setDireccion({ ...direccion, descripcion: e.target.value })}
                placeholder="Describe tu dirección"
                className="registroGoogle-form-input"
              />
              <label className="registroGoogle-form-label">Referencia</label>
              <input
                type="text"
                value={direccion.referencia}
                onChange={(e) => setDireccion({ ...direccion, referencia: e.target.value })}
                placeholder="Referencia"
                className="registroGoogle-form-input"
              />
            </div>
            <button type="submit" className="registroGoogle-button" >
              Guardar Dirección
            </button>
          </form>
        </div>
      </div>
      <footer className="registroGoogle-footer">
        <p>© 2024 TuDespensa. Todos los derechos reservados.</p>
        <p>Contacto: info@tudespensa.com</p>
      </footer>

      {modalMessage && <Modal message={modalMessage} onClose={closeModal} />}
    </div>
  );
}


export default GoogleR;
