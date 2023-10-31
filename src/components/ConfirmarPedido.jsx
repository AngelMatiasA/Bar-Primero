import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useLocation, useNavigate } from 'react-router-dom';
import foto from '../img/fondo4.5..jpg';

import FireBaseImageUpload from "./FireBaseImageUpload";
import Carrito from './Carrito';
import '../styles/car.css';

function ConfirmarPedido() {
    const location = useLocation();
    const navigate = useNavigate();
    
    const pedido = location.state.pedido;
    const [parentImgUrl, setParentImgUrl] = useState(''); // Aquí se guarda la URL de la imagen
    const [ultimoIdOrden, setultimoIdOrden] = useState(0);

    useEffect(() => {
      if (parentImgUrl !== '') {
        fetchUltimoIdOrden();
      }
    }, [parentImgUrl]);

    const fetchUltimoIdOrden = async () => {
      try {
        const response = await axios.get('http://www.mytbrendabar.somee.com/api/Ordenes/ultima-orden');
        setultimoIdOrden(response.data);
      } catch (err) {
        console.error(err);
      }
    };
  
    const confirmar = async () => {
      pedido.comprobanteImg= parentImgUrl;
      try {
        await axios.post('https://www.mytbrendabar.somee.com/api/Ordenes/Guardar', pedido);
        alert('Pedido confirmado!');
        navigate('/verificacion', { state: { pedido, ultimoIdOrden } });
      } catch (err) {
        console.error(err);
      }
    };
  
    return (
        <>
        <div className='cont-confirmar'>
            <section className='galeria'>
                <article className='card'>
                    <h2>Confirmación de Pedido</h2>
                    <h3>Pedidos:</h3>
                    <section id='secc-scroll' style={{ maxHeight: '7rem', overflowY: 'auto', textAlign: 'center' }}>
                    {pedido.alimentos.map((alimento, index) => (
                    <div id='pedido-orden' key={index}>
                        <p>Orden: {alimento.nombre}</p>
                        <p>Cantidad: {alimento.cantidad}</p>
                        <p>Subtotal: ${alimento.precio_subTotal}</p>
                    </div>
                    ))}
                    </section>
                    <h3>Total: ${pedido.total}</h3>

                    
                </article>
                <article className='card'>
                    <h2>Realizar Transferencia</h2>
                    <p>{parentImgUrl}</p>
                    <figure id='figure-cbu'>
                        <img src={foto} alt="" />
                        <figcaption> Alias del Bar MyT</figcaption>
                    </figure>
                    <section id='subir-foto'>
                        <h3>Tome una captura de ántalla de su pedido y subala aqui</h3>
                {/* Aquí se pasa la función para actualizar el estado del componente padre */}
                <FireBaseImageUpload carpetaNom="pruebaConfirmar" setParentImgUrl={setParentImgUrl}/> 

                {/* El botón Confirmar solo se habilita cuando parentImgUrl está seteado */}
                <button onClick={confirmar} disabled={!parentImgUrl}>
                    Confirmar 
                    </button>
                    </section>

                </article>
            </section>
        </div>
      
      </>
    );
  }
  export default ConfirmarPedido;