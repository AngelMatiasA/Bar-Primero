


import React, { useContext, useEffect } from 'react';
import { CompraContexto } from '../contexts/CompraContex';
import { CartContext } from '../contexts/ShoppingCartContext';
import { PedidoContex } from '../contexts/PedidoContex';
import { useNavigate,useLocation  } from 'react-router-dom';
import "../styles/ticket.css"

const Ticket = () => {
    const { estadoCompra, manejarEstadoCompra } = useContext(CompraContexto);
    const [cart, setCart] = useContext(CartContext);
    const navigate = useNavigate();
    const [carrito, setCarrito] = useContext(CartContext)
    const [Pedido,setPedido] = useContext(PedidoContex)

    //const locacion = useLocation();

    let total = 0;
    for(let i = 0; i < carrito.length; i++) {
        total += carrito[i].quantity * carrito[i].precio;
    }

 /*    useEffect(() => {
      setPedido(cart);
      setCart([]);
      manejarEstadoCompra();
  }, [locacion]);
 */
    return (
      <div className="invoice-container">
        <h1>COMPROBANTE:</h1>
        {carrito.map(product => (
          <div key={product.idAlimento}>
            
            <h2 className="product-id">ID: {product.idAlimento}</h2>
            <br />
            <h2 className="product-name">Nombre: {product.nombre}</h2>
            <p className="product-quantity">Cantidad: {product.quantity}</p>
            <p className="product-price">Precio: {product.precio}</p>
          </div>
        ))}
        <h1 className="total-price">total:{total}</h1>
        <button className="back-button" onClick={()=>{
            navigate("/")
            setPedido(cart)
            setCart([])
            manejarEstadoCompra()
        }}>VOLVER A MENU</button>
</div>

    );
};

  export default Ticket;