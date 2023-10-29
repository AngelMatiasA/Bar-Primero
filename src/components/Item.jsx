import React, { useContext } from "react";
import { CartContext } from "../contexts/ShoppingCartContext";
import "../styles/items.css"

///aqui recibo todas las propiedades de productos
export const Item = ({ nombre, precio, idAlimento, img }) => {
  //cart contiene el valor de cartContext que es un arreglo vacio
  
  const [cart, setCart] = useContext(CartContext);

  const addToCart = () => {
//currItems contiene el valor actual de cart
    setCart((currItems) => {
      const isItemsFound = currItems.find((item) => item.idAlimento === idAlimento);
      //item es una variable de control
      if (isItemsFound) {
        return currItems.map((item) => {
          if (item.idAlimento === idAlimento) {
            return { ...item, quantity: item.quantity + 1 ,nombre};
          } else {
            return item;
          }
        });
      } else {
        return [...currItems, { idAlimento, quantity: 1, precio,nombre }];
      }
    });
  };

  const removeItem = (id) => {
    setCart((currItems) => {
      if (currItems.find((item) => item.idAlimento === idAlimento)?.quantity === 1) {
        return currItems.filter((item) => item.idAlimento !== idAlimento);
      } else {
        return currItems.map((item) => {
          if (item.idAlimento === idAlimento) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const getQuantityById = (id) => {
    return cart.find((item) => item.idAlimento === idAlimento)?.quantity || 0;
  };

  const quantityPerItem = getQuantityById(idAlimento);

  return (
  <>
    <div className="cont-alimento">
    <div className="alimento">
      {quantityPerItem > 0 && (
        <div className="item-quantity">{quantityPerItem}</div>
      )}

      <div>{nombre}</div>
      <img src={img} width="80" height="55" />
      <div className="item-price">${precio}</div>

      {quantityPerItem === 0 ? (
        <button className="item-add-button" onClick={() => addToCart()}>
          + Añadir
        </button>
      ) : (
        <button className="item-plus-button" onClick={() => addToCart()}>
          + Sumar
        </button>
      )}

      {quantityPerItem > 0 && (
        <button className="item-minus-button" onClick={() => removeItem(idAlimento)}>
          -Restar
        </button>
      )}
    </div>
    </div>
    </>
  );
};
