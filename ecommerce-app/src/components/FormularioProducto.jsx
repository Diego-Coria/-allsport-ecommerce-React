import React, { useState, useEffect } from 'react';
import { useProductos } from '../contexts/ContextoProductos';
import { useNotificaciones } from '../contexts/ContextoNotificaciones';
import { Plus } from 'lucide-react';

const FormularioProducto = ({ productoParaEditar, alTerminar }) => {
  const { crearProducto, modificarProducto } = useProductos();
  const { error } = useNotificaciones();
  
  const [datosForm, setDatosForm] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
    categoria: '',
    imagen: ''
  });
  
  const [erroresForm, setErroresForm] = useState({});

  // Si hay producto para editar, cargar sus datos
  useEffect(() => {
    if (productoParaEditar) {
      setDatosForm(productoParaEditar);
    }
  }, [productoParaEditar]);

  // Validar el formulario antes de enviar
  const validarDatos = () => {
    const errores = {};

    if (!datosForm.nombre.trim()) {
      errores.nombre = 'El nombre es obligatorio';
    }

    if (!datosForm.precio || parseFloat(datosForm.precio) <= 0) {
      errores.precio = 'El precio debe ser mayor a 0';
    }

    if (!datosForm.descripcion || datosForm.descripcion.length < 10) {
      errores.descripcion = 'La descripción debe tener al menos 10 caracteres';
    }

    if (!datosForm.categoria.trim()) {
      errores.categoria = 'Debes elegir una categoría';
    }

    setErroresForm(errores);
    return Object.keys(errores).length === 0;
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    
    // Validar primero
    if (!validarDatos()) {
      error('Revisa los campos del formulario');
      return;
    }

    const producto = {
      ...datosForm,
      precio: parseFloat(datosForm.precio)
    };

    let resultado;
    if (productoParaEditar) {
      // Actualizar producto existente
      resultado = await modificarProducto(productoParaEditar.id, producto);
    } else {
      // Crear producto nuevo
      resultado = await crearProducto(producto);
    }

    if (resultado) {
      // Limpiar formulario
      setDatosForm({ nombre: '', precio: '', descripcion: '', categoria: '', imagen: '' });
      setErroresForm({});
      if (alTerminar) alTerminar();
    }
  };

  const cambiarCampo = (e) => {
    setDatosForm({ ...datosForm, [e.target.name]: e.target.value });
  };

  return (
    <div className="mb-4">
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Nombre del Producto *</label>
          <input
            type="text"
            className={`form-control ${erroresForm.nombre ? 'is-invalid' : ''}`}
            name="nombre"
            placeholder="Ej: Zapatillas Nike Air"
            value={datosForm.nombre}
            onChange={cambiarCampo}
          />
          {erroresForm.nombre && <div className="invalid-feedback">{erroresForm.nombre}</div>}
        </div>

        <div className="col-md-6">
          <label className="form-label">Precio *</label>
          <input
            type="number"
            step="0.01"
            className={`form-control ${erroresForm.precio ? 'is-invalid' : ''}`}
            name="precio"
            placeholder="0.00"
            value={datosForm.precio}
            onChange={cambiarCampo}
          />
          {erroresForm.precio && <div className="invalid-feedback">{erroresForm.precio}</div>}
        </div>

        <div className="col-md-6">
          <label className="form-label">Categoría *</label>
          <select
            className={`form-control ${erroresForm.categoria ? 'is-invalid' : ''}`}
            name="categoria"
            value={datosForm.categoria}
            onChange={cambiarCampo}
          >
            <option value="">Selecciona una categoría</option>
            <option value="Zapatillas">Zapatillas</option>
            <option value="Camisetas">Camisetas</option>
            <option value="Raquetas">Raquetas</option>
            <option value="Guantes">Guantes</option>
            <option value="Accesorios">Accesorios</option>
          </select>
          {erroresForm.categoria && <div className="invalid-feedback">{erroresForm.categoria}</div>}
        </div>

        <div className="col-md-6">
          <label className="form-label">URL de Imagen</label>
          <input
            type="url"
            className="form-control"
            name="imagen"
            placeholder="https://ejemplo.com/imagen.jpg"
            value={datosForm.imagen}
            onChange={cambiarCampo}
          />
        </div>

        <div className="col-12">
          <label className="form-label">Descripción *</label>
          <textarea
            className={`form-control ${erroresForm.descripcion ? 'is-invalid' : ''}`}
            name="descripcion"
            rows="3"
            placeholder="Describe el producto..."
            value={datosForm.descripcion}
            onChange={cambiarCampo}
          />
          {erroresForm.descripcion && <div className="invalid-feedback">{erroresForm.descripcion}</div>}
        </div>

        <div className="col-12">
          <button type="button" className="btn btn-allsport" onClick={manejarEnvio}>
            <Plus size={18} className="me-2" />
            {productoParaEditar ? 'Actualizar Producto' : 'Agregar Producto'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormularioProducto;