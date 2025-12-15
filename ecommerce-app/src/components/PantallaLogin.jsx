import React, { useState } from 'react';
import { useAutenticacion } from '../contexts/ContextoAutenticacion';
import { LogIn, User } from 'lucide-react';

const PantallaLogin = () => {
  const { iniciarSesion } = useAutenticacion();
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [clave, setClave] = useState('');

  const manejarLogin = () => {
    iniciarSesion(nombreUsuario, clave);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-lg" style={{ borderRadius: '15px', border: 'none' }}>
            <div className="card-body p-4">
              {/* Logo y titulo */}
              <div className="text-center mb-4">
                <div style={{
                  backgroundColor: '#ff6b35',
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px'
                }}>
                  <User size={40} color="white" />
                </div>
                <h2 style={{ color: '#333', fontWeight: 'bold' }}>ALL SPORT</h2>
                <p className="text-muted">Tu tienda deportiva online</p>
              </div>

              {/* Formulario */}
              <div>
                <div className="mb-3">
                  <label className="form-label" style={{ fontWeight: '600' }}>Usuario</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ingresa tu usuario"
                    value={nombreUsuario}
                    onChange={(e) => setNombreUsuario(e.target.value)}
                    style={{ borderRadius: '8px' }}
                  />
                </div>
                
                <div className="mb-4">
                  <label className="form-label" style={{ fontWeight: '600' }}>Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Ingresa tu contraseña"
                    value={clave}
                    onChange={(e) => setClave(e.target.value)}
                    style={{ borderRadius: '8px' }}
                  />
                </div>
                
                <button 
                  type="button" 
                  className="btn btn-allsport w-100"
                  onClick={manejarLogin}
                  style={{ borderRadius: '8px', padding: '12px' }}
                >
                  <LogIn size={18} className="me-2" />
                  Iniciar Sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PantallaLogin;