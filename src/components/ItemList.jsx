import { Item } from "./Item";
import {useState, useEffect} from 'react'
import axios from 'axios';
import "../styles/menuMatts.css"

export const ItemList = () => {
  const [storeItems, setStoreItems] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://www.mytbrendabar.somee.com/api/Alimento/Menu');
      setStoreItems(response.data.respones); // Cambia esta línea
    } catch (error) {
      console.error('Error al obtener los datos: ', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    //console.log(storeItems);
  }, [storeItems]);

  return (
    <>
      {!storeItems ? (
        <p>Cargando datos...</p>
      ) : storeItems.length === 0 ? (
        <p>No hay datos aún</p>
      ) : (
        <div className="items-list">
          {storeItems.map((product, idx) => {
            return <Item key={product.idAlimento} {...product} />;
          })}
        </div>
      )}
    </>
  );
};
