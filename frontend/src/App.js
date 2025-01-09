import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google"; // Importa el proveedor
import Principal from "./components/Principal/principal";
import Login from "./components/Login/login";
import CambioContraseña from "./components/Cambiocontraseña/cambio";
import Registro1 from "./components/Registro/registro1";
import CambioCodigo from "./components/CambioContraseña2/cambio2";
//import CambioContrasena from "./components/Cambio_contraseña/cambio";
import CambioContrasena3 from "./components/CambioContraseña3/cambio3";
import GoogleR from "./components/GoogleR/googler"
import Pago from "./components/Pago/pagoF"
import AdminProductos from "./components/Admin/admin";

function App() {
  return (
    // Con este clientID se obtienen los datos de una cuenta de google para login y registro de OAuth
    <GoogleOAuthProvider clientId="215959712464-3spuv70q1mf9al6u6jbf31ot30eruouu.apps.googleusercontent.com">
    <Router>
      <Routes>
        <Route path="/" element={<Principal />} /> {}
        <Route path="/login" element={<Login />} /> {}
        <Route path="/cambio" element={<CambioContraseña />} /> {}
       <Route path="/registro1" element={<Registro1 />} /> {}
       <Route path="/principal" element={<Principal />}/>
       <Route path="/cambio2" element={<CambioCodigo />}/>
       <Route path="/cambio3" element={<CambioContrasena3 />}/>
       <Route path="/googler" element={<GoogleR />}/>
       <Route path="/pagoF" element={<Pago />}/>
       <Route path="/admin" element={<AdminProductos/>}/>
             </Routes>
    </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
