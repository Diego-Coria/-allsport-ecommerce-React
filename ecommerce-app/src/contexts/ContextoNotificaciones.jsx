import React, { createContext, useContext, useState } from 'react';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';

const ContextoNotificaciones = createContext();

export const ProveedorNotificaciones = ({ children }) => {
  const [notificaciones, setNotificaciones] = useState([]);

  // Funcion para mostrar notificaciones
  const mostrarMensaje = (texto, tipo = 'info') => {
    const id = Date.now();
    setNotificaciones(previas => [...previas, { id, texto, tipo }]);
    
    // Auto eliminar despues de 3 segundos
    setTimeout(() => {
      setNotificaciones(previas => previas.filter(n => n.id !== id));
    }, 3000);
  };

  const exito = (texto) => mostrarMensaje(texto, 'exito');
  const error = (texto) => mostrarMensaje(texto, 'error');
  const informacion = (texto) => mostrarMensaje(texto, 'info');

  return (
    <ContextoNotificaciones.Provider value={{ exito, error, informacion }}>
      {children}
      
      {/* Contenedor de notificaciones */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        {notificaciones.map(notif => (
          <div
            key={notif.id}
            className={`alert alert-${notif.tipo === 'exito' ? 'success' : notif.tipo === 'error' ? 'danger' : 'info'} d-flex align-items-center`}
            style={{
              minWidth: '320px',
              animation: 'aparecer 0.3s ease-out',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              borderRadius: '8px'
            }}
          >
            {notif.tipo === 'exito' && <CheckCircle size={20} className="me-2" />}
            {notif.tipo === 'error' && <AlertCircle size={20} className="me-2" />}
            {notif.tipo === 'info' && <Info size={20} className="me-2" />}
            {notif.texto}
          </div>
        ))}
      </div>
    </ContextoNotificaciones.Provider>
  );
};

export const useNotificaciones = () => useContext(ContextoNotificaciones);