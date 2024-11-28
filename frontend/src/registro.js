import React, { useState } from 'react';
import IdentificacionUsuario from './IdentificacionUsuario';
import InformacionResidencial from './InformacionResidencial';
import InformacionContacto from './InformacionContacto';
import UsuarioContraseña from './UsuarioContraseña';

function Registro() {
  const [seccionActual, setSeccionActual] = useState(1);

  const renderSeccion = () => {
    switch (seccionActual) {
      case 1:
        return <IdentificacionUsuario />;
      case 2:
        return <InformacionResidencial />;
      case 3:
        return <InformacionContacto />;
      case 4:
        return <UsuarioContraseña />;
      default:
        return <IdentificacionUsuario />;
    }
  };

  return (
    <div>
      <nav>
        <button onClick={() => setSeccionActual(1)}>Identificación del Usuario</button>
        <button onClick={() => setSeccionActual(2)}>Información Residencial</button>
        <button onClick={() => setSeccionActual(3)}>Información de Contacto</button>
        <button onClick={() => setSeccionActual(4)}>Usuario y Contraseña</button>
      </nav>
      <div>
        {renderSeccion()}
      </div>
    </div>
  );
}

export default Registro;
