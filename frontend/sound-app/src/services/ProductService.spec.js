import axios from 'axios';
import { ProductService } from './ProductService';
import { STORAGE_KEYS } from '../components/store';

describe('ProductService', () => {
  beforeEach(() => {
    window.localStorage.clear();
    spyOn(axios, 'post').and.returnValue(Promise.resolve({ data: { id: 52 } }));
  });

  it('omits the temporary client ID when creating a product', async () => {
    window.localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, 'valid-session-token');
    const product = {
      id: 123456,
      codigo: 'TEST-001',
      nombre: 'Producto de prueba',
      categoria: 'Accesorios',
      descripcion: 'Descripción',
      precio: 10000,
      stock: 5,
      stockCritico: 1,
      imagen: ''
    };

    await ProductService.createProduct(product);

    const [url, payload, config] = axios.post.calls.mostRecent().args;
    expect(url).toBe('http://localhost:8080/api/v1/productos/guardar');
    expect(payload).toEqual({
      codigo: 'TEST-001',
      nombre: 'Producto de prueba',
      categoria: 'Accesorios',
      descripcion: 'Descripción',
      precio: 10000,
      stock: 5,
      stockCritico: 1,
      imagen: ''
    });
    expect(config.headers.Authorization).toBe('Bearer valid-session-token');
  });
});
