import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Principal from "./principal"; 
import Login from "./login"; 
import Registro1 from "./registro1"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Principal />} /> {}
        <Route path="/login" element={<Login />} /> {}
       <Route path="/registro1" element={<Registro1 />} /> {}
      </Routes>
    </Router>
  );
}

export default App;
