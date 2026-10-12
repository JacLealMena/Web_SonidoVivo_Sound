import React, { useEffect, useMemo, useRef, useState } from 'react';
import CatalogProductCard from './CatalogProductCard';
import { CheckoutError } from './CheckoutResult';
import { CATEGORIES, formatCLP, getSalePrice, showMessage } from './store';

/** Muestra catálogo, filtros, carrito y formulario de compra de la tienda. */
export default function Storefront({ products, cart, currentUser, searchQuery, onAddToCart, onCartQuantity, onRemoveFromCart, onCheckout, onNavigate }) {
  const [category, setCategory] = useState('Todos');
  const [delivery, setDelivery] = useState('retiro');
  const [checkoutData, setCheckoutData] = useState({ name: currentUser?.nombre || '', phone: '', email: currentUser?.email || '', address: '' });
  const [checkoutError, setCheckoutError] = useState('');
  const filteredProducts = useMemo(() => products.filter((product) => {
    const matchesCategory = category === 'Todos' || product.categoria === category;
    const matchesSearch = product.nombre.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }), [category, products, searchQuery]);
  const cartCount = cart.reduce((total, item) => total + item.cantidad, 0);
  const displayedCart = cart.map((item) => {
    const currentProduct = products.find((product) => product.id === item.id);
    return currentProduct
      ? { ...currentProduct, precioOriginal: currentProduct.precio, precio: getSalePrice(currentProduct), cantidad: item.cantidad }
      : item;
  });
  const cartTotal = displayedCart.reduce((total, item) => total + item.precio * item.cantidad, 0);

  /** Abre el checkout después de confirmar que el carrito se puede pagar. */
  function handleOpenCheckout() {
    setCheckoutError('');
    if (!cart.length) {
      showMessage({ icon: 'info', title: 'Carrito vacío', text: 'Agrega al menos un producto antes de proceder al pago.' });
      return;
    }

    if (!currentUser) {
      showMessage({ icon: 'info', title: 'Inicia sesión', text: 'Necesitas una cuenta para confirmar tu pedido.' }).then(() => onNavigate('/login'));
      return;
    }

    window.bootstrap?.Offcanvas.getInstance(document.getElementById('cartOffcanvas'))?.hide();
    window.bootstrap?.Modal.getOrCreateInstance(document.getElementById('checkoutModal'))?.show();
  }

  /** Actualiza los datos personales o de entrega escritos en el formulario. */
  function handleCheckoutFieldChange(event) {
    const { name, value } = event.target;
    setCheckoutData((previousData) => ({ ...previousData, [name]: value }));
  }

  /** Guarda el pedido y cierra el checkout si todos sus datos son válidos. */
  function handleCheckoutSubmit(event) {
    event.preventDefault();
    if (!checkoutData.name.trim() || !checkoutData.phone.trim() || !checkoutData.email.trim()) {
      setCheckoutError('Completa tu nombre, teléfono y correo electrónico.');
      return;
    }
    if (delivery === 'despacho' && !checkoutData.address.trim()) {
      setCheckoutError('Ingresa una dirección válida para el despacho.');
      return;
    }
    const result = onCheckout({
      ...checkoutData,
      name: checkoutData.name.trim(),
      phone: checkoutData.phone.trim(),
      email: checkoutData.email.trim(),
      entrega: delivery,
      direccion: checkoutData.address.trim()
    });
    if (!result?.success) {
      setCheckoutError(result?.error || 'No pudimos confirmar tu pedido. Revisa los datos e inténtalo nuevamente.');
      return;
    }
    window.bootstrap?.Modal.getInstance(document.getElementById('checkoutModal'))?.hide();
  }

  /** Explica por qué el navegador no permite enviar un formulario incompleto. */
  function handleCheckoutInvalid(event) {
    setCheckoutError(event.target.name === 'address'
      ? 'Ingresa una dirección válida para el despacho.'
      : 'Completa los datos personales requeridos antes de confirmar.');
  }

  return (
    <>
      <section className="hero-banner text-center shadow-sm mb-4">
        <div className="container py-3">
          <h1 className="display-4 fw-bold text-warning">Los Mejores Instrumentos al Mejor Precio</h1>
          <p className="lead mb-0">Guitarras, bajos, baterías, teclados y accesorios con envío a todo Chile.</p>
        </div>
      </section>

      <main className="container my-4">
        <div className="d-flex justify-content-center flex-wrap gap-2 mb-4">
          <button type="button" className={`btn rounded-pill px-3 ${category === 'Todos' ? 'btn-dark' : 'btn-outline-dark'}`} onClick={selectAllCategory}>Todos</button>
          {/* Cada acción de categoría actualiza el filtro del catálogo. */}
          {CATEGORIES.map((item) => <CategoryButton key={item} category={item} selectedCategory={category} onSelect={setCategory} />)}
        </div>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4">
          {filteredProducts.length ? filteredProducts.map((product) => (
            <CatalogProductCard key={product.id} product={product} onAddToCart={onAddToCart} onNavigate={onNavigate} />
          )) : <div className="col-12 text-center py-5"><i className="fa-solid fa-box-open fa-3x text-muted mb-3" /><h5 className="text-muted">No se encontraron productos.</h5></div>}
        </div>

        <section className="my-5 pt-4 border-top">
          <h3 className="fw-bold mb-3"><i className="fa-solid fa-location-dot me-2 text-danger" />Nuestra Tienda Física</h3>
          <p className="text-muted">Visítanos en Av. Concha y Toro 1234, Puente Alto. ¡Prueba los instrumentos antes de comprar!</p>
          <StoreMap />
        </section>
      </main>

      <div className="offcanvas offcanvas-end" tabIndex="-1" id="cartOffcanvas" aria-labelledby="cartOffcanvasLabel">
        <div className="offcanvas-header bg-dark text-white">
          <h5 className="offcanvas-title fw-bold" id="cartOffcanvasLabel"><i className="fa-solid fa-cart-shopping me-2" />Mi Carrito ({cartCount})</h5>
          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Cerrar carrito" />
        </div>
        <div className="offcanvas-body d-flex flex-column">
          <div className="flex-grow-1 overflow-auto">
            {displayedCart.length ? displayedCart.map((item) => (
              <CartItem key={item.id} item={item} onCartQuantity={onCartQuantity} onRemoveFromCart={onRemoveFromCart} />
            )) : <p className="text-center text-muted py-4">El carrito está vacío</p>}
          </div>
          <div className="border-top pt-3 mt-auto">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="fs-5 fw-bold">Total:</span><span className="fs-4 fw-bold text-success">{formatCLP(cartTotal)}</span>
            </div>
            <button type="button" className="btn btn-warning w-100 fw-bold py-2" onClick={handleOpenCheckout}>Proceder al Pago</button>
          </div>
        </div>
      </div>

      <div className="modal fade" id="checkoutModal" tabIndex="-1" aria-labelledby="checkoutModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content rounded-4 shadow border-0">
            <div className="modal-header bg-dark text-white">
              <h5 className="modal-title fw-bold" id="checkoutModalLabel"><i className="fa-solid fa-credit-card me-2" />Finalizar Compra</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Cerrar" />
            </div>
            <form onSubmit={handleCheckoutSubmit} onInvalid={handleCheckoutInvalid}>
              <div className="modal-body p-4">
                {checkoutError && <CheckoutError message={checkoutError} />}
                <h6 className="fw-bold mb-3 text-primary">1. Datos Personales</h6>
                <div className="row g-3 mb-4">
                  <label className="col-md-6">Nombre Completo<input className="form-control mt-1" name="name" value={checkoutData.name} onChange={handleCheckoutFieldChange} required /></label>
                  <label className="col-md-6">Teléfono<input className="form-control mt-1" name="phone" type="tel" placeholder="+56 9 1234 5678" value={checkoutData.phone} onChange={handleCheckoutFieldChange} required /></label>
                  <label className="col-12">Correo Electrónico<input className="form-control mt-1" name="email" type="email" value={checkoutData.email} onChange={handleCheckoutFieldChange} required /></label>
                </div>
                <h6 className="fw-bold mb-3 text-primary">2. Tipo de Entrega</h6>
                <div className="row g-3 mb-3">
                  <label className="col-md-6">
                    <span className="form-check card p-3 border shadow-sm">
                      <input className="form-check-input" type="radio" name="delivery" value="retiro" checked={delivery === 'retiro'} onChange={selectPickup} />
                      <span className="form-check-label fw-semibold">Retiro en tienda</span><small className="text-muted">Av. Concha y Toro 1234, Puente Alto</small>
                    </span>
                  </label>
                  <label className="col-md-6">
                    <span className="form-check card p-3 border shadow-sm">
                      <input className="form-check-input" type="radio" name="delivery" value="despacho" checked={delivery === 'despacho'} onChange={selectDelivery} />
                      <span className="form-check-label fw-semibold">Despacho a domicilio</span><small className="text-muted">Envío a todo Chile</small>
                    </span>
                  </label>
                </div>
                {delivery === 'despacho' && <label className="w-100">Dirección de despacho<textarea className="form-control mt-1" name="address" rows="2" value={checkoutData.address} onChange={handleCheckoutFieldChange} required /></label>}
              </div>
              <div className="modal-footer d-flex justify-content-between">
                <strong>Total: {formatCLP(cartTotal)}</strong>
                <button type="submit" className="btn btn-success fw-bold">Confirmar Pedido</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );

  /** Selecciona todas las categorías del catálogo. */
  function selectAllCategory() {
    setCategory('Todos');
  }

  /** Cambia la entrega al retiro en tienda. */
  function selectPickup() {
    setDelivery('retiro');
  }

  /** Cambia la entrega al despacho a domicilio. */
  function selectDelivery() {
    setDelivery('despacho');
  }
}

