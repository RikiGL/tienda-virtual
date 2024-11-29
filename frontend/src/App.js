import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Principal from "./components/Principal/principal";
import Login from "./components/Login/login";
import Cambio_Contraseña from "./components/Cambio_contraseña/cambio";
import Registro1 from "./components/Registro/registro1";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Principal />} /> {}
        <Route path="/login" element={<Login />} /> {}
        <Route path="/cambio" element={<Cambio_Contraseña />} /> {}
       <Route path="/registro1" element={<Registro1 />} /> {}
       <Route path="/principal" element={<Principal />}/>
      </Routes>
    </Router>
  );
}

export default App;
