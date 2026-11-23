import { filterInventoryProducts } from './InventoryFilters';

describe('filtros de inventario', () => {
  const products = [
    { id: 1, nombre: 'Micrófono Shure', codigo: 'MI-58', marca: 'Shure', modelo: 'SM58', categoria: 'Micrófonos', stock: 2, stockCritico: 3 },
    { id: 2, nombre: 'Micrófono de estudio', codigo: 'MI-01', marca: 'Audio', modelo: 'USB', categoria: 'Micrófonos', stock: 0, stockCritico: 2 },
    { id: 3, nombre: 'Amplificador', codigo: 'AM-01', marca: 'Fender', modelo: 'Frontman', categoria: 'Amplificadores', stock: 8, stockCritico: 2 }
  ];

  it('busca por texto ignorando mayúsculas y acentos', () => {
    expect(filterInventoryProducts(products, { query: 'microfono', category: '', stockStatus: 'all' }).map((product) => product.id)).toEqual([1, 2]);
    expect(filterInventoryProducts(products, { query: 'sm58', category: '', stockStatus: 'all' }).map((product) => product.id)).toEqual([1]);
  });

  it('combina categoría y disponibilidad del stock', () => {
    expect(filterInventoryProducts(products, { query: '', category: 'Micrófonos', stockStatus: 'critical' }).map((product) => product.id)).toEqual([1]);
    expect(filterInventoryProducts(products, { query: '', category: '', stockStatus: 'out-of-stock' }).map((product) => product.id)).toEqual([2]);
    expect(filterInventoryProducts(products, { query: '', category: '', stockStatus: 'available' }).map((product) => product.id)).toEqual([1, 3]);
  });
});
