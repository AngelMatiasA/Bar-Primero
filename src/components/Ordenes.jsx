import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Ordenes.css'; // Asegúrate de tener este archivo CSS en la misma carpeta que tu componente

const Ordenes = () => {
  const [ordenes, setOrdenes] = useState([]);

  useEffect(() => {
    const obtenerOrdenes = async () => {
      try {
        const response = await axios.get('https://www.mytbrendabar.somee.com/api/Ordenes/ObtenerPedidos');
        setOrdenes(response.data.respones);
      } catch (error) {
        console.error("Hubo un error al obtener las ordenes: ", error);
      }
    };

    obtenerOrdenes();
  }, []);

  return (
    <div className="ordenes">
      {ordenes.map((orden, index) => (
        <div key={index} className="orden">
          <h2 className="orden-titulo">Orden {orden.idPedido}</h2>
          <p>Fecha y hora: {orden.fecha_hora}</p>
          <p>Estado: {orden.estado}</p>
          <p>Nombre del cliente: {orden.nombreCliente}</p>
          <p>Dirección: {orden.direccion}</p>
          <p>Celular: {orden.celular}</p>
          <p>Total: {orden.total}</p>
          <h3 className="alimentos-titulo">Alimentos:</h3>
          {orden.alimentos.map((alimento, index) => (
            <div key={index} className="alimento">
              <p>Nombre: {alimento.nombre}</p>
              <p>Cantidad: {alimento.cantidad}</p>
              <p>Precio subtotal: {alimento.precio_subTotal}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Ordenes;