import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Link, useNavigate } from "react-router-dom";

import '../styles/Logueo.css'

const RegistrationOptions = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [form, setForm] = useState({
    nombre: "",
    mail: "",
    contrasenia: "",
    direccion: "",
    celular: "",
    esAdmin: false
  });


  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  const  registoUsuario =async () => {
    let usuario = {
      nombre: form.nombre,
      mail: form.mail, 
      contrasenia: form.contrasenia,
      direccion: form.direccion,
      celular: form.celular,
      esAdmin: form.esAdmin
     
    };
    
    try {
      await axios.post('https://www.mytbrendabar.somee.com/api/Usuario/Guardar', usuario);
      alert('usuario regitrado!');
      navigate('/logueo');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='registro'>
      <main id="contenido">
        <article>
          <form id="registro" className="form1">
            <fieldset>
              <legend>Registrarse</legend>
              <label htmlFor="nombre">Nombre: </label> 
              <input type="text" id="nombre" name="nombre" onChange={handleChange}/> 
              <label htmlFor="mail">Mail: </label> 
              <input type="email" id="mail" name="mail" onChange={handleChange}/> 
              <label htmlFor="contrasenia">Contraseña: </label> 
              <input type="password" id="contrasenia" name="contrasenia" onChange={handleChange}/>
              <label htmlFor="direccion">Direccion: </label> 
              <input type="text" id="direccion" name="direccion" onChange={handleChange}/> 
              <label htmlFor="celular">Celular: </label> 
              <input type="text" id="celular" name="celular" onChange={handleChange}/> 
            </fieldset>
            <button type="button" onClick={registoUsuario}>Registrar</button>
            <input type="submit" className="fadeIn fourth" value="Log In" />
            <Link to="/logueo">
              <input
                type="button"
                className="fadeIn fourth"
                value="Logueo"
              />
            </Link>
          </form>
        </article>
      </main>
    </div>
  );
};

export default RegistrationOptions;