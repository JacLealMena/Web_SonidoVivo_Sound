import React from 'react';
import { CATEGORIES, formatCLP, showMessage } from './store';

/** Muestra inventario, indicadores y seguimiento de pedidos para vendedores. */
export default function SellerDashboard({ products, orders, onProductsChange, onOrderStatus, onNavigate, onLogout }) {
  const activeOrders = orders.filter((order) => order.estado !== 'Entregado');
  const totalStock = products.reduce((total, product) => total + Number(product.stock || 0), 0);
  const inventoryValue = products.reduce((total, product) => total + Number(product.precio || 0) * Number(product.stock || 0), 0);
  const criticalProducts = products.filter((product) => Number(product.stock || 0) <= Number(product.stockCritico || 0));
  const stockByCategory = CATEGORIES.map((category) => ({
    category,
    stock: products.filter((product) => product.categoria === category).reduce((total, product) => total + product.stock, 0)
  })).filter((entry) => entry.stock > 0).sort((first, second) => second.stock - first.stock).slice(0, 4);
  const maximumCategoryStock = Math.max(1, ...stockByCategory.map((entry) => entry.stock));

  /** Guarda el nuevo estado de una operación de venta. */
  function handleStatusChange(orderId, event) {
    onOrderStatus(orderId, event.target.value);
  }

  /** Evita reducir el stock por debajo de cero y persiste el ajuste. */
  /** Persiste un ajuste de inventario permitido para el producto seleccionado. */
  function handleStockChange(productId, change) {
    const selectedProduct = products.find((product) => product.id === productId);
    if (!selectedProduct || selectedProduct.stock + change < 0) {
      showMessage({ icon: 'warning', title: 'Stock no válido', text: 'El inventario no puede ser menor que cero.' });
      return;
    }
    onProductsChange(products.map((product) => product.id === productId ? { ...product, stock: product.stock + change } : product));
  }

  /** Navega a la pantalla de autenticación al cerrar la sesión del vendedor. */
  /** Finaliza la sesión del vendedor desde su panel. */
  function handleLogout() {
    onLogout();
  }

  return (
    <main className="container my-4">
      <header className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div><h1 className="h2 fw-bold mb-1"><i className="fa-solid fa-warehouse me-2 text-warning" />Gestión de inventario y pedidos</h1><small className="text-muted">Operaciones comerciales y seguimiento de stock</small></div>
        <button type="button" className="btn btn-outline-dark" onClick={handleLogout}>Volver a la tienda</button>
      </header>
      <div className="row g-4 mb-4">
        <MetricCard title="Productos" value={products.length} icon="fa-box" />
        <MetricCard title="Stock total" value={totalStock} icon="fa-warehouse" />
        <MetricCard title="Pedidos activos" value={activeOrders.length} icon="fa-truck-fast" />
      </div>
      <div className="row g-3 mb-4">
        <div className="col-lg-4"><div className="info-panel p-3 h-100"><span className="text-muted text-uppercase small">Valor del inventario</span><h2 className="h4 fw-bold text-success mt-2">{formatCLP(inventoryValue)}</h2><small className="text-muted">Valor estimado del stock actual</small></div></div>
        <div className="col-lg-4"><div className="info-panel p-3 h-100"><span className="text-muted text-uppercase small">Productos críticos</span><h2 className="h4 fw-bold mt-2">{criticalProducts.length}</h2><small className="text-muted">Unidades por debajo del umbral</small></div></div>
        <div className="col-lg-4"><div className="info-panel p-3 h-100"><span className="text-muted text-uppercase small">Pedidos activos</span><h2 className="h4 fw-bold mt-2">{activeOrders.length}</h2><small className="text-muted">Pedidos pendientes de entrega</small></div></div>
        <div className="col-lg-7"><div className="info-panel p-3 h-100"><h2 className="h6 fw-bold mb-3">Distribución de stock</h2>
          {stockByCategory.map((entry) => <StockBar key={entry.category} entry={entry} maxStock={maximumCategoryStock} />)}
          {!stockByCategory.length && <p className="text-muted mb-0">Sin datos de categorías disponibles.</p>}
        </div></div>
        <div className="col-lg-5"><div className="info-panel p-3 h-100"><h2 className="h6 fw-bold mb-3">Alertas de stock</h2>
          {criticalProducts.map((product) => <div className="warning-item p-2 mb-2" key={product.id}><strong className="d-block">{product.nombre}</strong><span className="small text-muted">Stock actual: {product.stock} · Crítico: {product.stockCritico}</span></div>)}
          {!criticalProducts.length && <p className="text-muted mb-0">No hay alertas por stock bajo.</p>}
        </div></div>
      </div>

      <div className="row g-4">
        <section className="col-lg-7"><div className="card border-0 shadow-sm rounded-4 h-100"><div className="card-body">
          <h2 className="h4 fw-bold mb-3"><i className="fa-solid fa-boxes-stacked me-2 text-primary" />Inventario</h2>
          <div className="table-responsive"><table className="table table-hover align-middle mb-0">
            <thead className="table-light"><tr><th>Producto</th><th>Categoría</th><th>Precio</th><th>Stock</th><th>Ajustar</th></tr></thead>
            <tbody>{products.map((product) => <InventoryRow key={product.id} product={product} onStockChange={handleStockChange} />)}</tbody>
          </table></div>
        </div></div></section>
        <section className="col-lg-5"><div className="card border-0 shadow-sm rounded-4 h-100"><div className="card-body">
          <h2 className="h4 fw-bold mb-3"><i className="fa-solid fa-truck-fast me-2 text-warning" />Pedidos</h2>
          <div className="table-responsive"><table className="table table-hover align-middle mb-0">
            <thead className="table-light"><tr><th>ID</th><th>Cliente / Total</th><th>Estado</th></tr></thead>
            <tbody>{orders.length ? orders.map((order) => <SellerOrderRow key={order.id} order={order} onStatusChange={handleStatusChange} />) : <tr><td colSpan="3" className="text-center text-muted">No hay pedidos registrados</td></tr>}</tbody>
          </table></div>
        </div></div></section>
      </div>
    </main>
  );
}

