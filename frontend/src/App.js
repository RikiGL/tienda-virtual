import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Principal from "./components/Principal/principal";
import Login from "./components/Login/login";
import CambioContraseña from "./components/Cambiocontraseña/cambio";
import Registro1 from "./components/Registro/registro1";
import CambioCodigo from "./components/CambioContraseña2/cambio2";
//import CambioContrasena from "./components/Cambio_contraseña/cambio";
import CambioContrasena3 from "./components/CambioContraseña3/cambio3";
import Google from "./components/Login-Google/google";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Principal />} /> {}
        <Route path="/login" element={<Login />} /> {}
        <Route path="/cambio" element={<CambioContraseña />} /> {}
       <Route path="/registro1" element={<Registro1 />} /> {}
       <Route path="/principal" element={<Principal />}/>
       <Route path="/cambio2" element={<CambioCodigo />}/>
       <Route path="/cambio3" element={<CambioContrasena3 />}/>
       <Route path="/google" element={<Google/>}/>
             </Routes>
    </Router>
  );
}

export default App;
