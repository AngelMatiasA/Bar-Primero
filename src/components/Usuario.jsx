import React, { useContext } from "react";
import {usuarioContexto} from '../contexts/usuarioContext'



function Usuario() {

    const [cliente, setcliente] = useState(usuarioContexto)


    setcliente( localStorage.getItem('cliente'))
miUsuario = cliente.name;

}

export default Usuario