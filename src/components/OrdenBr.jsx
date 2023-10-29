import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/ordenesAdmin.css";

// async function fetchMenu(setDatos) {
 
//     try {
//       const res = await axios.get('https://www.mytbrendabar.somee.com/api/Ordenes/ObtenerPedidos');
//       setDatos(res.data.respones);
//     } catch (err) {
//       console.error(err);
//     }
//   }

function OrdenBr() {
    const [datos, setDatos] = useState([]);
    const [estadoOrdenes, setEstadoOrdenes] = useState([]);
    const [ordenesRealizadas, setOrdenesRealizadas] = useState([]);
    const [ordenesCanceladas, setOrdenesCanceladas] = useState([]);
  
    async function fetchMenu() {
      try {
        const res = await axios.get('https://www.mytbrendabar.somee.com/api/Ordenes/ObtenerPedidos');
        setDatos(res.data.respones);
        setEstadoOrdenes(res.data.respones.map(() => "pendiente"));
      } catch (err) {
        console.error(err);
      }
    }
  
    useEffect(() => {
      fetchMenu();
    }, []);

  const cambiarEstado = (index) => {
    const nuevosEstados = [...estadoOrdenes];
    nuevosEstados[index] = "realizada";
    setEstadoOrdenes(nuevosEstados);

    const nuevaOrdenRealizada = datos.ordenes[index];
    setOrdenesRealizadas([...ordenesRealizadas, nuevaOrdenRealizada]);

    const nuevasOrdenes = datos.ordenes.filter((orden, i) => i !== index);
    setDatos({ ...datos, ordenes: nuevasOrdenes });

    const nuevosEstadosFiltrados = nuevosEstados.filter((estado, i) => i !== index);
    setEstadoOrdenes(nuevosEstadosFiltrados);

    // Llamar a la función para actualizar el estado en el servidor
    actualizarEstadoEnServidor(nuevaOrdenRealizada.idPedido, 2);
  };

  const cancelarOrden = (index) => {
    const nuevaOrdenCancelada = datos.ordenes[index];
    setOrdenesCanceladas([...ordenesCanceladas, nuevaOrdenCancelada]);

    const nuevasOrdenes = datos.ordenes.filter((orden, i) => i !== index);
    setDatos({ ...datos, ordenes: nuevasOrdenes });

    const nuevosEstados = estadoOrdenes.filter((estado, i) => i !== index);
    setEstadoOrdenes(nuevosEstados);

    // Llamar a la función para actualizar el estado en el servidor
    actualizarEstadoEnServidor(nuevaOrdenCancelada.idPedido, 3);
  };

  const actualizarEstadoEnServidor = (idPedido, nuevoEstado) => {
    const url = `https://www.mytbrendabar.somee.com/api/Ordenes/CambiarEstado?idPedido=${idPedido}&estado=${nuevoEstado}`;

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 200) {
          console.log('Estado actualizado en el servidor con éxito');
        } else {
          console.error('Error al actualizar el estado en el servidor');
        }
      })
      .catch((error) => {
        console.error('Error en la solicitud:', error);
      });
  };

  // Resto de tu código...

  return (
    <div className="container">
        <div className="column">
            <div className="ordenes-pendientes">
                <h2>Órdenes pendientes:</h2>
                {datos && datos && datos.map((orden, index) => (
                    <div key={orden.idPedido}>
                        <h4>Cliente: {orden.nombreCliente}</h4>
                        <p>Estado: {estadoOrdenes[index]}</p>
                        <p>Dirección: {orden.direccion}</p>
                        <p>Celular: {orden.celular}</p>
                        <h4>Detalles de la orden: </h4>
                        {orden.alimentos.map((alimento) => (
                            <div key={alimento.idAlimento}>
                                <h4>{alimento.nombre}</h4>
                                <p>Cantidad: {alimento.cantidad}</p>
                                <p>Precio: ${alimento.precio_subTotal}</p>
                            </div>
                        ))}
                        <h3>Total: ${orden.total}</h3>
                        {/* Botón para cambiar el estado de la orden */}
                        {estadoOrdenes[index] === "pendiente" && (
                            <>
                                <button className= "botonesR" onClick={() => cambiarEstado(index)}>Orden Realizada</button>
                                <button className= "botonesC" onClick={() => cancelarOrden(index)}>Orden Cancelada</button>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>

        <div className="column">
            <div className="ordenes-realizadas">
                <h2>Órdenes realizadas:</h2>
                {ordenesRealizadas.map((orden) => (
                    <div key={orden.idPedido}>
                        <h4>Cliente: {orden.nombre}</h4>
                        <p>Dirección: {orden.direccion}</p>
                        <p>Celular: {orden.celular}</p>
                        {/* Detalles de la orden */}
                        {orden.alimentos.map((alimento) => (
                            <div key={alimento.idAlimento}>
                                <h4>{alimento.nombre}</h4>
                                <p>Cantidad: {alimento.cantidad}</p>
                                <p>Precio: ${alimento.precio}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>

        <div className="column">
            <div className="ordenes-canceladas">
                <h2>Órdenes canceladas:</h2>
                {ordenesCanceladas.map((orden) => (
                    <div key={orden.idPedido}>
                        <h4>Cliente: {orden.nombre}</h4>
                        <p>Dirección: {orden.direccion}</p>
                        <p>Celular: {orden.celular}</p>
                        {/* Detalles de la orden */}
                        {orden.alimentos.map((alimento) => (
                            <div key={alimento.idAlimento}>
                                <h4>{alimento.nombre}</h4>
                                <p>Cantidad: {alimento.cantidad}</p>
                                <p>Precio: ${alimento.precio}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>

    </div>
)}
export default OrdenBr;