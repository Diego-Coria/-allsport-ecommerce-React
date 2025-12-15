import React from 'react';
import { useCarrito } from '../contexts/ContextoCarrito';
import { Trash2, ShoppingBag } from 'lucide-react';

const SeccionCarrito = () => {
  const { itemsCarrito, quitarProducto, limpiarCarrito, calcularTotal } = useCarrito();

  return (
    <>
      <h2 className="mb-4" style={{ color: '#333', fontWeight: 'bold' }}>
        🛒 Mi Carrito de Compras
      </h2>
      
      {itemsCarrito.length === 0 ? (
        <div className="alert alert-info d-flex align-items-center">
          <ShoppingBag size={24} className="me-3" />
          <div>
            <strong>Tu carrito está vacío</strong>
            <p className="mb-0">¡Agrega productos para comenzar tu compra!</p>
          </div>
        </div>
      ) : (
        <>
          {/* Items del carrito */}
          <div className="row g-3 mb-4">
            {itemsCarrito.map(item => (
              <div key={item.id} className="col-12">
                <div className="card shadow-sm" style={{ borderRadius: '10px' }}>
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-md-7">
                        <h5 className="mb-1">{item.nombre}</h5>
                        <p className="text-muted mb-0">
                          <small>{item.categoria}</small>
                        </p>
                        <p className="mb-0 mt-2">
                          <strong>Cantidad:</strong> {item.cantidad} unidad{item.cantidad > 1 ? 'es' : ''}
                        </p>
                      </div>
                      <div className="col-md-3 text-md-end">
                        <p className="text-muted mb-1 small">Precio unitario: ${item.precio}</p>
                        <h5 className="precio-producto mb-0">
                          ${(item.precio * item.cantidad).toFixed(2)}
                        </h5>
                      </div>
                      <div className="col-md-2 text-end">
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => quitarProducto(item.id)}
                          title="Eliminar del carrito"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen y total */}
          <div className="card shadow-lg" style={{ borderRadius: '15px', border: 'none' }}>
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-0">Total a pagar:</h4>
                <h2 className="precio-producto mb-0">${calcularTotal.toFixed(2)}</h2>
              </div>
              
              <hr />
              
              <div className="d-flex gap-2 mt-3">
                <button 
                  className="btn btn-danger" 
                  onClick={limpiarCarrito}
                >
                  <Trash2 size={18} className="me-2" />
                  Vaciar Carrito
                </button>
                <button className="btn btn-allsport flex-grow-1">
                  <ShoppingBag size={18} className="me-2" />
                  Finalizar Compra
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SeccionCarrito;