import React from 'react';

const VentanaConfirmacion = ({ abierta, alCerrar, alConfirmar, mensaje }) => {
  if (!abierta) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div className="modal-contenido" style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '15px',
        maxWidth: '420px',
        width: '90%'
      }}>
        <h5 style={{ marginBottom: '1rem', color: '#333' }}>¿Estás seguro?</h5>
        <p style={{ color: '#666' }}>{mensaje}</p>
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          justifyContent: 'flex-end', 
          marginTop: '1.5rem' 
        }}>
          <button className="btn btn-secondary" onClick={alCerrar}>
            Cancelar
          </button>
          <button className="btn btn-danger" onClick={alConfirmar}>
            Sí, eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default VentanaConfirmacion;