/** Resume un indicador del panel del vendedor. */
function MetricCard({ title, value, icon }) {
  return <div className="col-md-4"><div className="card shadow-sm border-0 rounded-4 h-100 dashboard-card"><div className="card-body"><div className="d-flex justify-content-between align-items-center mb-2"><h2 className="h6 text-muted text-uppercase mb-0">{title}</h2><span className="badge bg-primary-subtle text-primary"><i className={`fa-solid ${icon}`} /></span></div><p className="h3 fw-bold mb-0">{value}</p></div></div></div>;
}

/** Dibuja la proporción de unidades disponibles para una categoría. */
function StockBar({ entry, maxStock }) {
  return <div className="mb-3"><div className="d-flex justify-content-between small mb-1"><span className="text-muted">{entry.category}</span><span className="fw-semibold">{entry.stock} un.</span></div><div className="bar-track"><div className="bar-fill" style={{ width: `${(entry.stock / maxStock) * 100}%` }} /></div></div>;
}

/** Presenta y permite ajustar el stock de un artículo. */
function InventoryRow({ product, onStockChange }) {
  /** Solicita al panel sumar o restar una unidad del inventario. */
  function handleChangeStock(event) {
    onStockChange(product.id, Number(event.currentTarget.dataset.change));
  }

  return <tr><td className="fw-semibold">{product.nombre}</td><td>{product.categoria}</td><td>{formatCLP(product.precio)}</td><td className={product.stock === 0 ? 'text-danger fw-bold' : 'fw-bold'}>{product.stock}</td><td><div className="d-flex gap-1"><button type="button" className="btn btn-sm btn-outline-danger" data-change="-1" onClick={handleChangeStock} aria-label={`Reducir stock de ${product.nombre}`}>-</button><button type="button" className="btn btn-sm btn-outline-success" data-change="1" onClick={handleChangeStock} aria-label={`Aumentar stock de ${product.nombre}`}>+</button></div></td></tr>;
}

/** Muestra el cliente, total y estado editable de un pedido para el vendedor. */
function SellerOrderRow({ order, onStatusChange }) {
  /** Notifica al panel del vendedor el cambio de estado seleccionado. */
  function handleStatusChange(event) {
    onStatusChange(order.id, event);
  }

  return <tr><td>{order.numero}</td><td>{order.clienteNombre}<small className="d-block text-muted">{formatCLP(order.total)}</small></td><td><select className="form-select form-select-sm" value={order.estado} onChange={handleStatusChange}><option>En preparación</option><option>Despachado</option><option>Entregado</option></select></td></tr>;
}
