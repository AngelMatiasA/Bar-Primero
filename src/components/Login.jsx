import "../styles/login.css";
import logo from "../img/delivery.png";
import { Apiurl } from "../service/apirest.js";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
//import usarios from "../data/usuarios.json";
import { useState, useEffect } from "react";
//////////////////////////////////////////
import { usuarioContexto } from "../contexts/usuarioContext";
import React, { useContext } from "react";
//import { CartContext } from "../contexts/ShoppingCartContext";

/////////////////////////////////////
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();

  const [cliente, setcliente] = useContext(usuarioContexto);
  const [customers, setcustomers] = useState([]);
  const [form, setForm] = useState({
    usuario: "",
    password: "",
  });

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  ///////////////////////////////////////////////////////////////

  function manejadorChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }
  ///////////////////////////////
  const mostrarAdvertencia = () => {
    toast.warn(
      "Usuario o Contraseña incorrectos\n Registrate si no tienes usuario",
      {
        position: "top-center", // Posición de la notificación
        autoClose: 3000, // Duración en milisegundos
        hideProgressBar: false, // Mostrar barra de progreso
        closeOnClick: true, // Cerrar al hacer clic
        pauseOnHover: true, // Pausar al pasar el mouse
        draggable: true, // Arrastrable
      }
    );
  };
  ////////////////////////

  function ManejadorBoton(nombre, password) {
    const usuarioEncontrado = customers.find(
      (usuario) => usuario.nombre === nombre
    );

    if (usuarioEncontrado) {
      console.log("Usuario encontrado");
      localStorage.setItem("usuario", JSON.stringify(usuarioEncontrado));
      setcliente(usuarioEncontrado);

      if (usuarioEncontrado.usuario && usuarioEncontrado.usuario.admin === true) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } else {
      console.log("Usuario no encontrado");
      mostrarAdvertencia();
    }
}

  ////////////////////////

  function manejadorSubmit(e) {
    e.preventDefault();
    ManejadorBoton(form.usuario, form.password);
  }
  /////////////////////////////////
  const fetchData = async () => {
    try {
      const response = await axios.get('https://www.mytbrendabar.somee.com/api/Usuario/Usuarios');
      setcustomers(response.data.respones); // Cambia esta línea
    } catch (error) {
      console.error('Error al obtener los datos: ', error);
    }
  };
////////////////////////////////////////
useEffect(() => {
  fetchData();
}, []);
////////////////////////////////
 useEffect(() => {
  console.log(customers);
}, [customers]);




  return (
    <>
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <div className="fadeIn first">
            <br />
            <br />
            <img src={logo} width="100px" alt="User Icon" />
            <br />
            <br />
          </div>
          <form onSubmit={manejadorSubmit}>
            <input
              type="text"
              className="fadeIn second"
              name="usuario"
              onChange={manejadorChange}
              placeholder="login"
            />
            <input
              type="password"
              className="fadeIn third"
              name="password"
              onChange={manejadorChange}
              placeholder="password"
            />
            <input type="submit" className="fadeIn fourth" value="Log In" />
            <Link to="/registro">
              <input
                type="submit"
                className="fadeIn fourth"
                value="registrarse"
              />
            </Link>
          </form>
          <div id="formFooter">
            <a
              className="underlineHover"
              href="https://lapaginamillonaria.com/"
              target="_blank"
            >
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Login;

/* function ManejadorBoton() {
  let Url = Apiurl + "auth";
  console.log("enviado");
  axios.post(Url, form).then(response => {
    console.log(response);
    // Suponiendo que el token se encuentra en response.data.token
    const token = response.data.token;
    // Guardar el token en localStorage
    localStorage.setItem('userToken', token);
  });
} */

/* function ManejadorBoton() {
  let Url = Apiurl + "auth";
  console.log("enviado");
  console.log(form)
  axios.post(Url, form)
    .then(response => {
      // console.log(response);
      if(response.status === 200) {
        // Suponiendo que el token se encuentra en response.data.token
        const token = response.data.token;
        // Guardar el token en localStorage
        localStorage.setItem('userToken', token);
        // Add your logic here when status is 200
      } else {
        // Handle other status codes here
      }
    })
    .catch(error => {
      console.error(error);
      // Handle error here
    });
}
 */

/* function ManejadorBoton(){

  let Url= Apiurl + "auth"
  console.log("enviado")
  axios.post(Url,form).then(response=>{
    console.log(response.status)
  })
  
} */
