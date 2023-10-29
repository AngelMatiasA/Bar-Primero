import React, { useContext } from "react";
import { Link,useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/ShoppingCartContext";
import {usuarioContexto} from '../contexts/usuarioContext'
import NavNormal from './NavNormal'
import NavAdmin from './NavAdmin'
import Cookies from 'universal-cookie';




export const Navbar = () => {
  //recordamos que aqui tenemos el valor actual del carrito
  const [cart, setCart] = useContext(CartContext);
    //////////////////////////////////////////
const [usuarioMenu, setusuarioMenu] = useContext(usuarioContexto)
const navigate=useNavigate()
 const cookies = new Cookies();



  function ManejadorBoton(){
    setusuarioMenu("")
    navigate("/")
    //setCart("")
    
  }
  let sies = 0;
  if(cookies.get("esAdmin") == true){
     sies =1
  }else{
     sies = 0
  }

  
  



  const quantity = cart.reduce((acc, curr) => {
    return acc + curr.quantity;
  }, 0);

  const navStyles = {
    color: "#fff",
    listStyle: "none",
    textDecoration: "none",
    };  

    return (
      <>
      { sies == 0 ? (
        <div>
          <NavNormal/>
        </div>
      ) : (
        sies == 1 ? (
          <div>
            <NavAdmin/>
          </div>
        ) : (
          <div>
            <NavNormal/>
          </div>
        )
      )}
    </>
    );
  
}

