import React, { useEffect } from "react";
import { ItemList } from "./components/ItemList";
import { Navbar } from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ShoppingCart } from "./components/ShoppingCart";
import { ShoppingCartProvider } from "./contexts/ShoppingCartContext";
import Login from './components/Login'
import Carrito from './components/Carrito'
import Registro from './components/Registro'
import {UsuarioProvider} from './contexts/usuarioContext'
import{CompraProvider} from "./contexts/CompraContex"
import Admin from "./components/Admin";
import Ticket from './components/Ticket'
import {PedidoProvider} from "./contexts/PedidoContex"
import "./styles/AppDiv.css"
import Logueo from "./components/Logueo";
import Ordenes from "./components/Ordenes";
import OrdenBr from "./components/OrdenBr";
import StoreAdmin from "./components/storeAdmin";
import FirebaseImageUpload from "./components/FireBaseImageUpload";
import ConfirmarPedido from "./components/ConfirmarPedido";


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
                  <Route path="/" element={<ItemList />} />
                  <Route path="/cart" element={<ShoppingCart />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/logueo" element={<Logueo />} />
                  <Route path="/carrito" element={<Carrito />} />
                  <Route path="/pedidos" element={<Ordenes />} />
                  <Route path="/foto" element={<FirebaseImageUpload />} />
                  <Route path = "/confirmar" element = {<ConfirmarPedido />} />

                  
                  <Route path="/ordenBr" element={<OrdenBr />} />
                  <Route path="/storeAdmin" element={<StoreAdmin />} />
                  <Route path="/registro" element={<Registro />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/comprobante" element={<Ticket />} /> 
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