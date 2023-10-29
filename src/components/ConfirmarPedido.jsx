import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Link, useNavigate } from "react-router-dom";
import FireBaseImageUpload from "./FireBaseImageUpload";
import Carrito from './Carrito';

function ConfirmarPedido() {
    const location = useLocation();
    const navigate = useNavigate();
    
    const pedido = location.state.pedido;
  
    const confirmar = async () => {
      try {
        await axios.post('https://www.mytbrendabar.somee.com/api/Ordenes/Guardar', pedido);
        alert('Pedido confirmado!');
        navigate('/carrito');
      } catch (err) {
        console.error(err);
      }
    };
  
    return (
      <article>
        <h2>Confirmación de Pedido</h2>
        <p>Usuario: {pedido.idUsuario}</p>
        <p>Total: {pedido.total}</p>
        <h3>Alimentos:</h3>
        {pedido.alimentos.map((alimento, index) => (
          <div key={index}>
            <p>Nombre: {alimento.nombre}</p>
            <p>Cantidad: {alimento.cantidad}</p>
            <p>Subtotal: {alimento.precio_subTotal}</p>
          </div>
        ))}
        <button onClick={confirmar}>
          Confirmar definitivamente
        </button>
      </article>
    );
  }
  export default ConfirmarPedido;