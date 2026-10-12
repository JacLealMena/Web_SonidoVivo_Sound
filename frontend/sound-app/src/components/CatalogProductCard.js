import React from 'react';
import { formatCLP, getSalePrice } from './store';

/** Presenta un producto del catálogo con acceso al detalle y a la compra. */
export default function CatalogProductCard({ product, onAddToCart, onNavigate }) {
  const outOfStock = product.stock === 0;
  const lowStock = product.stock > 0 && product.stock <= 3;
  const discount = Math.min(99, Math.max(0, Number(product.descuento) || 0));
  const salePrice = getSalePrice(product);

  return (
    <div className="col d-flex align-items-stretch">
      <article className="card product-card shadow-sm border-0 position-relative w-100">
        {discount > 0 && <span className="badge bg-danger position-absolute top-0 end-0 m-2">-{discount}%</span>}
        {outOfStock && <span className="badge bg-dark position-absolute top-0 start-0 m-2">Agotado</span>}
        {!outOfStock && discount === 0 && lowStock && <span className="badge bg-warning text-dark position-absolute top-0 start-0 m-2">¡Últimas {product.stock} un!</span>}
        <img src={product.imagen} className="card-img-top p-3 product-image" alt={product.nombre} />
        <div className="card-body d-flex flex-column">
          <span className="badge bg-secondary mb-2 align-self-start">{product.categoria}</span>
          <h2 className="card-title fw-bold mb-2 h6">
            <button type="button" className="btn btn-link text-dark text-decoration-none p-0 text-start fw-bold" onClick={() => onNavigate(`/products/${product.id}`)}>{product.nombre}</button>
          </h2>
          <p className="card-text mb-3 small">
            {outOfStock ? <span className="text-danger fw-bold">Sin stock disponible</span> : lowStock ? <span className="text-warning-emphasis fw-bold">Quedan solo {product.stock} unidades</span> : <span className="text-muted">Stock: {product.stock} un.</span>}
          </p>
          <div className="mt-auto d-flex align-items-center justify-content-between gap-2 flex-wrap">
            <div>
              {discount > 0 && <del className="d-block text-muted small">{formatCLP(product.precio)}</del>}
              <span className="fs-5 fw-bold text-success">{formatCLP(salePrice)}</span>
            </div>
            <button type="button" className="btn btn-primary btn-sm px-3" onClick={() => onAddToCart(product.id)} disabled={outOfStock}>Agregar</button>
          </div>
          <button type="button" className="btn btn-link btn-sm align-self-start px-0 mt-2" onClick={() => onNavigate(`/products/${product.id}`)}>Ver detalle</button>
        </div>
      </article>
    </div>
  );
}
