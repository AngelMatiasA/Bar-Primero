import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/ShoppingCartContext";
import { usuarioContexto } from "../contexts/usuarioContext";
import { CompraContexto } from "../contexts/CompraContex";
import "../styles/NavNormalStyles.css";
import { PedidoContex } from "../contexts/PedidoContex";

///esta es una libreria para iconos
import { FcShipped } from "react-icons/fc";

function NavNormal() {
  //recordamos que aqui tenemos el valor actual del carrito
  const [cart, setCart] = useContext(CartContext);
  //////////////////////////////////////////
  const [usuarioMenu, setusuarioMenu] = useContext(usuarioContexto);
  const { estadoCompra, manejarEstadoCompra } = useContext(CompraContexto);
  /////////////////////////////////////////
  const [Pedido, setPedido] = useContext(PedidoContex);

  const navigate = useNavigate();

  function ManejadorBoton() {
    setusuarioMenu("");
    setCart([]);
    navigate("/");
    setPedido([]);
    //setCart("")
  }

  const quantity = cart.reduce((acc, curr) => {
    return acc + curr.quantity;
  }, 0);
  

  /*   const navStyles = {
    color: "#fff",
    listStyle: "none",
    textDecoration: "none",
  }; */

  function cambiarEstado() {
    // setCompra(true);
    // return <Hijo cambiarEstado={cambiarEstado} />;
  }

  return (
    <>
      {estadoCompra === true ? (
        <>
          <h1>tu comprobante😘😘😘</h1>
        </>
      ) : (
        <>
          <nav>
            <ul>
              <li>
                <Link to={"/"}>
                  <h2>Store</h2>
                </Link>
              </li>
              
              <li>
                <Link to={"/login"}>
                  <h2>Login</h2>
                </Link>
              </li>
              <li>
                <Link to={"/logueo"}>
                  <h2>Logueo</h2>
                </Link>
              </li>
              <li>
                <Link to={"/carrito"}>
                  <h2>carrito</h2>
                </Link>
              </li>
              <li>
                {quantity === 0 ? (
                  <>
                    <h2>Cart items:</h2> <span className="cart-count">{quantity}</span>
                  </>
                ) : (
                  <Link to={"/cart"}>
                    <h2>Cart items:</h2> <span className="cart-count">{quantity}</span>
                  </Link>
                )}
              </li>
              <li>
                {usuarioMenu.length === 0 ? (
                  <Link to={"/login"}>
                    {" "}
                    <h2>logueate</h2>
                  </Link>
                ) : (
                  <>
                  <h2>{usuarioMenu.nombre}</h2>
                    <button onClick={ManejadorBoton}>cerrar secion</button>
                  </>
                )}
              </li>
              <li>
                {Pedido.length === 0 ? (
                  <>
                    <h2>no hay nda</h2>
                  </>
                ) : (
                  <>
                   
                    <div id="backpack-icon" class="dropbtn">
                    <h4 id="order-title">Tu Orden bb</h4>
                      <FcShipped />
                    </div>
                    <div id="dropdown-content">
                      {Pedido.map((item) => (
                        <p key={item.idAlimento}>
                          {item.nombre}  <br />
                          cant:{item.quantity}
                        </p>
                      ))}
                    </div>
                  </>
                )}
              </li>
            </ul>
          </nav>
        </>
      )}
    </>
  );
}

export default NavNormal;
