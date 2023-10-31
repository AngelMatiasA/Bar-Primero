import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";
import '../styles/cerrarSesion.css'

const CerrarSesion = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogoutClick = () => {
    setShowConfirm(true);
  };

  const cerrarSesion = () => {
    cookies.remove('idUsuario');
    cookies.remove('nombre');
    cookies.remove('mail');
    cookies.remove('contrasenia');
    cookies.remove('direccion');
    cookies.remove('celular');
    cookies.remove('esAdmin');
    alert("Has cerrado la sesión");
    navigate('/carrito');
  };

  return (
    <div className='cerrarSesion'>
      <h1>Bienvenido: {cookies.get('nombre')}</h1>
      {showConfirm ? (
        <div>
          <h2>¿Deseas cerrar la sesión?</h2>
          <button onClick={cerrarSesion}>Cerrar Sesión</button>
        </div>
      ) : (
        <button onClick={handleLogoutClick}>Cerrar Sesión</button>
      )}
    </div>
  );
};

export default CerrarSesion;