import React, { useState } from 'react';
import { useProductos } from '../contexts/ContextoProductos';
import FormularioProducto from '../components/FormularioProducto';
import VentanaConfirmacion from '../components/VentanaConfirmacion';
import { Edit2, Trash2 } from 'lucide-react';

const SeccionAdmin = () => {
  const { productos, eliminarProducto } = useProductos();
  const [productoEdicion, setProductoEdicion] = useState(null);
  const [ventanaEliminar, setVentanaEliminar] = useState({ abierta: false, idProducto: null });

  const confirmarEliminacion = async () => {
    await eliminarProducto(ventanaEliminar.idProducto);
    setVentanaEliminar({ abierta: false, idProducto: null });
  };

  return (
    <>
      <h2 className="mb-4" style={{ color: '#333', fontWeight: 'bold' }}>
        ⚙️ Panel de Administración
      </h2>
      
      {/* Formulario */}
      <div className="card shadow mb-4" style={{ borderRadius: '15px', border: 'none' }}>
        <div className="card-body p-4">
          <h5 className="card-title mb-3" style={{ color: '#ff6b35' }}>
            {productoEdicion ? '✏️ Editar Producto' : '➕ Agregar Nuevo Producto'}
          </h5>
          <FormularioProducto
            productoParaEditar={productoEdicion}
            alTerminar={() => setProductoEdicion(null)}
          />
          {productoEdicion && (
            <button
              className="btn btn-allsport-secondary mt-2"
              onClick={() => setProductoEdicion(null)}
            >
              Cancelar Edición
            </button>
          )}
        </div>
      </div>

      {/* Tabla de productos */}
      <h5 className="mb-3">📋 Listado de Productos</h5>
      <div className="card shadow tabla-admin">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead style={{ backgroundColor: '#f8f9fa' }}>
              <tr>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th style={{ width: '150px' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map(prod => (
                <tr key={prod.id}>
                  <td>
                    <strong>{prod.nombre}</strong>
                  </td>
                  <td>
                    <span className="badge bg-secondary">{prod.categoria}</span>
                  </td>
                  <td style={{ color: '#ff6b35', fontWeight: 'bold' }}>
                    ${prod.precio}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => setProductoEdicion(prod)}
                      title="Editar producto"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => setVentanaEliminar({ abierta: true, idProducto: prod.id })}
                      title="Eliminar producto"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de confirmacion */}
      <VentanaConfirmacion
        abierta={ventanaEliminar.abierta}
        alCerrar={() => setVentanaEliminar({ abierta: false, idProducto: null })}
        alConfirmar={confirmarEliminacion}
        mensaje="Este producto se eliminará permanentemente del catálogo."
      />
    </>
  );
};

export default SeccionAdmin;