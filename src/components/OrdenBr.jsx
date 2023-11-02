import { useState, useEffect } from "react";
import "../styles/ordenesAdmin.css";
import axios from "axios";


function OrdenBr() {

    const [ordenesPendientes, setOrdenesPendientes] = useState([]);
    ////////////////////////////////////////////////////////////////////
    const [ordenesRealizadas, setOrdenesRealizadas] = useState([]);
  
     
          const confirmadas = async () => {
            try {
              const result = await axios.get(
                  'https://www.mytbrendabar.somee.com/api/Ordenes/Confirmados'
              );
              setOrdenesRealizadas(result.data.respones);
              //console.log(result.data.respones)
            } catch (error) {
              console.error("Error al obtener los datos:", error);
            }
          };
      
          confirmadas();
          //console.log(ordenesRealizadas);

          useEffect(() => {
            confirmadas();
          }, []);
       
    /////////////////////////////////////////////////////////////////////
    const [ordenesCanceladas, setOrdenesCanceladas] = useState([]);
  
    
          const canceladas = async () => {
            try {
              const result = await axios.get(
                  'https://www.mytbrendabar.somee.com/api/Ordenes/Cancelados'
              );
              setOrdenesCanceladas(result.data.respones);
              //console.log(result.data.respones)
            } catch (error) {
              console.error("Error al obtener los datos:", error);
            }
          };
      
          canceladas();
          //console.log(ordenesCanceladas);
       

          useEffect(() => {
            canceladas();
          }, []);
       
        ////////////////////////////////////////////
  
   
    const fetchData = async () => {
      try {
        const result = await axios.get(
          'https://www.mytbrendabar.somee.com/api/Ordenes/Pendientes'
        );
        setOrdenesPendientes(result.data.respones);
        console.log(result.data)
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };
    //////////////////////////////////////////
    useEffect(() => {
      fetchData();
    }, []);
  
  ////////////////////////////////////////////////////////
  async function cambiarEstado(idOrden) {
      try {
        const result = await axios.put(
          `https://www.mytbrendabar.somee.com/api/Ordenes/CambiarEstado?idPedido=${idOrden}&estado=2`
        );
        console.log(idOrden)
        console.log(result.data);
       
        // Llama a fetchData() después de cambiar el estado
        await fetchData();
        await confirmadas()
      } catch (error) {
        console.error("Error al cambiar el estado:", error);
      }
    }
    ///////////////////////////////
    async function cancelarOrden(idOrden) {
      try {
        const result = await axios.put(
          `https://www.mytbrendabar.somee.com/api/Ordenes/CambiarEstado?idPedido=${idOrden}&estado=3`
        );
        console.log(idOrden)
        console.log(result.data);
       
        // Llama a fetchData() después de cambiar el estado
        await fetchData();
        await canceladas()
      } catch (error) {
        console.error("Error al cambiar el estado:", error);
      }
    }
    
 


  


  return (
    <div className="container">
     
     <div className="column">
      <div className="ordenes-pendientes">
        <h2>Órdenes pendientes:</h2>
        <div className="contenedor-item">
        {ordenesPendientes
          .filter((orden) => orden.estado === "pendiente")
          .map((orden) => (
            <div key={orden.idPedido}>
                   <h1>ID-Pedido: {orden.idPedido}</h1>
              <h4>Cliente: {orden.nombreCliente}</h4>
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

{orden.comprobanteImg ? (
              <img src={orden.comprobanteImg} alt="Comprobante" style={{maxWidth: "250px", maxHeight: "300px"}} />
            ) : (
              <p>No hay imagen</p>
            )}

              <>
                <button
                  className="botonesR"
                  onClick={() => cambiarEstado(orden.idPedido)}
                >
                  Orden Realizada
                </button>
                <button
                  className="botonesC"
                  onClick={() => cancelarOrden(orden.idPedido)}
                >
                  Orden Cancelada
                </button>
              </>
            </div>
          ))}
          </div>
      </div>
    </div>
    <div className="column">
    <div className="ordenes-realizadas">
      <h2>Órdenes realizadas:</h2>
      <div className="contenedor-item">
      {ordenesRealizadas.filter(orden => orden.estado === 'realizado').map((orden) => (
        <div key={orden.idPedido}>
          <h1>ID-Pedido: {orden.idPedido}</h1>
          <h4>Cliente: {orden.nombreCliente}</h4>
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
          {orden.comprobanteImg ? (
              <img src={orden.comprobanteImg} alt="Comprobante" style={{maxWidth: "250px", maxHeight: "300px"}} />
            ) : (
              <p>No hay imagen</p>
            )}
        </div>
      ))}
      </div>
    </div>
  </div>

  <div className="column">
    <div className="ordenes-canceladas">
      <h2>Órdenes canceladas:</h2>
      <div className="contenedor-item">
      {ordenesCanceladas.filter(orden => orden.estado === "cancelado").map((orden) => (
        <div key={orden.idPedido}>
            <h1>ID-pedido {orden.idPedido}</h1>
           <h4>Cliente: {orden.nombreCliente}</h4>
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
          {orden.comprobanteImg ? (
              <img src={orden.comprobanteImg} alt="Comprobante" style={{maxWidth: "250px", maxHeight: "300px"}} />
            ) : (
              <p>No hay imagen</p>
            )}
        </div>
      ))}
       </div>
    </div>
  </div>



          
         
      
    </div>
  );
}
export default OrdenBr;
