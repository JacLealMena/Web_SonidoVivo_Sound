import React from 'react';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import SellerDashboard from './SellerDashboard';

afterEach(cleanup);

function renderSellerDashboard(products) {
  return render(
    <SellerDashboard
      products={products}
      orders={[]}
      onProductsChange={() => {}}
      onOrderStatus={() => {}}
      onNavigate={() => {}}
      onLogout={() => {}}
    />
  );
}

describe('panel del vendedor', () => {
  const products = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    codigo: `SELLER-${index + 1}`,
    nombre: `Producto ${index + 1}`,
    marca: `Marca ${index + 1}`,
    modelo: `Modelo ${index + 1}`,
    categoria: `Categoría ${index + 1}`,
    precio: 1000,
    stock: index + 1,
    stockCritico: 0
  }));

  it('muestra todas las categorías y el total de unidades en la distribución', () => {
    renderSellerDashboard(products);

    const heading = screen.getByRole('heading', { name: 'Distribución de stock' });
    const panel = heading.closest('.info-panel');
    expect(within(panel).getByText('Total: 55 un.')).toBeTruthy();
    for (let category = 1; category <= 10; category += 1) {
      expect(within(panel).getByText(`Categoría ${category}`)).toBeTruthy();
    }
  });

  it('filtra la tabla de inventario por nombre, marca o modelo', () => {
    renderSellerDashboard(products);
    fireEvent.change(screen.getByRole('searchbox', { name: 'Buscar productos por nombre, código, marca o modelo' }), {
      target: { value: 'modelo 5' }
    });

    expect(screen.getByText('Producto 5')).toBeTruthy();
    expect(screen.queryByText('Producto 4')).toBeNull();
    expect(screen.getByText('Mostrando 1 de 10 productos')).toBeTruthy();
  });
});
