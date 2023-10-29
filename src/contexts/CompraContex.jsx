


import React, { createContext, useState } from 'react';

export const CompraContexto = createContext();

export const CompraProvider = (props) => {
    const [estadoCompra, setEstadoCompra] = useState(false);

    const manejarEstadoCompra = () => {
       if(estadoCompra ===false){
        setEstadoCompra(true);
       }else{

        setEstadoCompra(false);
       }
    }

    return (
        <CompraContexto.Provider value={{ estadoCompra, manejarEstadoCompra }}>
            {props.children}
        </CompraContexto.Provider>
    );
}