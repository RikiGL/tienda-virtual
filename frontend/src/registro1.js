import React, { useState } from "react";
import fondo from "./fondo_.png"; 

function Registro1() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [confirmarContraseña, setConfirmarContraseña] = useState("");
  const [direccion, setDireccion] = useState({
    calle: "",
    ciudad: "",
    codigoPostal: "",
    pais: "",
  });
  const [telefono, setTelefono] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (contraseña !== confirmarContraseña) {
      setMensaje("Las contraseñas no coinciden.");
      return;
    }

    if (!nombre || !correo || !contraseña || !confirmarContraseña) {
      setMensaje("Por favor, llena todos los campos obligatorios.");
      return;
    }

    if (!direccion.calle || !direccion.ciudad || !direccion.codigoPostal || !direccion.pais) {
      setMensaje("Por favor, completa todos los campos de dirección.");
      return;
    }

    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(correo)) {
      setMensaje("Por favor, ingresa un correo válido.");
      return;
    }

    setMensaje("¡Registro exitoso! Método de pago seleccionado: PayPal");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: `url(${fondo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        style={{
          width: "700px",
          padding: "40px",
          background: "rgba(255, 255, 255, 0.9)", 
          borderRadius: "12px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        }}
      >
<h2
  style={{
    textAlign: "center",
    marginBottom: "25px", 
    fontSize: "24px", 
    color: "#333",
    fontWeight: "bold",
    fontFamily: "'Roboto', sans-serif", 
  }}
>
  Registro
</h2>

        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              marginBottom: "20px",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "16px",
                  marginBottom: "8px",
                  color: "#555",
                }}
              >
                Nombre
              </label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ingresa tu nombre"
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  fontSize: "14px",
                }}
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "16px",
                  marginBottom: "8px",
                  color: "#555",
                }}
              >
                Correo
              </label>
              <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="Ingresa tu correo"
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  fontSize: "14px",
                }}
              />
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              marginBottom: "20px",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "16px",
                  marginBottom: "8px",
                  color: "#555",
                }}
              >
                Contraseña
              </label>
              <input
                type="password"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                placeholder="Crea tu contraseña"
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  fontSize: "14px",
                }}
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "16px",
                  marginBottom: "8px",
                  color: "#555",
                }}
              >
                Confirmar Contraseña
              </label>
              <input
                type="password"
                value={confirmarContraseña}
                onChange={(e) => setConfirmarContraseña(e.target.value)}
                placeholder="Confirma tu contraseña"
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  fontSize: "14px",
                }}
              />
            </div>
          </div>
          <div
            style={{
              marginBottom: "20px",
            }}
          >
            <label
              style={{
                display: "block",
                fontSize: "16px",
                marginBottom: "8px",
                color: "#555",
              }}
            >
              Dirección (calle, ciudad, código postal, país)
            </label>
            <input
              type="text"
              value={direccion.calle}
              onChange={(e) => setDireccion({ ...direccion, calle: e.target.value })}
              placeholder="Calle"
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "8px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                fontSize: "14px",
              }}
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "20px",
              }}
            >
              <input
                type="text"
                value={direccion.ciudad}
                onChange={(e) => setDireccion({ ...direccion, ciudad: e.target.value })}
                placeholder="Ciudad"
                style={{
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  fontSize: "14px",
                }}
              />
              <input
                type="text"
                value={direccion.codigoPostal}
                onChange={(e) => setDireccion({ ...direccion, codigoPostal: e.target.value })}
                placeholder="Código Postal"
                style={{
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  fontSize: "14px",
                }}
              />
              <input
                type="text"
                value={direccion.pais}
                onChange={(e) => setDireccion({ ...direccion, pais: e.target.value })}
                placeholder="País"
                style={{
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  fontSize: "14px",
                }}
              />
            </div>
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              background: "#6a11cb",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Registrarse
          </button>
        </form>
        {mensaje && (
          <p
            style={{
              marginTop: "20px",
              color: mensaje.includes("exitoso") ? "green" : "red",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            {mensaje}
          </p>
        )}
      </div>
    </div>
  );
}

export default Registro1;
