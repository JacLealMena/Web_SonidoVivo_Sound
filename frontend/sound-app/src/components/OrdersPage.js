import React from 'react';
import { formatCLP } from './store';

/** Presenta el historial de compras de la cuenta autenticada. */
export default function OrdersPage({ currentUser, orders, onNavigate }) {
  const userOrders = currentUser ? orders.filter((order) => Number(order.clienteId) === Number(currentUser.id)) : [];

  /** Regresa al catálogo para seguir comprando. */
  function handleContinueShopping() {
    onNavigate('/');
  }

  /** Abre la pantalla de acceso antes de consultar el historial privado. */
  function handleGoToLogin() {
    onNavigate('/login');
  }

  return (
    <main className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <h1 className="h2 fw-bold mb-0"><i className="fa-solid fa-box me-2 text-warning" />Mis Pedidos</h1>
        <button type="button" className="btn btn-outline-dark" onClick={handleContinueShopping}>Seguir comprando</button>
      </div>
      {!currentUser && (
        <div className="alert alert-warning d-flex justify-content-between align-items-center flex-wrap gap-2">
          <span>Debes iniciar sesión para ver tus pedidos.</span>
          <button type="button" className="btn btn-sm btn-warning" onClick={handleGoToLogin}>Iniciar sesión</button>
        </div>
      )}
      {currentUser && !userOrders.length && <div className="alert alert-info">Todavía no tienes pedidos registrados.</div>}
      <div className="row g-4">
        {/* Presenta por separado cada compra del cliente. */}
        {userOrders.map((order) => <OrderCard key={order.id} order={order} />)}
      </div>
    </main>
  );
}

/** Muestra productos, entrega, estado y total de un pedido. */
function OrderCard({ order }) {
  return (
    <div className="col-12">
      <article className="card border-0 shadow-sm rounded-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-3">
            <div>
              <h2 className="h5 fw-bold mb-1">Pedido {order.numero}</h2>
              <small className="text-muted">{new Date(order.fecha).toLocaleString('es-CL')}</small>
            </div>
            <span className="badge bg-warning text-dark fs-6">{order.estado}</span>
          </div>
          <div className="table-responsive">
            <table className="table table-sm align-middle">
              <thead><tr><th>Producto</th><th>Cantidad</th><th>Precio</th><th>Subtotal</th></tr></thead>
              <tbody>
                {/* Desglosa cada artículo registrado en el pedido. */}
                {order.items.map((item) => (
                  <tr key={`${order.id}-${item.id}`}>
                    <td>{item.nombre}</td>
                    <td>{item.cantidad}</td>
                    <td>
                      {item.precioOriginal > item.precio && <del className="d-block text-muted small">{formatCLP(item.precioOriginal)}</del>}
                      {formatCLP(item.precio)}
                      {item.descuento > 0 && <small className="d-block text-success">{item.descuento}% de descuento</small>}
                    </td>
                    <td>{formatCLP(item.precio * item.cantidad)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mt-3 border-top pt-3">
            <div>
              <small className="text-muted d-block">Entrega: {order.entrega}</small>
              <small className="text-muted d-block">Dirección: {order.direccion}</small>
              {order.contacto && <small className="text-muted">Contacto: {order.contacto.nombre} · {order.contacto.telefono} · {order.contacto.email}</small>}
            </div>
            <h3 className="h5 fw-bold text-success mb-0">{formatCLP(order.total)}</h3>
          </div>
        </div>
      </article>
    </div>
  );
}
