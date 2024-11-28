import React from "react";
import { useNavigate } from "react-router-dom";

function Principal() {
  const navigate = useNavigate(); // Hook para navegación

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#f8f9fa",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1 style={{ margin: 0, fontSize: "24px" }}>Mi Página</h1>
      <button
        style={{
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          padding: "8px 16px",
          borderRadius: "4px",
          fontSize: "16px",
          cursor: "pointer",
        }}
        onClick={() => navigate("/login")} // Navegar a la página de inicio de sesión
      >
        Login
      </button>
    </header>
  );
}

export default Principal;
