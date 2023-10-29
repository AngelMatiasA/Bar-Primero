import React, { createContext, useState } from "react";

export const PedidoContex = createContext(null);


export const PedidoProvider = ({ children }) => {
  const [Pedido, setPedido] = useState([]);

  return (
    <PedidoContex.Provider value={[Pedido, setPedido]}>
      {children}
    </PedidoContex.Provider>
  );
};