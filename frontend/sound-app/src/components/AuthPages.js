import React, { useState } from 'react';
import { showMessage } from './store';

/** Renderiza el formulario de acceso o de registro, según la vista solicitada. */
export default function AuthPages({ mode, onLogin, onRegister, onNavigate }) {
  const isLogin = mode === 'login';
  const [formData, setFormData] = useState({ nombre: '', email: isLogin ? 'admin@sonidovivo.cl' : '', password: isLogin ? '123456' : '' });

  /** Actualiza un campo del formulario de autenticación. */
  function handleFieldChange(event) {
    const { name, value } = event.target;
    setFormData((previousData) => ({ ...previousData, [name]: value }));
  }

  /** Valida el formulario y entrega las credenciales al proceso adecuado. */
  function handleSubmit(event) {
    event.preventDefault();
    if (!formData.email.trim() || !formData.password || (!isLogin && !formData.nombre.trim())) {
      showMessage({ icon: 'error', title: 'Faltan datos', text: 'Completa todos los campos requeridos.' });
      return;
    }
    if (isLogin) onLogin(formData.email, formData.password);
    else onRegister(formData);
  }

  /** Devuelve al comprador a la tienda. */
  function handleReturnToStore() {
    onNavigate('/');
  }

  return (
    <main className="auth-page bg-light d-flex align-items-center py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5 col-xl-4">
            <div className="card shadow-sm border-0 rounded-4">
              <div className="card-body p-4 p-md-5">
                <h1 className="h3 fw-bold mb-4 text-center">{isLogin ? 'Iniciar sesión' : 'Crear Cuenta'}</h1>
                <form onSubmit={handleSubmit}>
                  {!isLogin && (
                    <label className="form-label fw-semibold w-100 mb-3">Nombre Completo
                      <input className="form-control mt-1" name="nombre" value={formData.nombre} onChange={handleFieldChange} autoComplete="name" required />
                    </label>
                  )}
                  <label className="form-label fw-semibold w-100 mb-3">Correo electrónico
                    <input className="form-control mt-1" name="email" type="email" value={formData.email} onChange={handleFieldChange} autoComplete="email" required />
                  </label>
                  <label className="form-label fw-semibold w-100 mb-4">Contraseña
                    <input className="form-control mt-1" name="password" type="password" minLength={isLogin ? undefined : 6} value={formData.password} onChange={handleFieldChange} autoComplete={isLogin ? 'current-password' : 'new-password'} required />
                  </label>
                  <button type="submit" className={`btn ${isLogin ? 'btn-dark' : 'btn-warning'} w-100 py-2 fw-semibold`}>
                    {isLogin ? 'Ingresar' : 'Registrarse'}
                  </button>
                </form>
                <div className="text-center mt-3">
                  <button type="button" className="btn btn-link text-secondary text-decoration-none small" onClick={handleReturnToStore}>Volver a la tienda</button>
                  <p className="mb-0 small">
                    {isLogin ? '¿Aún no tienes cuenta?' : '¿Ya tienes una cuenta?'}{' '}
                    <button type="button" className="btn btn-link p-0 small" onClick={toggleAuthMode}>{isLogin ? 'Regístrate' : 'Inicia sesión'}</button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );

  /** Cambia entre acceso y registro sin abandonar la SPA. */
  function toggleAuthMode() {
    onNavigate(isLogin ? '/register' : '/login');
  }
}
