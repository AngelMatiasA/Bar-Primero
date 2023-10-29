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

function Carrito() {
  const cookies = new Cookies();
  const [alimentos, setAlimentos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  useEffect(() => {
    fetchMenu(setAlimentos);
  }, []);

  const agregarAlCarrito = (alimento) => {
    let newCarrito = [...carrito];
    let itemIndex = newCarrito.findIndex(item => item.idAlimento === alimento.idAlimento);
    if (itemIndex > -1) {
      newCarrito[itemIndex].cantidad += 1;
      newCarrito[itemIndex].precio_subTotal += alimento.precio;
    } else {
      newCarrito.push({...alimento, cantidad: 1, precio_subTotal: alimento.precio});
    }
    setCarrito(newCarrito);
  };

  const quitarDelCarrito = (index) => {
    let newCarrito = [...carrito];
    if (newCarrito[index].cantidad > 1) {
      newCarrito[index].cantidad -= 1;
      newCarrito[index].precio_subTotal -= newCarrito[index].precio;
    } else {
      newCarrito.splice(index, 1);
    }
    setCarrito(newCarrito);
  };

  const confirmarPedido = async () => {
    let total = carrito.reduce((acc, curr) => acc + curr.precio_subTotal, 0);
    let pedido = {
      idUsuario: 1,
      total: total,
      alimentos: carrito.map(alimento => ({
        idAlimento: alimento.idAlimento,
        nombre: alimento.nombre,
        cantidad: alimento.cantidad,
        precio_subTotal: alimento.precio_subTotal
      }))
    };
    
    try {
      await axios.post('https://www.mytbrendabar.somee.com/api/Ordenes/Guardar', pedido);
      alert('Pedido confirmado!');
      setCarrito([]);
    } catch (err) {
      console.error(err);
    }
  };
  var admin = cookies.get('esAdmin');
  if(cookies.get("esAdmin") == true){
    var sies = "es admin"
  }else{
    var sies = "no es"
  }

  return (
    <div className="compra">
         
      
      <header className="header-carrito">
        <button className="boton-carrito" onClick={() => setMostrarCarrito(!mostrarCarrito)}>
          {mostrarCarrito ? 'Ocultar' : 'Desplegar'} Carrito
        </button>
        {mostrarCarrito && (
          <div className="carrito">
            {carrito.map((alimento, index) => (
              <div key={index} className="item-carrito">
                <span>{alimento.nombre} x {alimento.cantidad}</span>
                <span>Subtotal: {alimento.precio_subTotal}</span>
                <button onClick={() => quitarDelCarrito(index)}>
                  Quitar
                </button>
              </div>
            ))}
            <div>Total: {carrito.reduce((acc, curr) => acc + curr.precio_subTotal, 0)}</div>
            <button onClick={confirmarPedido}>
              Confirmar pedido
            </button>
          </div>
        )}
      </header>
      <div className="galeria">
        {alimentos.map((alimento) => (
          <div className="card" key={alimento.idAlimento}>
            <h2>{alimento.nombre}</h2>
            <p>{alimento.descripcion}</p>
            <p>{alimento.precio}</p>
            <p>{admin}</p>
            <h3>{cookies.get("nombre")}</h3>
            <h3>{sies}</h3>
          
            <button onClick={() => agregarAlCarrito(alimento)}>
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carrito;