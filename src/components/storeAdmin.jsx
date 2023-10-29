import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/car.css';
import Cookies from 'universal-cookie';

async function fetchMenu(setAlimentos) {
  try {
    const res = await axios.get('https://www.mytbrendabar.somee.com/api/Alimento/Menu');
    setAlimentos(res.data.respones);
  } catch (err) {
    console.error(err);
  }
}

function StoreAdmin() {
  const cookies = new Cookies();
  const [alimentos, setAlimentos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [precioInput, setPrecioInput] = useState(null);

  useEffect(() => {
    fetchMenu(setAlimentos);
  }, []);

  const handleChange = (e, id) => {
    setPrecioInput({ ...precioInput, [id]: e.target.value });
  };

  const cambiarPrecio = async (idAlimento, precio) => {
    try {
      const res = await axios.put(`https://www.mytbrendabar.somee.com/api/Alimento/CambiarPrecio?idAlimento=${idAlimento}&precio=${precio}`);
      if (res.data) {
        setAlimentos(alimentos.map(alimento => alimento.idAlimento === idAlimento ? res.data : alimento));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="compra">
      <div className="galeria">
      <h2>BIENVENIDO : {cookies.get("nombre")}</h2>

        {alimentos.map((alimento) => (
          <div className="card" key={alimento.idAlimento}>
            <h2>{alimento.nombre}</h2>
            <p>Descripcion: {alimento.descripcion}</p>
            <p>Precio: ${alimento.precio}</p>
            <label htmlFor="cambiarPrecio"> Cambiar Precio</label>
            <input id="cambiarPrecio" type="number" placeholder={alimento.precio} onChange={(e) => handleChange(e, alimento.idAlimento)} />
            <button id="btn-precio" onClick={() => cambiarPrecio(alimento.idAlimento, precioInput[alimento.idAlimento])}>
              OK
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StoreAdmin;