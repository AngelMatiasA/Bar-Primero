import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';

// Importa tu archivo CSS
import '../styles/Verificacion.css';

function Verificacion() {
    const location = useLocation();
    const cookies = new Cookies();
    const pedido = location.state.pedido;
    const ultimoIdOrden = location.state.ultimoIdOrden;
    
    const [ordenActual, setOrdenActual] = useState(null);

    useEffect(() => {
        const fetchOrdenActual = async () => {
            try {
                const response = await axios.get(`http://www.mytbrendabar.somee.com/api/Ordenes/OrdenActual?idUltimo=${ultimoIdOrden}&idUsuario=${pedido.idUsuario}`);
                setOrdenActual(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        // Realiza la petición cada 20 segundos
        const intervalId = setInterval(fetchOrdenActual, 20000);

        // Limpia el intervalo cuando el componente se desmonta
        return () => clearInterval(intervalId);
    }, [ultimoIdOrden, pedido.idUsuario]);

    return (
        <div className="verificacion">
            <h2 id='h3Espera'>Verificación de Pedido</h2>
            <div className="contenedor">
                {ordenActual ? (
                    <div className='cont'>
                        <article className="detalles">
                            <h3 id='h3Espera'>Detalles del Pedido:</h3>
                            <h4>Cliente: {cookies.get('nombre')}</h4>
                            <h4>Direccion: {cookies.get('direccion')}</h4>
                            <h3>Pedidos :</h3>
                            <section id='secc-scroll' className="pedido-scroll">
                                {pedido.alimentos.map((alimento, index) => (
                                    <div id='pedido-orden' key={index} className="pedido-orden">
                                        <p>Orden: {alimento.nombre}</p>
                                        <p>Cantidad: {alimento.cantidad}</p>
                                        <p>Subtotal: ${alimento.precio_subTotal}</p>
                                    </div>
                                ))}
                            </section>
                            <h3>Total: ${pedido.total}</h3>
                            <figure className="comprobante">
                                <img src={pedido.comprobanteImg} alt="Comprobante" />
                            </figure>
                        </article>
                        <section className="espera">
                            <article className={ordenActual.idEstado === 1 ? 'estado-pendiente' : 'estado-confirmado'}>
                                <h3>Estado del Pedido:</h3>
                                <p>{ordenActual.idEstado === 1 ? 'Pendiente' : 'Confirmado'}</p>
                                {ordenActual.idEstado === 2 && <span>&#10003;</span>}
                            </article>
                        </section>
                    </div>
                ) : (
                    <p id='h3Espera'>Cargando detalles del pedido...</p>
                )}
            </div>
        </div>
    );
}

export default Verificacion;