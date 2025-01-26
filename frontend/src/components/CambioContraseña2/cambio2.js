import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
//import { useNavigate } from "react-router-dom";
import fondo from "../imagenes/fondo212.jpg";
import "./cambio2.css";
import logo from "../imagenes/asdlogo.png";
import Modal from "../Modal/modal";

function CambioCodigo() {
  const [codigo, setCodigo] = useState(""); 
  const [mostrarModal, setMostrarModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [intentosRestantes, setIntentosRestantes] = useState(3); // Intentos permitidos
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const inputRef = useRef(null);

  useEffect(() => {
    if (!email) {
      navigate("/cambio");
    }
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const codigoTrimmed = codigo.trim();

    if (codigoTrimmed.length !== 6) {
      setModalMessage("El código debe contener exactamente 6 caracteres.");
      setMostrarModal(true);
      return;
    }

    setIsSubmitting(true);
    setModalMessage(null); // Ocultar mensajes previos

    try {
      console.log("Código enviado:", codigoTrimmed);
      console.log("Email enviado:", email);
      
      const response = await fetch(`${process.env.REACT_APP_API_URL}auth/cambio2`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: codigoTrimmed }), 
      });
  
      const data = await response.json();
      if (response.ok) {
        setModalMessage("Código verificado correctamente.");
        setMostrarModal(true);
      } else {
        setModalMessage(data.error || "Código incorrecto.");
        setMostrarModal(true);
      }
    } catch (error) {
      setModalMessage("Hubo un problema con el servidor.");
      setMostrarModal(true);
      setCodigo(""); // Reiniciar campo del código
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setMostrarModal(false); // Ocultar el modal
    setCodigo(""); // Reiniciar el valor del input
  
    // Forzar enfoque en el input si aún existe en el DOM
    if (inputRef.current) {
      inputRef.current.focus();
    }
  
    // Navegación si el código es correcto
    if (modalMessage.includes("correctamente")) {
      navigate("/cambio3", { state: { email } });
    } else if (modalMessage.includes("incorrecto")) {
      const nuevosIntentos = intentosRestantes - 1;
      setIntentosRestantes(nuevosIntentos);
  
      if (nuevosIntentos <= 0) {
        navigate("/login");
      }
    }
  };
  

  const handleBack = () => {
    navigate("/cambio"); 
  };

  return (
    <div
      className="cambio2-change-code-container"
     
    >
   <header className="principal-app-header">
        <div className="principal-logo">
          <img src={logo} alt="Tu Despensa Logo" className="principal-logo-img" />
          <div className="principal-name-asd">TU DESPENSA 🛒</div>
        </div>
      </header>
  
      <div className="cambio2-back-button-container">
        <button
          type="button"
          onClick={handleBack}
          className="cambio2-back-button"
        >
          ← Volver
        </button>
      </div>
  
      <main className="cambio2-change-code-main">
        <div className="cambio2-change-code-box">
        <div style={{ textAlign: 'center', marginBottom: '10px' }}>
  <img src="https://img.icons8.com/ios-filled/50/000000/verified-account.png" alt="Verification Icon" />
</div>

          <h2 className="cambio2-change-code-title">Ingrese el código de verificación</h2>
          <p className="cambio2-verification-instruction">
            Ingrese el código de verificación que ha sido enviado a su correo electrónico
          </p>
          <form onSubmit={handleSubmit}>
            <div className="cambio2-input-group">
              <input
                type="text"
                id="codigo"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                placeholder="XXXXXX"
                className="cambio2-input-field cambio2-verification-code-input"
                maxLength={6}
                required
                ref={inputRef} // Referencia al input
              />
            </div>
            <button type="submit" className="cambio2-change-code-button"
              disabled={isSubmitting} // Deshabilita el botón mientras se envía
            >
             {isSubmitting ? "Verificando..." : "Verificar"} {/* Cambiar texto mientras se envía */}
            </button>
          </form>
        </div>
      </main>
  
      <footer className="cambio2-app-footer">
        <p>© 2024 TuDespensa. Todos los derechos reservados.</p>
        <p>Contacto: info@tudespensa.com</p>
      </footer>
  
      {/* Mostrar el modal solo si 'modalMessage' es verdadero */}
      {mostrarModal && <Modal message={modalMessage} onClose={closeModal} />}
    </div>
  );  
} 

export default CambioCodigo;
