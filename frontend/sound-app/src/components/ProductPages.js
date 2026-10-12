import React from 'react';
import CatalogProductCard from './CatalogProductCard';
import { CATEGORIES, categorySlug, formatCLP, getSalePrice } from './store';

/** Presenta las categorías disponibles como una vista independiente. */
export function CategoriesPage({ products, onNavigate }) {
  return (
    <main className="container my-5">
      <h1 className="h2 fw-bold mb-2">Categorías</h1>
      <p className="text-muted mb-4">Explora los instrumentos y accesorios de nuestra tienda.</p>
      <div className="row g-3">
        {CATEGORIES.map((category) => {
          const productCount = products.filter((product) => product.categoria === category).length;
          return (
            <div className="col-sm-6 col-lg-4" key={category}>
              <article className="card border-0 shadow-sm h-100">
                <div className="card-body d-flex flex-column">
                  <h2 className="h5 fw-bold">{category}</h2>
                  <p className="text-muted">{productCount} {productCount === 1 ? 'producto' : 'productos'}</p>
                  <button type="button" className="btn btn-outline-dark mt-auto align-self-start" onClick={() => onNavigate(`/categories/${categorySlug(category)}`)}>Ver categoría</button>
                </div>
              </article>
            </div>
          );
        })}
      </div>
    </main>
  );
}

/** Muestra los productos de una categoría seleccionada. */
export function CategoryProductsPage({ category, products, onAddToCart, onNavigate }) {
  const categoryProducts = products.filter((product) => product.categoria === category);
  return (
    <main className="container my-5">
      <button type="button" className="btn btn-link px-0 mb-2" onClick={() => onNavigate('/categories')}>← Todas las categorías</button>
      <h1 className="h2 fw-bold mb-4">{category}</h1>
      {categoryProducts.length ? (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4">
          {categoryProducts.map((product) => <CatalogProductCard key={product.id} product={product} onAddToCart={onAddToCart} onNavigate={onNavigate} />)}
        </div>
      ) : <p className="alert alert-info">Todavía no hay productos en esta categoría.</p>}
    </main>
  );
}

/** Presenta los productos con un descuento configurado por el administrador. */
export function OffersPage({ products, onAddToCart, onNavigate }) {
  const offers = products.filter((product) => Number(product.descuento) > 0);
  return (
    <main className="container my-5">
      <h1 className="h2 fw-bold mb-2">Ofertas</h1>
      <p className="text-muted mb-4">Aprovecha los descuentos disponibles en la tienda.</p>
      {offers.length ? (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4">
          {offers.map((product) => <CatalogProductCard key={product.id} product={product} onAddToCart={onAddToCart} onNavigate={onNavigate} />)}
        </div>
      ) : <p className="alert alert-info">Por el momento no hay ofertas disponibles.</p>}
    </main>
  );
}

/** Muestra el detalle y el precio vigente de un producto del catálogo. */
export function ProductDetailPage({ product, onAddToCart, onNavigate }) {
  if (!product) {
    return (
      <main className="container my-5">
        <section className="alert alert-warning" role="alert">
          <h1 className="h4">Producto no disponible</h1>
          <p>El producto que buscas no existe o ya no está disponible.</p>
          <button type="button" className="btn btn-outline-dark" onClick={() => onNavigate('/')}>Volver al catálogo</button>
        </section>
      </main>
    );
  }

  const discount = Math.min(99, Math.max(0, Number(product.descuento) || 0));
  return (
    <main className="container my-5">
      <button type="button" className="btn btn-link px-0 mb-3" onClick={() => onNavigate(`/categories/${categorySlug(product.categoria)}`)}>← {product.categoria}</button>
      <article className="row g-4 align-items-center">
        <div className="col-md-6"><img src={product.imagen} className="img-fluid rounded-4 shadow-sm w-100" alt={product.nombre} /></div>
        <div className="col-md-6">
          {discount > 0 && <span className="badge bg-danger mb-2">Oferta: {discount}% de descuento</span>}
          <h1 className="h2 fw-bold">{product.nombre}</h1>
          <p className="text-muted">{product.descripcion}</p>
          <p className="mb-2">Categoría: <button type="button" className="btn btn-link p-0" onClick={() => onNavigate(`/categories/${categorySlug(product.categoria)}`)}>{product.categoria}</button></p>
          <p className="mb-3">{product.stock > 0 ? `Stock disponible: ${product.stock} un.` : <span className="text-danger">Sin stock disponible</span>}</p>
          {discount > 0 && <del className="d-block text-muted">{formatCLP(product.precio)}</del>}
          <p className="h3 fw-bold text-success">{formatCLP(getSalePrice(product))}</p>
          <button type="button" className="btn btn-primary btn-lg" disabled={product.stock < 1} onClick={() => onAddToCart(product.id)}>Agregar al carrito</button>
        </div>
      </article>
    </main>
  );
}
