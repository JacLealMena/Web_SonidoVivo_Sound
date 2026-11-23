import React from 'react';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import AdminDashboard from './AdminDashboard';
import { DEFAULT_USERS } from './store';

afterEach(cleanup);

beforeEach(() => {
  spyOn(window, 'alert').and.stub();
});

function renderAdminDashboard(products, onProductsChange) {
  return render(
    <AdminDashboard
      products={products}
      users={DEFAULT_USERS}
      orders={[]}
      currentUser={DEFAULT_USERS[0]}
      onProductsChange={onProductsChange}
      onUsersChange={() => {}}
      onOrderStatus={() => {}}
      onNavigate={() => {}}
      onLogout={() => {}}
    />
  );
}

describe('editor de productos administrativos', () => {
  it('muestra marca y modelo y mantiene el cuerpo desplazable con los botones accesibles', () => {
    renderAdminDashboard([], () => {});
    fireEvent.click(screen.getByRole('button', { name: /agregar producto/i }));

    const dialog = screen.getByRole('dialog', { name: 'Nuevo producto' });
    const modalContent = dialog.querySelector('.modal-content');
    expect(dialog.querySelector('.modal-dialog-scrollable')).toBeTruthy();
    expect(modalContent.tagName).toBe('FORM');
    expect(modalContent.querySelector('.modal-body').parentElement).toBe(modalContent);
    expect(within(dialog).getByLabelText('Marca')).toBeTruthy();
    expect(within(dialog).getByLabelText('Modelo')).toBeTruthy();
    expect(within(dialog).getByRole('button', { name: 'Cancelar' })).toBeTruthy();
    expect(within(dialog).getByRole('button', { name: 'Guardar' })).toBeTruthy();
  });

  it('guarda los cambios de marca y modelo al crear o editar un producto', () => {
    const onProductsChange = jasmine.createSpy('onProductsChange');
    renderAdminDashboard([], onProductsChange);
    fireEvent.click(screen.getByRole('button', { name: /agregar producto/i }));
    fireEvent.change(screen.getByLabelText('Código único'), { target: { value: 'TEST-001' } });
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Producto de prueba' } });
    fireEvent.change(screen.getByLabelText('Marca'), { target: { value: 'Marca nueva' } });
    fireEvent.change(screen.getByLabelText('Modelo'), { target: { value: 'Modelo nuevo' } });
    fireEvent.change(screen.getByLabelText('Precio (CLP)'), { target: { value: '10000' } });
    fireEvent.change(screen.getByLabelText('Stock'), { target: { value: '3' } });
    fireEvent.click(screen.getByRole('button', { name: 'Guardar' }));

    const createdProduct = onProductsChange.calls.mostRecent().args[0][0];
    expect(createdProduct.marca).toBe('Marca nueva');
    expect(createdProduct.modelo).toBe('Modelo nuevo');

    cleanup();
    const existingProduct = {
      id: 20,
      codigo: 'TEST-020',
      nombre: 'Producto existente',
      marca: 'Marca anterior',
      modelo: 'Modelo anterior',
      categoria: 'Accesorios',
      precio: 15000,
      stock: 4,
      stockCritico: 1,
      imagen: 'https://example.com/image.jpg'
    };
    const onProductEdit = jasmine.createSpy('onProductEdit');
    renderAdminDashboard([existingProduct], onProductEdit);
    fireEvent.click(screen.getByRole('button', { name: 'Editar Producto existente' }));
    fireEvent.change(screen.getByLabelText('Marca'), { target: { value: 'Marca editada' } });
    fireEvent.change(screen.getByLabelText('Modelo'), { target: { value: 'Modelo editado' } });
    fireEvent.click(screen.getByRole('button', { name: 'Guardar' }));

    const editedProduct = onProductEdit.calls.mostRecent().args[0][0];
    expect(editedProduct.marca).toBe('Marca editada');
    expect(editedProduct.modelo).toBe('Modelo editado');
  });
});

describe('distribución de stock', () => {
  it('muestra todas las categorías y el total de sus unidades', () => {
    const products = Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      codigo: `STOCK-${index + 1}`,
      nombre: `Producto ${index + 1}`,
      categoria: `Categoría ${index + 1}`,
      precio: 1000,
      stock: index + 1,
      stockCritico: 0,
      imagen: 'https://example.com/product.jpg'
    }));

    renderAdminDashboard(products, () => {});

    const heading = screen.getByRole('heading', { name: 'Distribución de stock' });
    const panel = heading.closest('.info-panel');
    expect(within(panel).getByText('Total: 55 und.')).toBeTruthy();
    for (let category = 1; category <= 10; category += 1) {
      expect(within(panel).getByText(`Categoría ${category}`)).toBeTruthy();
    }
  });
});

describe('filtros del inventario administrativo', () => {
  it('filtra productos en la tabla de stock por búsqueda', () => {
    const products = [
      {
        id: 1,
        codigo: 'FE-001',
        nombre: 'Guitarra acústica',
        marca: 'Fender',
        modelo: 'CD-60S',
        categoria: 'Guitarras Acústicas',
        precio: 100000,
        stock: 3,
        stockCritico: 1,
        imagen: 'https://example.com/guitar.jpg'
      },
      {
        id: 2,
        codigo: 'BA-001',
        nombre: 'Bajo eléctrico',
        marca: 'Yamaha',
        modelo: 'TRBX',
        categoria: 'Bajos Eléctricos',
        precio: 200000,
        stock: 2,
        stockCritico: 1,
        imagen: 'https://example.com/bass.jpg'
      }
    ];

    renderAdminDashboard(products, () => {});
    fireEvent.change(screen.getByRole('searchbox', { name: 'Buscar productos por nombre, código, marca o modelo' }), {
      target: { value: 'fender' }
    });

    expect(screen.getByText('Guitarra acústica')).toBeTruthy();
    expect(screen.queryByText('Bajo eléctrico')).toBeNull();
    expect(screen.getByText('Mostrando 1 de 2 productos')).toBeTruthy();
  });
});
