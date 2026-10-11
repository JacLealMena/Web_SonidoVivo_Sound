import React from 'react';
import { ROLES } from './store';

/** Renderiza una acción de navegación que actualiza la ruta de la SPA. */
function NavAction({ to, onNavigate, children, className = 'nav-link text-white fw-semibold' }) {
  /** Cambia la ruta al activar un enlace desde el teclado o el mouse. */
  function handleClick() {
    onNavigate(to);
  }

  return <button type="button" className={className} onClick={handleClick}>{children}</button>;
}

/** Muestra la barra de navegación y los accesos relevantes para la sesión actual. */
export default function Navbar({ currentUser, cart, isStorefront, searchQuery, onSearch, onNavigate, onLogout }) {
  const cartCount = cart.reduce((total, item) => total + item.cantidad, 0);
  const homeTarget = currentUser?.rol === ROLES.ADMIN ? '/admin' : currentUser?.rol === ROLES.SELLER ? '/seller' : '/';

  /** Notifica al buscador compartido cuando cambia el texto ingresado. */
  function handleSearch(event) {
    onSearch(event.target.value);
  }

  /** Redirige al acceso apropiado desde el botón de la cuenta. */
  function handleAccountAction() {
    if (currentUser) {
      if (currentUser.rol === ROLES.ADMIN) onNavigate('/admin');
      else if (currentUser.rol === ROLES.SELLER) onNavigate('/seller');
      else onNavigate('/orders');
      return;
    }
    onNavigate('/login');
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        <NavAction to={homeTarget} onNavigate={onNavigate} className="navbar-brand btn btn-link text-warning fw-bold fs-3 text-decoration-none p-0">
          <i className="fa-solid fa-guitar me-2" />Sonido Vivo
        </NavAction>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#soundNavbar" aria-controls="soundNavbar" aria-expanded="false" aria-label="Mostrar navegación">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="soundNavbar">
          {isStorefront && (
            <form className="mx-auto my-2 my-lg-0 w-50" onSubmit={preventFormSubmit}>
              <div className="input-group">
                <input className="form-control" type="search" placeholder="Buscar instrumento..." aria-label="Buscar producto" value={searchQuery} onChange={handleSearch} />
                <button className="btn btn-warning" type="submit" aria-label="Buscar"><i className="fa-solid fa-magnifying-glass" /></button>
              </div>
            </form>
          )}
          <ul className="navbar-nav ms-auto align-items-lg-center gap-2">
            {!currentUser && (
              <>
                <li className="nav-item">
                  <NavAction to="/login" onNavigate={onNavigate}><i className="fa-solid fa-right-to-bracket me-1" /> Iniciar sesión</NavAction>
                </li>
                <li className="nav-item">
                  <NavAction to="/register" onNavigate={onNavigate}><i className="fa-solid fa-user-plus me-1" /> Registro</NavAction>
                </li>
              </>
            )}
            {currentUser && (
              <>
                <li className="nav-item">
                  <button className="btn btn-outline-light btn-sm" type="button" onClick={handleAccountAction}>
                    <i className="fa-solid fa-user me-1" />{currentUser.nombre}
                  </button>
                </li>
                <li className="nav-item">
                  <button className="btn btn-link nav-link text-danger text-decoration-none" type="button" onClick={onLogout}>Cerrar sesión</button>
                </li>
              </>
            )}
            {isStorefront && (
              <li className="nav-item">
                <button className="btn btn-outline-warning position-relative ms-lg-2" type="button" onClick={toggleCartPanel} aria-label={`Abrir carrito, ${cartCount} productos`}>
                  <i className="fa-solid fa-cart-shopping" />
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{cartCount}</span>
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

/** Evita que se recargue la página al enviar el formulario de búsqueda. */
function preventFormSubmit(event) {
  event.preventDefault();
}

/** Abre el panel del carrito desde su botón de navegación. */
function toggleCartPanel() {
  const cartPanel = window.bootstrap?.Offcanvas.getOrCreateInstance(document.getElementById('cartOffcanvas'));
  cartPanel?.show();
}
