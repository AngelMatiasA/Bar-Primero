import React, { useState } from 'react';
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
    
    const [ordenActual, setOrdenActual] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchOrdenActual = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://www.mytbrendabar.somee.com/api/Ordenes/EstadoIdActual?idUsuario=${pedido.idUsuario}`);
            setTimeout(() => {
                setOrdenActual(response.data);
                setLoading(false);
            }, 3000);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    return (
        <div className="verificacion">
            <h2 id='h3Espera'>Verificación de Pedido</h2>
            <div className="contenedor">
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
                    {loading ? (
                        <>
                            <p>Cargando...</p>
                            {/* Aquí puedes agregar tu animación de carga */}
                            <div className="loader"></div>
                        </>
                    ) : (
                        ordenActual && (
                            
                                <article className={ordenActual == 1 ? 'estado-pendiente' : 'estado-confirmado'}>
                                    <h3>Estado del Pedido:</h3>
                                    <p>{ordenActual == 1 ? 'Pendiente' : 'Confirmado'}</p>
                                    {ordenActual == 2 && <span>&#10003;</span>}
                                </article>
                          
                        )
                    )}
                    <button  id="btn-check"onClick={fetchOrdenActual}>Checkear Estado</button>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default Verificacion;