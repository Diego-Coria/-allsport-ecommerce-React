import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNotificaciones } from './ContextoNotificaciones';

const ContextoProductos = createContext();

export const ProveedorProductos = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [errorCarga, setErrorCarga] = useState(null);
  const { exito, error: errorNotif } = useNotificaciones();

  const URL_API = 'https://693f9ef612c964ee6b7078d4.mockapi.io/productos';

  // Cargar productos al inicio
  const cargarProductos = async () => {
    setCargando(true);
    setErrorCarga(null);
    try {
      const respuesta = await fetch(URL_API);
      if (!respuesta.ok) throw new Error('Error al cargar productos');
      const datos = await respuesta.json();
      setProductos(datos);
    } catch (err) {
      setErrorCarga(err.message);
      errorNotif('No se pudieron cargar los productos');
    } finally {
      setCargando(false);
    }
  };

  // Crear nuevo producto
  const crearProducto = async (nuevoProducto) => {
    try {
      const respuesta = await fetch(URL_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoProducto)
      });
      if (!respuesta.ok) throw new Error('Error al crear producto');
      const productoCreado = await respuesta.json();
      setProductos([...productos, productoCreado]);
      exito('Producto agregado correctamente');
      return true;
    } catch (err) {
      errorNotif('Error al agregar producto');
      return false;
    }
  };

  // Modificar producto existente
  const modificarProducto = async (id, productoModificado) => {
    try {
      const respuesta = await fetch(`${URL_API}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productoModificado)
      });
      if (!respuesta.ok) throw new Error('Error al modificar');
      const productoActualizado = await respuesta.json();
      setProductos(productos.map(p => p.id === id ? productoActualizado : p));
      exito('Producto actualizado');
      return true;
    } catch (err) {
      errorNotif('Error al actualizar producto');
      return false;
    }
  };

  // Eliminar producto
  const eliminarProducto = async (id) => {
    try {
      const respuesta = await fetch(`${URL_API}/${id}`, {
        method: 'DELETE'
      });
      if (!respuesta.ok) throw new Error('Error al eliminar');
      setProductos(productos.filter(p => p.id !== id));
      exito('Producto eliminado');
      return true;
    } catch (err) {
      errorNotif('Error al eliminar producto');
      return false;
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  return (
    <ContextoProductos.Provider value={{
      productos,
      cargando,
      errorCarga,
      crearProducto,
      modificarProducto,
      eliminarProducto,
      cargarProductos
    }}>
      {children}
    </ContextoProductos.Provider>
  );
};

export const useProductos = () => useContext(ContextoProductos);