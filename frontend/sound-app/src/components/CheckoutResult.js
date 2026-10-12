import React from 'react';
import { formatCLP } from './store';

/** Presenta el resultado confirmado de una compra o un pedido no disponible. */
export default function CheckoutResult({ order, onNavigate }) {
  if (!order) {
    return (
      <main className="container my-5">
        <section className="alert alert-danger" role="alert" aria-labelledby="checkout-result-error">
          <h1 className="h3" id="checkout-result-error">No encontramos este pedido</h1>
          <p>El pedido no existe o no está disponible para esta cuenta.</p>
          <button type="button" className="btn btn-outline-dark" onClick={() => onNavigate('/')}>Volver a la tienda</button>
        </section>
      </main>
    );
  }

  return (
    <main className="container my-5">
      <section className="card border-0 shadow-sm rounded-4 mx-auto" style={{ maxWidth: '720px' }} aria-labelledby="checkout-result-success">
        <div className="card-body p-4 p-md-5">
          <div className="text-center mb-4">
            <i className="fa-solid fa-circle-check text-success fa-3x mb-3" aria-hidden="true" />
            <h1 className="h2 fw-bold" id="checkout-result-success">Compra confirmada</h1>
            <p className="text-muted mb-0">Tu pedido se registró correctamente.</p>
          </div>
          <div className="alert alert-success" role="status">
            Número de pedido: <strong>{order.numero}</strong>
          </div>
          <h2 className="h5 fw-bold">Resumen del pedido</h2>
          <ul className="list-group list-group-flush mb-3">
            {order.items.map((item) => (
              <li className="list-group-item d-flex justify-content-between gap-3 px-0" key={`${order.id}-${item.id}`}>
                <span>
                  {item.nombre} × {item.cantidad}
                  {item.descuento > 0 && <small className="d-block text-success">{item.descuento}% de descuento aplicado</small>}
                </span>
                <span className="text-end">
                  {item.precioOriginal > item.precio && <del className="d-block text-muted small">{formatCLP(item.precioOriginal * item.cantidad)}</del>}
                  <strong>{formatCLP(item.precio * item.cantidad)}</strong>
                </span>
              </li>
            ))}
          </ul>
          <p className="mb-1"><strong>Entrega:</strong> {order.entrega === 'despacho' ? 'Despacho a domicilio' : 'Retiro en tienda'}</p>
          <p className="mb-3"><strong>Dirección:</strong> {order.direccion}</p>
          {order.contacto && (
            <p className="mb-3"><strong>Contacto:</strong> {order.contacto.nombre} · {order.contacto.telefono} · {order.contacto.email}</p>
          )}
          <p className="fs-5 fw-bold text-success border-top pt-3">Total: {formatCLP(order.total)}</p>
          <div className="d-flex flex-wrap gap-2">
            <button type="button" className="btn btn-warning fw-semibold" onClick={() => onNavigate('/orders')}>Ver mis pedidos</button>
            <button type="button" className="btn btn-outline-dark" onClick={() => onNavigate('/')}>Seguir comprando</button>
          </div>
        </div>
      </section>
    </main>
  );
}

/** Expone un error de compra dentro del formulario para que pueda corregirse. */
export function CheckoutError({ message }) {
  return (
    <div className="alert alert-danger" role="alert" aria-live="assertive">
      <h2 className="h6 fw-bold">No se pudo confirmar la compra</h2>
      <p className="mb-0">{message}</p>
    </div>
  );
}
