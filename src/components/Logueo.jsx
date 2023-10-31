import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Link, useNavigate } from "react-router-dom";
import FireBaseImageUpload from "./FireBaseImageUpload";

import '../styles/Logueo.css'

const Logueo = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [form, setForm] = useState({ mail: '', contra: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const iniciarSesion = () => {
    axios.get(`https://www.mytbrendabar.somee.com/api/Usuario/Logueo?mail=${form.mail}&contra=${form.contra}`)
      .then(response => {
        if (response.data.respones.length > 0) {
          alert('usuario y la contraseña correctos');
          const usuario = response.data.respones[0];
          cookies.set('idUsuario', usuario.id);
          cookies.set('nombre', usuario.nombre);
          cookies.set('mail', usuario.mail);
          cookies.set('contrasenia', usuario.contrasenia);
          cookies.set('direccion', usuario.direccion);
          cookies.set('celular', usuario.celular);
          cookies.set('esAdmin', usuario.esAdmin);
          alert("Bienvenido: " + usuario.nombre);
          navigate('/carrito');
        } else {
          alert('El usuario o la contraseña no son correctos');
        }
      })
      .catch(error => {
        console.error("Hubo un error al iniciar sesión: ", error);
      });
  };
  function manejadorSubmit(e) {
    e.preventDefault();
    iniciarSesion();
  }

  return (
    <div className='registro'>
      <main id="contenido">
        <article>
          <form id="registro" className="form1" onSubmit={manejadorSubmit}>
            <fieldset>
              <legend>Formulario de suscripcion</legend>
              <label htmlFor="mail">Mail: </label> 
              <input type="email" id="mail" name="mail" onChange={handleChange}/> 
              <label htmlFor="contraseña">Contraseña: </label> 
              <input type="password" id="contraseña" name="contra" onChange={handleChange}/> 
            </fieldset>
            {/* <button type="button" onClick={iniciarSesion}>Inicio</button> */}
            <input type="submit" className="fadeIn fourth" value="Ingresar" />
            <Link to="/registro">
              <input
                type="button"
                className="fadeIn fourth"
                value="Registrarse"
              />
            </Link>
          </form>
        </article>
      </main>
    </div>
  );
};

export default Logueo;