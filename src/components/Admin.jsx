import data from "../data/ordenes.json";
import { useState } from "react";
import '../styles/ordenesAdmin.css'


function Admin () {
    const [datos, setDatos] = useState(data);
    const [estadoOrdenes, setEstadoOrdenes] = useState(datos.ordenes.map(() => "pendiente"));
    const [ordenesRealizadas, setOrdenesRealizadas] = useState([]);
    const [ordenesCanceladas, setOrdenesCanceladas] = useState([]);


    const cambiarEstado = (index) => {
        const nuevosEstados = [...estadoOrdenes];
        nuevosEstados[index] = "realizada";
        setEstadoOrdenes(nuevosEstados);


        const nuevaOrdenRealizada = datos.ordenes[index];
        setOrdenesRealizadas([...ordenesRealizadas, nuevaOrdenRealizada]);


        // Eliminar la orden del arreglo datos.ordenes y del arreglo estadoOrdenes
        const nuevasOrdenes = datos.ordenes.filter((orden, i) => i !== index);
        setDatos({ ...datos, ordenes: nuevasOrdenes });
        setEstadoOrdenes(nuevosEstados.filter((estado, i) => i !== index));
    };


    const cancelarOrden = (index) => {
        // Agregar la orden al arreglo de órdenes canceladas
        const nuevaOrdenCancelada = datos.ordenes[index];
        setOrdenesCanceladas([...ordenesCanceladas, nuevaOrdenCancelada]);


        // Eliminar la orden del arreglo datos.ordenes y del arreglo estadoOrdenes
        const nuevasOrdenes = datos.ordenes.filter((orden, i) => i !== index);
        setDatos({ ...datos, ordenes: nuevasOrdenes });
        const nuevosEstados = estadoOrdenes.filter((estado, i) => i !== index);
        setEstadoOrdenes(nuevosEstados);
    };


    return (
        <div className="container">
            <div className="column">
                <div className="ordenes-pendientes">
                <h2>Órdenes pendientes:</h2>
                {datos.ordenes.map((orden, index) => (
                    <div key={orden.idOrden}>
                        <h4>Cliente: {orden.nombre}</h4>
                        <p>Estado: {estadoOrdenes[index]}</p>
                        <p>Dirección: {orden.direccion}</p>
                        <p>Celular: {orden.celular}</p>
                        <h4>Detalles de la orden: </h4>
                        {orden.alimentos.map((alimento) => (
                            <div key={alimento.idAlimento}>
                                <h4>{alimento.nombre}</h4>
                                <p>Cantidad: {alimento.cantidad}</p>
                                <p>Precio: ${alimento.precio}</p>
                            </div>
                        ))}
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
                    <div key={orden.idOrden}>
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
                <div key={orden.idOrden}>
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
    )
}
export default Admin;
