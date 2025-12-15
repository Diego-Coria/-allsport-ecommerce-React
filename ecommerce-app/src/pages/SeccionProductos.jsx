import React from 'react';
import { useProductos } from '../contexts/ContextoProductos';
import { useCarrito } from '../contexts/ContextoCarrito';
import { ShoppingCart, Search, AlertCircle } from 'lucide-react';

const SeccionProductos = ({ textoBusqueda, cambiarBusqueda, paginaActual, cambiarPagina }) => {
  const { productos, cargando, errorCarga } = useProductos();
  const { agregarProducto } = useCarrito();
  
  const PRODUCTOS_POR_PAGINA = 6;

  // Filtrar productos segun la busqueda
  const productosFiltrados = productos.filter(p =>
    p.nombre?.toLowerCase().includes(textoBusqueda.toLowerCase()) ||
    p.categoria?.toLowerCase().includes(textoBusqueda.toLowerCase())
  );

  // Calcular productos de la pagina actual
  const indiceInicio = (paginaActual - 1) * PRODUCTOS_POR_PAGINA;
  const indiceFin = indiceInicio + PRODUCTOS_POR_PAGINA;
  const productosActuales = productosFiltrados.slice(indiceInicio, indiceFin);
  const totalPaginas = Math.ceil(productosFiltrados.length / PRODUCTOS_POR_PAGINA);

  return (
    <>
      <h2 className="mb-4" style={{ color: '#333', fontWeight: 'bold' }}>
        🏃 Catálogo de Productos
      </h2>
      
      {/* Barra de busqueda */}
      <div className="mb-4">
        <div className="input-group">
          <span className="input-group-text" style={{ backgroundColor: '#ff6b35', border: 'none' }}>
            <Search size={20} color="white" />
          </span>
          <input
            type="text"
            className="form-control input-buscar"
            placeholder="Busca zapatillas, raquetas, guantes..."
            value={textoBusqueda}
            onChange={(e) => {
              cambiarBusqueda(e.target.value);
              cambiarPagina(1); // volver a pagina 1 al buscar
            }}
          />
        </div>
      </div>

      {/* Estado de carga */}
      {cargando && (
        <div className="text-center py-5">
          <div className="spinner-border text-warning" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Cargando productos...</span>
          </div>
          <p className="mt-3 text-muted">Cargando productos deportivos...</p>
        </div>
      )}

      {/* Error */}
      {errorCarga && (
        <div className="alert alert-danger d-flex align-items-center">
          <AlertCircle size={24} className="me-2" />
          <div>
            <strong>Error!</strong> {errorCarga}
          </div>
        </div>
      )}

      {/* Productos */}
      {!cargando && !errorCarga && (
        <>
          {productosActuales.length === 0 ? (
            <div className="alert alert-info text-center">
              No se encontraron productos. Prueba con otra búsqueda.
            </div>
          ) : (
            <div className="row g-4">
              {productosActuales.map(producto => (
                <div key={producto.id} className="col-12 col-sm-6 col-lg-4">
                  <div className="card tarjeta-producto h-100">
                    {producto.imagen && (
                      <img
                        src={producto.imagen}
                        className="card-img-top img-producto"
                        alt={producto.nombre}
                      />
                    )}
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{producto.nombre}</h5>
                      <p className="text-muted small mb-2">
                        <strong>{producto.categoria}</strong>
                      </p>
                      <p className="card-text flex-grow-1">{producto.descripcion}</p>
                      <h4 className="precio-producto mb-3">${producto.precio}</h4>
                      <button
                        className="btn btn-allsport w-100"
                        onClick={() => agregarProducto(producto)}
                      >
                        <ShoppingCart size={18} className="me-2" />
                        Agregar al Carrito
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Paginador */}
          {totalPaginas > 1 && (
            <nav className="mt-5">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${paginaActual === 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => cambiarPagina(paginaActual - 1)}
                  >
                    Anterior
                  </button>
                </li>
                
                {[...Array(totalPaginas)].map((_, i) => (
                  <li key={i} className={`page-item ${paginaActual === i + 1 ? 'active' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => cambiarPagina(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
                
                <li className={`page-item ${paginaActual === totalPaginas ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => cambiarPagina(paginaActual + 1)}
                  >
                    Siguiente
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </>
      )}
    </>
  );
};

export default SeccionProductos;