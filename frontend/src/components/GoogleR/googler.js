import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import fondo from "../imagenes/fondo212.jpg";
import logo from "../imagenes/asdlogo.png";
import Modal from "../Modal/modal"; 

function GoogleR() {
  const [direccion, setDireccion] = useState({
    ciudad: "",
    descripcion: "",
    referencia: "",
  });
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
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

    console.log("Domicilio registrado:", domicilio);
    setModalMessage("¡Dirección registrada exitosamente!");
    setTimeout(() => navigate("/login"), 500);
  
  };

  const closeModal = () => {
    setModalMessage("");
  };

  return (
    <div>
      <header className="headerG">
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
          <h2 className="registro-title">Registro de Dirección</h2>
          <form onSubmit={handleSubmit}>
            <div className="direccion-container">
              <label className="form-label">Ciudad</label>
              <input
                type="text"
                value={direccion.ciudad}
                onChange={(e) => setDireccion({ ...direccion, ciudad: e.target.value })}
                placeholder="Ciudad"
                className="form-input"
              />
              <label className="form-label">Descripción</label>
              <input
                type="text"
                value={direccion.descripcion}
                onChange={(e) => setDireccion({ ...direccion, descripcion: e.target.value })}
                placeholder="Describe tu dirección"
                className="form-input"
              />
              <label className="form-label">Referencia</label>
              <input
                type="text"
                value={direccion.referencia}
                onChange={(e) => setDireccion({ ...direccion, referencia: e.target.value })}
                placeholder="Referencia"
                className="form-input"
              />
            </div>
            <button type="submit" className="registro-button" >
              Guardar Dirección
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

export default GoogleR;