/** Renderiza el botón reutilizable de selección de categoría. */
function CategoryButton({ category, selectedCategory, onSelect }) {
  /** Activa la categoría elegida por el comprador. */
  function handleSelectCategory() {
    onSelect(category);
  }

  return <button type="button" className={`btn rounded-pill px-3 ${selectedCategory === category ? 'btn-dark' : 'btn-outline-dark'}`} onClick={handleSelectCategory}>{category}</button>;
}

/** Muestra un artículo del carrito con ajuste de cantidad y opción para quitarlo. */
function CartItem({ item, onCartQuantity, onRemoveFromCart }) {
  /** Reduce una unidad de este artículo del carrito. */
  function handleDecrease() {
    onCartQuantity(item.id, -1);
  }

  /** Aumenta una unidad de este artículo del carrito. */
  function handleIncrease() {
    onCartQuantity(item.id, 1);
  }

  /** Quita este artículo por completo del carrito. */
  function handleRemove() {
    onRemoveFromCart(item.id);
  }

  return (
    <div className="d-flex justify-content-between align-items-center border-bottom py-2 gap-2">
      <div className="d-flex align-items-center gap-2">
        <img src={item.imagen} className="cart-item-image" alt="" />
        <div>
          <h6 className="mb-0 fs-6 fw-semibold">{item.nombre}</h6>
          {item.precioOriginal > item.precio && <small className="text-muted d-block"><del>{formatCLP(item.precioOriginal)}</del></small>}
          <small className="text-muted">{formatCLP(item.precio)} c/u</small>
          <div className="d-flex align-items-center gap-2 mt-1">
            <button type="button" className="btn btn-sm btn-outline-secondary py-0 px-2" onClick={handleDecrease} aria-label={`Quitar una unidad de ${item.nombre}`}>-</button>
            <span className="fw-bold">{item.cantidad}</span>
            <button type="button" className="btn btn-sm btn-outline-secondary py-0 px-2" onClick={handleIncrease} aria-label={`Agregar una unidad de ${item.nombre}`}>+</button>
          </div>
        </div>
      </div>
      <div className="text-end">
        <span className="fw-bold d-block mb-1">{formatCLP(item.precio * item.cantidad)}</span>
        <button type="button" className="btn btn-sm btn-link text-danger p-0 border-0" onClick={handleRemove} title="Eliminar producto" aria-label={`Eliminar ${item.nombre}`}><i className="fa-solid fa-trash-can" /></button>
      </div>
    </div>
  );
}

/** Inicializa el mapa de la tienda física cuando Leaflet está disponible. */
function StoreMap() {
  const mapElement = useRef(null);

  useEffect(() => {
    if (!mapElement.current || !window.L) return undefined;

    const map = window.L.map(mapElement.current).setView([-33.6117, -70.5758], 15);
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap' }).addTo(map);
    window.L.marker([-33.6117, -70.5758]).addTo(map).bindPopup('Sonido Vivo').openPopup();
    return () => map.remove();
  }, []);

  return <div id="map" ref={mapElement} className="rounded-3 shadow-sm" role="img" aria-label="Mapa de ubicación de Sonido Vivo" />;
}
