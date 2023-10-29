import React, { createContext, useState } from "react";

export const usuarioContexto = createContext(null);


export const UsuarioProvider = ({ children }) => {
  const [usuario, setUsuario] = useState([]);

  return (
    <usuarioContexto.Provider value={[usuario, setUsuario]}>
      {children}
    </usuarioContexto.Provider>
  );
};

