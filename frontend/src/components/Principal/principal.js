import React from "react";
import { useNavigate } from "react-router-dom";
import "./principal.css";

function Principal() {
  const navigate = useNavigate(); 

  return (
    <header className="header">
      <h1 className="header-title">Mi Página</h1>
      <button className="header-button" onClick={() => navigate("/login")}>
        Login
      </button>
    </header>
  );
}

export default Principal;
