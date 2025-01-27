import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./CambioDireccion.css";
import logo from "../imagenes/asdlogo.png";
import { FaCheckCircle } from "react-icons/fa";

const CambioDireccion = () => {
  const [newAddress, setNewAddress] = useState({
    ciudad: "",
    referencia: "",
    direccion: "",
  });

  const navigate = useNavigate();
  const [notificationMessage, setNotificationMessage] = useState("");
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);

  const mapRef = useRef(null); // Referencia para el mapa
  const markerRef = useRef(null); // Referencia para el marcador

  useEffect(() => {
    // Cargar el script de Google Maps si aún no existe
    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBsxggWrFntrds_WhqN35lhdBCRxYjAnfE&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initializeMap;
      document.body.appendChild(script);
    } else {
      initializeMap(); // Si ya está cargado, inicializa el mapa
    }
  }, []); // Solo se ejecuta una vez al montar el componente

  const initializeMap = () => {
    const center = { lat: -0.19025811234117668, lng: -78.48772768960126 };

    // Inicializar el mapa
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center,
      zoom: 15,
    });
    mapRef.current = map; // Guardar referencia al mapa

    // Crear un marcador inicial
    const marker = new window.google.maps.Marker({
      position: center,
      map,
      title: "Ubicación seleccionada",
      draggable: true,
    });
    markerRef.current = marker; // Guardar referencia al marcador

    // Configurar eventos en el mapa
    const geocoder = new window.google.maps.Geocoder();
    map.addListener("click", (event) => {
      const latLng = event.latLng;
      marker.setPosition(latLng);
      geocoder.geocode({ location: latLng }, (results, status) => {
        if (status === "OK" && results[0]) {
          const address = results[0];
          let city = "";
          let fullAddress = address.formatted_address;

          // Extraer ciudad de los componentes de la dirección
          address.address_components.forEach((component) => {
            if (component.types.includes("locality")) {
              city = component.long_name;
            }
          });

          // Actualizar el estado con la nueva dirección
          setNewAddress((prevState) => ({
            ...prevState,
            ciudad: city || "No disponible",
            direccion: fullAddress || "No disponible",
          }));
        } else {
          alert("No se pudo obtener la dirección en esa ubicación.");
        }
      });
    });
  };

  const handleSaveAddress = async () => {
    try {
      console.log(typeof localStorage.getItem("usuarioId"))
      console.log(localStorage.getItem("usuarioId"))
      const response = await fetch(`${process.env.REACT_APP_API_URL}clientes/${localStorage.getItem("usuarioId")}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ domicilio: newAddress }),
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Error al actualizar la dirección:", errorMessage);
        alert(`Error del servidor: ${errorMessage}`);
        return;
      }

      localStorage.setItem("usuarioDireccion", newAddress.direccion);
      localStorage.setItem("usuarioCiudad", newAddress.ciudad);
      localStorage.setItem("usuarioReferencia", newAddress.referencia);

      setNotificationMessage(
        `Dirección actualizada a: ${newAddress.direccion}, ${newAddress.ciudad}, ${newAddress.referencia}`
      );
      setIsNotificationVisible(true);

      console.log("Dirección actualizada en el servidor correctamente.");
    } catch (error) {
      console.error("Error en la solicitud al servidor:", error);
      alert("Error al comunicarse con el servidor.");
    }

    setTimeout(() => {
      setIsNotificationVisible(false);
    }, 3000);
  };

  const handleVolver = () => {
    navigate(-1);
  };

  return (
    <div className="cambio-direccion-princ">
      <header className="principal-app-header">
        <div className="principal-logo">
          <img src={logo} alt="Tu Despensa Logo" className="principal-logo-img" />
          <div className="principal-name-asd">TU DESPENSA 🛒</div>
        </div>
      </header>

      <div className="cambio-direccion">
        <h2>Cambiar Dirección</h2>
        <div id="map" style={{ height: "400px", width: "100%" }}></div>

        <div className="direccion-container">
          <div className="input-group">
            <label htmlFor="ciudad">Ciudad:</label>
            <input
              type="text"
              id="ciudad"
              placeholder="Ciudad"
              value={newAddress.ciudad || ""}
              disabled
            />
          </div>

          <div className="input-group">
            <label htmlFor="direccion">Dirección:</label>
            <input
              type="text"
              id="direccion"
              placeholder="Dirección completa"
              value={newAddress.direccion || ""}
              disabled
            />
          </div>

          <div className="input-group">
            <label htmlFor="referencia">Referencia:</label>
            <input
              type="text"
              id="referencia"
              placeholder="Introduce una referencia"
              value={newAddress.referencia || ""}
              onChange={(e) =>
                setNewAddress({ ...newAddress, referencia: e.target.value })
              }
            />
          </div>

          <div className="cd-botones-container">
            <button className="Volver-btn" onClick={handleVolver}>
              Volver
            </button>
            <button className="Actualizar-btn" onClick={handleSaveAddress}>
              Actualizar
            </button>
          </div>
          {isNotificationVisible && (
            <div className="notification-container-act">
              <FaCheckCircle className="notification-icon-act" />
              <span>{notificationMessage}</span>
            </div>
          )}
        </div>
      </div>
      <footer className="cd-footer">
        <p>© 2024 TuDespensa. Todos los derechos reservados.</p>
        <p>Contacto: info@tudespensa.com</p>
      </footer>
    </div>
  );
};

export default CambioDireccion;
