import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../contexts/ShoppingCartContext";
import { Apiurl } from "../service/apirest";
import axios from "axios";
import "../styles/Carrito.css";
///////////////////////////////////////
import { usuarioContexto } from "../contexts/usuarioContext";
import { useNavigate } from "react-router-dom";
//////////////////////////////////////////
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { CompraContexto } from "../contexts/CompraContex";


export function ShoppingCart() {
  const [cart, setCart] = useContext(CartContext);
  const [userSeccion, setuserSeccion] = useContext(usuarioContexto);
  const { estadoCompra, manejarEstadoCompra } = useContext(CompraContexto);

  const navigate = useNavigate();

  //////////////////////////////////////////
  const mostrarAdvertencia = () => {
    toast.warn("debes loguearte para confirmar tu compra", {
      position: "top-center", // Posición de la notificación
      autoClose: 3000, // Duración en milisegundos
      hideProgressBar: false, // Mostrar barra de progreso
      closeOnClick: true, // Cerrar al hacer clic
      pauseOnHover: true, // Pausar al pasar el mouse
      draggable: true, // Arrastrable
    })
  }

  const handleRemove = (idAlimento) => {
    setCart(cart.filter((item) => item.idAlimento !== idAlimento));
  };
  ////////////////////////////////////////
  const totalSum = cart.reduce(
    (sum, item) => sum + item.precio * item.quantity,
    0
  );
  ////////////////////////////////////////////////////////////////7
  function ManejadorBoton() {


    if (userSeccion.length === 0) {
      mostrarAdvertencia();

      setTimeout(function () {
        navigate("/login");
      }, 2000); // Cambia este valor al número de milisegundos que quieras esperar
    } else {
      const Url = 'http://www.mytbrendabar.somee.com/api/Usuario/Guardar';
      //console.log(cart);
      //console.log(userSeccion.usuario)

      console.log(formatearDatos(userSeccion, cart));
      navigate("/comprobante");

      manejarEstadoCompra();
      //console.log(estadoCompra);

      axios
        .post(Url, formatearDatos(userSeccion, cart))
        .then((response) => {
          if (response.status === 200) {
            console.log("El post se logró con éxito");
          } else {
            console.log("El post no se logró");
          }
        })

        .catch((error) => {
          console.error(error);
          // Manejar el error aquí
        });
        //postUsuario()
    }
  }
  ///////////////////////////////////////
  async function postUsuario() {
    
    const url = 'https://www.mytbrendabar.somee.com/api/Usuario/Guardar';
    const data = formatearDatos(userSeccion, cart);
  

    try {
        const response = await axios.post(url, data);
        console.log(response.data);
        return response.status;
    } catch (error) {
        console.error(error);
        return error.response ? error.response.status : 'Error desconocido';
    }
}
  /////////////////////////////////////////////////
  function formatearDatos(usuario, orden) {
    let total = 0;
    let alimentos = [];
    for (let i = 0; i < orden.length; i++) {
      let precio_subTotal = orden[i].quantity * orden[i].precio;
      total += precio_subTotal;
      alimentos.push({
        idAlimento: orden[i].idAlimento,
        nombre: orden[i].nombre,
        cantidad: orden[i].quantity,
        precio_subTotal: precio_subTotal
      });
    }

    let datos = {
      idUsuario: usuario.idUsuario,
      total: total,
      alimentos: alimentos,
    };

    return JSON.stringify(datos);
}

  //////////////////////////////////////////
  const añadirCarrito = (idAlimento) => {
    setCart(
      cart.map((item) =>
        item.idAlimento === idAlimento
          ? { ...item, quantity: item.quantity + 1 }
          : { ...item }
      )
    );
  };
  //////////////////////////////
  const restarCarrito = (idAlimento) => {
    let newCart = cart.map((item) =>
      item.idAlimento === idAlimento && item.quantity > 0
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );

    newCart = newCart.filter((item) => item.quantity > 0);

    setCart(newCart);
  };

  return (
    <div>
  <div style={{ boxShadow: '0px 0px 10px rgba(0,0,0,0.15)', borderRadius: '15px', padding: '20px' }}>
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Cantidad</th>
          <th>Total</th>
          <th>Eliminar</th>
          <th>Sumar</th>
          <th>Restar</th>
        </tr>
      </thead>
      <tbody>
        {cart.map((item) => (
          <tr key={item.idAlimento}>
            <td><h3>{item.nombre}</h3></td>
            <td><h3>{item.quantity}</h3></td>
            <td><h3>${item.precio * item.quantity}</h3></td>
            <td>
              <button  className="boton-carrito" onClick={() => handleRemove(item.idAlimento)}>
                Eliminar
              </button>
            </td>
            <td>
              <button className="boton-carrito" onClick={() => añadirCarrito(item.idAlimento)}>
                +
              </button>
            </td>
            <td>
              <button  className="boton-carrito" onClick={() => restarCarrito(item.idAlimento)}>
                -
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px', }} >
  <div id="total" style={{ display: 'flex', justifyContent: 'space-between', width: '200px' }}>
      {/*   <p style={{ marginLeft: -4 }}>Total a Pagar:</p> */}
        <h1 style={{ marginLeft: 55 }}>${totalSum}</h1>
    </div>
    <button className="boton-carrito" style={{ marginTop: '10px' }} onClick={ManejadorBoton}>confirmar</button>
  </div>

  <ToastContainer />
</div>


  
  );
}
