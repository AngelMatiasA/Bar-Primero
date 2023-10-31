import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { usuarioContexto } from "../contexts/usuarioContext";

import "../styles/NavNormalStyles.css";

function NavAdmin() {
  //////////////////////////////////////////
  const [usuarioMenu, setusuarioMenu] = useContext(usuarioContexto);
  const navigate = useNavigate();

  function ManejadorBoton() {
    setusuarioMenu("");
    navigate("/");
    //setCart("")
  }
  return (
    <nav>
      <ul>
        <li>
        <h2>Store</h2>
        </li>
        <li>
              <Link to={"/logueo"}>
                <h2>Logueo</h2>
              </Link>
        </li>
        <li>
              <Link to={"/storeAdmin"}>
                <h2>Store Admin</h2>
              </Link>
        </li>
        <li>
              <Link to={"/ordenBr"}>
                <h2>Ordenes</h2>
              </Link>
        </li>
        <li>
              <Link to={"/carrito"}>
                <h2>carrito</h2>
              </Link>
        </li>
        <li>
              <Link to={"/cerrar"}>
                <h2>Cerrar Sesion</h2>
              </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavAdmin;
