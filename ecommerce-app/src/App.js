import React, { useState } from 'react';
import { ProveedorNotificaciones } from './contexts/ContextoNotificaciones';
import { ProveedorAutenticacion, useAutenticacion } from './contexts/ContextoAutenticacion';
import { ProveedorProductos } from './contexts/ContextoProductos';
import { ProveedorCarrito, useCarrito } from './contexts/ContextoCarrito';
import PantallaLogin from './components/PantallaLogin';
import SeccionProductos from './pages/SeccionProductos';
import SeccionAdmin from './pages/SeccionAdmin';
import SeccionCarrito from './pages/SeccionCarrito';
import { ShoppingCart, User, LogOut } from 'lucide-react';

function ContenidoApp() {
  const { usuario, cerrarSesion } = useAutenticacion();
  const { itemsCarrito } = useCarrito();
  
  const [seccionActiva, setSeccionActiva] = useState('productos');
  const [textoBusqueda, setTextoBusqueda] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);

  // Si no hay usuario logueado, mostrar login
  if (!usuario) {
    return <PantallaLogin />;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* Barra de navegacion */}
      <nav className="navbar navbar-expand-lg navbar-dark navbar-allsport shadow">
        <div className="container">
          <span className="navbar-brand">
            🏃 ALL SPORT
          </span>
          
          <div className="d-flex align-items-center gap-2 gap-md-3 flex-wrap">
            {/* Botones de navegacion */}
            <button
              className={`btn ${seccionActiva === 'productos' ? 'btn-light' : 'btn-outline-light'} btn-sm`}
              onClick={() => setSeccionActiva('productos')}
            >
              Productos
            </button>
            
            <button
              className={`btn ${seccionActiva === 'admin' ? 'btn-light' : 'btn-outline-light'} btn-sm`}
              onClick={() => setSeccionActiva('admin')}
            >
              Admin
            </button>
            
            {/* Carrito */}
            <button
              className={`btn ${seccionActiva === 'carrito' ? 'btn-light' : 'btn-outline-light'} btn-sm position-relative`}
              onClick={() => setSeccionActiva('carrito')}
            >
              <ShoppingCart size={18} />
              {itemsCarrito.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill badge-carrito">
                  {itemsCarrito.length}
                </span>
              )}
            </button>
            
            {/* Info usuario */}
            <div className="text-white d-none d-md-flex align-items-center">
              <User size={16} className="me-1" />
              <small>{usuario.nombreUsuario}</small>
            </div>
            
            {/* Cerrar sesion */}
            <button 
              className="btn btn-outline-light btn-sm" 
              onClick={cerrarSesion}
              title="Cerrar sesión"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <div className="container py-4">
        {seccionActiva === 'productos' && (
          <SeccionProductos
            textoBusqueda={textoBusqueda}
            cambiarBusqueda={setTextoBusqueda}
            paginaActual={paginaActual}
            cambiarPagina={setPaginaActual}
          />
        )}
        
        {seccionActiva === 'admin' && <SeccionAdmin />}
        
        {seccionActiva === 'carrito' && <SeccionCarrito />}
      </div>
    </div>
  );
}

// Componente principal con todos los providers
function App() {
  return (
    <ProveedorNotificaciones>
      <ProveedorAutenticacion>
        <ProveedorProductos>
          <ProveedorCarrito>
            <ContenidoApp />
          </ProveedorCarrito>
        </ProveedorProductos>
      </ProveedorAutenticacion>
    </ProveedorNotificaciones>
  );
}

export default App;