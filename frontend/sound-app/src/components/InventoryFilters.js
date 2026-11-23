import React from 'react';
import { CATEGORIES } from './store';

/** Filtra productos por texto, categoría y disponibilidad del stock. */
export function filterInventoryProducts(products, filters = {}) {
  const search = normalizeSearch(filters.query);
  const category = filters.category || '';
  const stockStatus = filters.stockStatus || 'all';

  return products.filter((product) => {
    const searchableText = normalizeSearch([
      product.nombre,
      product.codigo,
      product.marca,
      product.modelo
    ].filter(Boolean).join(' '));
    const stock = Number(product.stock || 0);
    const criticalStock = Number(product.stockCritico || 0);

    if (search && !searchableText.includes(search)) return false;
    if (category && product.categoria !== category) return false;
    if (stockStatus === 'available' && stock <= 0) return false;
    if (stockStatus === 'critical' && !(stock > 0 && stock <= criticalStock)) return false;
    if (stockStatus === 'out-of-stock' && stock > 0) return false;
    return true;
  });
}

/** Controles compartidos de búsqueda y filtro para las tablas de inventario. */
export default function InventoryFilters({ filters, onChange }) {
  function handleChange(event) {
    const { name, value } = event.currentTarget;
    onChange((currentFilters) => ({ ...currentFilters, [name]: value }));
  }

  return (
    <div className="row g-2">
      <div className="col-lg-5">
        <label className="visually-hidden" htmlFor="inventory-search">Buscar por nombre, código, marca o modelo</label>
        <input
          id="inventory-search"
          className="form-control"
          type="search"
          name="query"
          placeholder="Buscar producto, código, marca o modelo"
          aria-label="Buscar productos por nombre, código, marca o modelo"
          value={filters.query}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-6 col-lg-4">
        <label className="visually-hidden" htmlFor="inventory-category">Filtrar por categoría</label>
        <select id="inventory-category" className="form-select" name="category" aria-label="Filtrar por categoría" value={filters.category} onChange={handleChange}>
          <option value="">Todas las categorías</option>
          {CATEGORIES.map((category) => <option key={category} value={category}>{category}</option>)}
        </select>
      </div>
      <div className="col-md-6 col-lg-3">
        <label className="visually-hidden" htmlFor="inventory-stock-status">Filtrar por nivel de stock</label>
        <select id="inventory-stock-status" className="form-select" name="stockStatus" aria-label="Filtrar por nivel de stock" value={filters.stockStatus} onChange={handleChange}>
          <option value="all">Todo el stock</option>
          <option value="available">Con stock</option>
          <option value="critical">Stock crítico</option>
          <option value="out-of-stock">Sin stock</option>
        </select>
      </div>
    </div>
  );
}

function normalizeSearch(value) {
  return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}
