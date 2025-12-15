import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNotificaciones } from './ContextoNotificaciones';

const ContextoAutenticacion = createContext();

export const ProveedorAutenticacion = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const { exito, error, informacion } = useNotificaciones();

  // Cargar usuario guardado al iniciar
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuarioAllSport');
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  const iniciarSesion = (nombreUsuario, clave) => {
    // Validacion basica
    if (nombreUsuario && clave) {
      const datosUsuario = { 
        nombreUsuario, 
        id: Date.now() 
      };
      setUsuario(datosUsuario);
      localStorage.setItem('usuarioAllSport', JSON.stringify(datosUsuario));
      exito(`¡Bienvenido a All Sport, ${nombreUsuario}!`);
      return true;
    }
    error('Por favor ingresa usuario y contraseña');
    return false;
  };

  const cerrarSesion = () => {
    setUsuario(null);
    localStorage.removeItem('usuarioAllSport');
    informacion('Hasta pronto!');
  };

  return (
    <ContextoAutenticacion.Provider value={{ usuario, iniciarSesion, cerrarSesion }}>
      {children}
    </ContextoAutenticacion.Provider>
  );
};

export const useAutenticacion = () => useContext(ContextoAutenticacion);