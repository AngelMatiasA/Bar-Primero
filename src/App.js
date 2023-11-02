import React, { useEffect } from "react";
import { Navbar } from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ShoppingCartProvider } from "./contexts/ShoppingCartContext";
import Carrito from './components/Carrito'
import Registro from './components/Registro'
import {UsuarioProvider} from './contexts/usuarioContext'
import{CompraProvider} from "./contexts/CompraContex"
import Admin from "./components/Admin";
import {PedidoProvider} from "./contexts/PedidoContex"
import "./styles/AppDiv.css"
import Logueo from "./components/Logueo";
import Ordenes from "./components/Ordenes";
import OrdenBr from "./components/OrdenBr";
import StoreAdmin from "./components/storeAdmin";
import FirebaseImageUpload from "./components/FireBaseImageUpload";
import ConfirmarPedido from "./components/ConfirmarPedido";
import Verificacion from "./components/verificacion";
import CerrarSesion from "./components/CerrarSesion";


const App = () => {
  return (
    <div className="contenedor-Dom">
      <PedidoProvider >
        <CompraProvider>
          <UsuarioProvider>
            <ShoppingCartProvider>
              <Router>
                <Navbar />
                <Routes>
              
                  <Route path="/logueo" element={<Logueo />} />
                  <Route path="/carrito" element={<Carrito />} />
                  <Route path="/pedidos" element={<Ordenes />} />
                  <Route path="/foto" element={<FirebaseImageUpload />} />
                  <Route path = "/confirmar" element = {<ConfirmarPedido />} />
                  <Route path = "/verificacion" element = {<Verificacion />} />
                  <Route path = "/cerrar" element = {<CerrarSesion />} />

                  
                  <Route path="/ordenBr" element={<OrdenBr />} />
                  <Route path="/storeAdmin" element={<StoreAdmin />} />
                  <Route path="/registro" element={<Registro />} />
                  
                  <Route path="/admin" element={<Admin />} />
                </Routes>
              </Router>
            </ShoppingCartProvider>
          </UsuarioProvider>
        </CompraProvider>
      </PedidoProvider>
    </div>
  );
}
export default App;;