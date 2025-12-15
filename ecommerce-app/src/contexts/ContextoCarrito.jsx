import React, { createContext, useContext, useState } from 'react';
import { useNotificaciones } from './ContextoNotificaciones';

const ContextoCarrito = createContext();

export const ProveedorCarrito = ({ children }) => {
  const [itemsCarrito, setItemsCarrito] = useState([]);
  const { exito, informacion } = useNotificaciones();

  // Agregar producto al carrito
  const agregarProducto = (producto) => {
    const yaExiste = itemsCarrito.find(item => item.id === producto.id);
    
    if (yaExiste) {
      // Si ya existe, aumentar cantidad
      setItemsCarrito(itemsCarrito.map(item =>
        item.id === producto.id 
          ? { ...item, cantidad: item.cantidad + 1 } 
          : item
      ));
    } else {
      // Si no existe, agregarlo nuevo
      setItemsCarrito([...itemsCarrito, { ...producto, cantidad: 1 }]);
    }
    exito(`${producto.nombre} agregado al carrito`);
  };

  // Quitar producto del carrito
  const quitarProducto = (idProducto) => {
    setItemsCarrito(itemsCarrito.filter(item => item.id !== idProducto));
    informacion('Producto eliminado');
  };

  // Vaciar todo el carrito
  const limpiarCarrito = () => {
    setItemsCarrito([]);
    informacion('Carrito vaciado');
  };

  // Calcular total
  const calcularTotal = itemsCarrito.reduce(
    (suma, item) => suma + (item.precio * item.cantidad), 
    0
  );

  return (
    <ContextoCarrito.Provider value={{ 
      itemsCarrito, 
      agregarProducto, 
      quitarProducto, 
      limpiarCarrito, 
      calcularTotal 
    }}>
      {children}
    </ContextoCarrito.Provider>
  );
};

export const useCarrito = () => useContext(ContextoCarrito);