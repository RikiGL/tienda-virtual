import React from "react";
import { useNavigate } from "react-router-dom";
import fondo from "./fondo_.png"; 

function Login() {
  const navigate = useNavigate();

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
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      <div
        style={{
          width: "350px",
          padding: "30px",
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
  Login
</h2>

        <form>
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                marginBottom: "8px",
                color: "#555",
              }}
            >
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                fontSize: "14px",
                boxSizing: "border-box",
              }}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                marginBottom: "8px",
                color: "#555",
              }}
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                fontSize: "14px",
                boxSizing: "border-box",
              }}
            />
          </div>
          <div style={{ textAlign: "right", marginBottom: "20px" }}>
            <a
              href="#"
              style={{
                color: "#4e54c8",
                fontSize: "12px",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              background: "#4e54c8",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.background = "#3d43a6")}
            onMouseOut={(e) => (e.target.style.background = "#4e54c8")}
          >
            Login
          </button>
        </form>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <span style={{ fontSize: "14px", color: "#555" }}>Not a Member?</span>{" "}
          <button
            onClick={() => navigate("/registro1")}
            style={{
              background: "none",
              border: "none",
              color: "#4e54c8",
              fontSize: "14px",
              fontWeight: "bold",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Registro
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
