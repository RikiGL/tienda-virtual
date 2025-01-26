import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CambioDireccion.css';
import logo from "../imagenes/asdlogo.png";
import { FaCheckCircle } from 'react-icons/fa';

const CambioDireccion = () => {
  const [newAddress, setNewAddress] = useState({
    ciudad: '',
    referencia: '', // Este campo se mantendrá vacío para que el usuario lo complete
    direccion: ''
  });

  const navigate = useNavigate();
  const [notificationMessage, setNotificationMessage] = useState('');
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);

  useEffect(() => {
    // Cargar el script de Google Maps
    const loadGoogleMapsScript = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBsxggWrFntrds_WhqN35lhdBCRxYjAnfE&libraries=places&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    };

    // Definir la función initMap
    window.initMap = () => {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: -0.19025811234117668, lng: -78.48772768960126 },
        zoom: 15,
      });

      const geocoder = new window.google.maps.Geocoder();

      // Evento de clic en el mapa
      map.addListener("click", (event) => {
        const latLng = event.latLng;
        geocoder.geocode({ location: latLng }, (results, status) => {
          if (status === "OK" && results[0]) {
            const address = results[0];
            let city = "";
            let street = "";
            let fullAddress = address.formatted_address; // Dirección completa

            // Extraer ciudad y dirección de los componentes de la dirección
            address.address_components.forEach((component) => {
              if (component.types.includes("locality")) {
                city = component.long_name; // Ciudad
              }
              if (component.types.includes("route")) {
                street = component.long_name; // Calle
              }
            });

            // Autocompletar la ciudad y la dirección
            setNewAddress({
              ciudad: city || "No disponible",
              direccion: fullAddress || "No disponible", // Dirección completa en el campo Dirección
              referencia: "" // Deja referencia vacía para que el usuario la ingrese
            });
          } else {
            alert("No se pudo obtener la dirección en esa ubicación.");
          }
        });
      });
    };

    // Cargar el script de Google Maps
    loadGoogleMapsScript();
  }, [newAddress.referencia]);  // Se ejecuta cuando la referencia cambie

  const handleSaveAddress = async () => {
    // Mostrar notificación de éxito con el mensaje de dirección actualizada
    
    try {
      console.log(typeof localStorage.getItem("usuarioId"))
      console.log(localStorage.getItem("usuarioId"))
      const response = await fetch(`http://localhost:4000/api/clientes/${localStorage.getItem("usuarioId")}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({domicilio:newAddress}),
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Error al actualizar la direccion:", errorMessage);
        alert(`Error del servidor: ${errorMessage}`);
        return;
      }
      localStorage.setItem("usuarioDireccion", newAddress.direccion);
      localStorage.setItem("usuarioCiudad", newAddress.ciudad);
      localStorage.setItem("usuarioReferencia", newAddress.referencia);

      setNotificationMessage(`Dirección actualizada a: ${newAddress.direccion}, ${newAddress.ciudad}, ${newAddress.referencia}`);
      setIsNotificationVisible(true);

      console.log("Direccion actualizado en el servidor correctamente.");
    } catch (error) {
      console.error("Error en la solicitud al servidor:", error);
      alert("Error al comunicarse con el servidor.");
    }


    // Ocultar la notificación después de 3 segundos
    setTimeout(() => {
      setIsNotificationVisible(false);
    }, 3000);
  };

  const handleVolver = () => {
    navigate(-1); // Volver a la pantalla anterior
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
        {/* Insertamos el mapa interactivo */}
        <div id="map" style={{ height: "400px", width: "100%" }}></div>

        {/* Campos de entrada para la dirección */}
        <div className="direccion-container">
          {/* Campo para Ciudad (Autocompletado desde el mapa) */}
          <div className="input-group">
            <label htmlFor="ciudad">Ciudad:</label>
            <input
              type="text"
              id="ciudad"
              placeholder="Ciudad"
              value={newAddress.ciudad || ""}
              onChange={(e) => setNewAddress({ ...newAddress, ciudad: e.target.value })}
              disabled // Deshabilitado para evitar edición
            />
          </div>

          {/* Campo para Dirección (Autocompletado desde el mapa) */}
          <div className="input-group">
            <label htmlFor="direccion">Dirección:</label>
            <input
              type="text"
              id="direccion"
              placeholder="Dirección completa"
              value={newAddress.direccion || ""}
              onChange={(e) => setNewAddress({ ...newAddress, direccion: e.target.value })}
              disabled // Deshabilitado para evitar edición
            />
          </div>

          {/* Campo para Dirección de referencia (Usuario ingresa manualmente) */}
          <div className="input-group">
            <label htmlFor="referencia">Referencia:</label>
            <input
              type="text"
              id="referencia"
              placeholder="Introduce una referencia"
              value={newAddress.referencia || ""}
              onChange={(e) => setNewAddress({ ...newAddress, referencia: e.target.value })}
            />
          </div>

          {/* Botones de acción */}
          <div className="cd-botones-container">
            <button className='Volver-btn' onClick={handleVolver}>Volver</button>
            <button className='Actualizar-btn' onClick={handleSaveAddress}>Actualizar</button>
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