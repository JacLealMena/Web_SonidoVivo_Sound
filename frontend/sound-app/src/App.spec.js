import React from 'react';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import App from './components/App';
import { DEFAULT_PRODUCTS, DEFAULT_USERS, formatCLP, STORAGE_KEYS } from './components/store';

const testProduct = DEFAULT_PRODUCTS[0];

beforeEach(() => {
  window.localStorage.clear();
  window.history.replaceState({}, '', '/');
  spyOn(window, 'alert').and.stub();
  window.confirm = jasmine.createSpy('confirm').and.returnValue(true);
  window.scrollTo = jasmine.createSpy('scrollTo');
  window.bootstrap = {
    Offcanvas: {
      getInstance: jasmine.createSpy('getOffcanvas').and.returnValue({ hide: jasmine.createSpy('hide') }),
      getOrCreateInstance: jasmine.createSpy('getOrCreateOffcanvas').and.returnValue({ show: jasmine.createSpy('show') })
    },
    Modal: {
      getInstance: jasmine.createSpy('getModal').and.returnValue({ hide: jasmine.createSpy('hide') }),
      getOrCreateInstance: jasmine.createSpy('getOrCreateModal').and.callFake((element) => ({
        show: () => element.setAttribute('aria-hidden', 'false')
      }))
    }
  };
});

afterEach(() => {
  cleanup();
  delete window.bootstrap;
});

function findProductCard(name) {
  return screen.getByRole('heading', { name }).closest('article');
}

function addProductToCart(name = testProduct.nombre) {
  fireEvent.click(within(findProductCard(name)).getByRole('button', { name: /agregar/i }));
}

function readStoredValue(key) {
  return JSON.parse(window.localStorage.getItem(key));
}

describe('catálogo y carrito', () => {
  // 01. Verifica que el catálogo muestre todos los productos iniciales.
  it('muestra los productos iniciales del catálogo', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: testProduct.nombre })).toBeTruthy();
    expect(screen.getAllByRole('heading', { level: 2 }).length).toBe(DEFAULT_PRODUCTS.length);
  });

  // 02. Comprueba que el filtro deje visibles solo los productos de la categoría elegida.
  it('filtra los productos por la categoría elegida', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'Guitarras Eléctricas' }));

    expect(screen.getAllByRole('heading', { level: 2 }).length).toBe(2);
    expect(screen.getByRole('heading', { name: 'Guitarra Eléctrica Stratocaster Squier Affinity' })).toBeTruthy();
    expect(screen.queryByRole('heading', { name: testProduct.nombre })).toBeNull();
  });

  // 03. Confirma que la búsqueda por nombre muestre únicamente las coincidencias.
  it('busca productos por nombre', () => {
    render(<App />);

    fireEvent.change(screen.getByRole('searchbox', { name: 'Buscar producto' }), {
      target: { value: 'Fender CD-60S' }
    });

    expect(screen.getAllByRole('heading', { level: 2 }).length).toBe(1);
    expect(screen.getByRole('heading', { name: 'Guitarra Acústica Dreadnought Fender CD-60S' })).toBeTruthy();
  });

  // 04. Comprueba que agregar un producto guarde una unidad en el carrito.
  it('agrega una unidad del producto al carrito', () => {
    render(<App />);

    addProductToCart();

    expect(screen.getByRole('button', { name: 'Abrir carrito, 1 productos' })).toBeTruthy();
    expect(readStoredValue(STORAGE_KEYS.CART)).toEqual([{ ...testProduct, precioOriginal: testProduct.precio, cantidad: 1 }]);
  });

  // 05. Verifica que aumentar la cantidad actualice el carrito y el total.
  it('actualiza la cantidad y el total al aumentar unidades', () => {
    render(<App />);

    addProductToCart();
    fireEvent.click(screen.getByRole('button', { name: `Agregar una unidad de ${testProduct.nombre}` }));

    expect(screen.getByRole('button', { name: 'Abrir carrito, 2 productos' })).toBeTruthy();
    expect(screen.getAllByText(formatCLP(testProduct.precio * 2), { exact: true }).length).toBe(2);
  });

  // 06. Asegura que agregar más unidades que las disponibles sea rechazado.
  it('impide agregar unidades por encima del stock disponible', () => {
    window.localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify([{ ...testProduct, stock: 1 }]));
    render(<App />);

    addProductToCart();
    fireEvent.click(screen.getByRole('button', { name: `Agregar una unidad de ${testProduct.nombre}` }));

    expect(screen.getByRole('button', { name: 'Abrir carrito, 1 productos' })).toBeTruthy();
    expect(readStoredValue(STORAGE_KEYS.CART)[0].cantidad).toBe(1);
    expect(window.alert).toHaveBeenCalledWith(jasmine.stringMatching(/Stock máximo/));
  });

  // 07. Comprueba la navegación a las categorías y el filtro de una categoría.
  it('abre la vista independiente de categorías y filtra la seleccionada', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'Categorías' }));
    expect(screen.getByRole('heading', { name: 'Categorías' })).toBeTruthy();
    const categoryCard = screen.getByRole('heading', { name: 'Guitarras Acústicas' }).closest('article');
    fireEvent.click(within(categoryCard).getByRole('button', { name: 'Ver categoría' }));

    expect(screen.getByRole('heading', { name: 'Guitarras Acústicas' })).toBeTruthy();
    expect(screen.getAllByRole('heading', { level: 2 }).length).toBe(4);
    expect(screen.getByRole('heading', { name: testProduct.nombre })).toBeTruthy();
  });

  // 08. Verifica que el detalle muestre el producto y permita agregarlo al carrito.
  it('abre el detalle del producto y permite agregarlo al carrito', () => {
    render(<App />);

    fireEvent.click(within(findProductCard(testProduct.nombre)).getByRole('button', { name: 'Ver detalle' }));

    expect(screen.getByRole('heading', { name: testProduct.nombre, level: 1 })).toBeTruthy();
    expect(screen.getByText(testProduct.descripcion)).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Agregar al carrito' }));
    expect(readStoredValue(STORAGE_KEYS.CART)[0].cantidad).toBe(1);
  });
});

describe('autenticación', () => {
  // 09. Confirma que unas credenciales inválidas no inicien sesión.
  it('rechaza credenciales incorrectas en el formulario de acceso', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));
    fireEvent.change(screen.getByLabelText('Correo electrónico'), {
      target: { value: 'desconocido@ejemplo.cl' }
    });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'incorrecta' } });
    fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }));

    expect(window.alert).toHaveBeenCalledWith(jasmine.stringMatching(/Credenciales inválidas/));
    expect(window.localStorage.getItem(STORAGE_KEYS.CURRENT_USER)).toBeNull();
    expect(screen.getByRole('heading', { name: 'Iniciar sesión' })).toBeTruthy();
  });

  // 10. Verifica que el registro rechace un correo que ya pertenece a una cuenta.
  it('rechaza el registro de un correo ya registrado', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Registro' }));
    fireEvent.change(screen.getByLabelText('Nombre Completo'), { target: { value: 'Cliente Duplicado' } });
    fireEvent.change(screen.getByLabelText('Correo electrónico'), {
      target: { value: DEFAULT_USERS[2].email }
    });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'clave-segura' } });
    fireEvent.click(screen.getByRole('button', { name: 'Registrarse' }));

    expect(window.alert).toHaveBeenCalledWith(jasmine.stringMatching(/Correo ya registrado/));
    expect(readStoredValue(STORAGE_KEYS.USERS)).toHaveSize(DEFAULT_USERS.length);
  });

  // 11. Comprueba que el administrador pueda crear una cuenta de usuario.
  it('permite al administrador crear una cuenta de usuario', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));
    fireEvent.change(screen.getByLabelText('Correo electrónico'), {
      target: { value: 'admin@sonidovivo.cl' }
    });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }));

    fireEvent.click(screen.getByRole('tab', { name: /administración de usuarios/i }));
    fireEvent.click(screen.getByRole('button', { name: /crear usuario/i }));
    fireEvent.change(screen.getByLabelText('Nombre completo'), { target: { value: 'Persona de prueba' } });
    fireEvent.change(screen.getByLabelText('Correo electrónico'), {
      target: { value: 'persona@ejemplo.cl' }
    });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'prueba123' } });
    fireEvent.click(screen.getAllByRole('button', { name: 'Crear usuario' })[1]);

    expect(screen.getByText('persona@ejemplo.cl')).toBeTruthy();
  });

  // 12. Muestra un estado vacío cuando se solicita un producto inexistente.
  it('muestra un estado vacío para un producto inexistente', () => {
    window.history.replaceState({}, '', '/products/99999');
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Producto no disponible' })).toBeTruthy();
  });
});

describe('compra y persistencia', () => {
  // 13. Verifica que confirmar la compra cree un pedido y descuente el inventario.
  it('crea un pedido y descuenta las unidades del inventario', () => {
    window.localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(DEFAULT_USERS[2]));
    render(<App />);

    addProductToCart();
    fireEvent.click(screen.getByRole('button', { name: 'Proceder al Pago' }));
    fireEvent.change(screen.getByLabelText('Teléfono'), { target: { value: '+56 9 1234 5678' } });
    fireEvent.click(screen.getByRole('button', { name: 'Confirmar Pedido' }));

    const [order] = readStoredValue(STORAGE_KEYS.ORDERS);
    expect(order).toEqual(jasmine.objectContaining({
      clienteId: DEFAULT_USERS[2].id,
      items: [jasmine.objectContaining({ id: testProduct.id, nombre: testProduct.nombre, precio: testProduct.precio, cantidad: 1 })],
      contacto: { nombre: DEFAULT_USERS[2].nombre, telefono: '+56 9 1234 5678', email: DEFAULT_USERS[2].email },
      entrega: 'retiro',
      total: testProduct.precio
    }));
    expect(readStoredValue(STORAGE_KEYS.PRODUCTS).find((product) => product.id === testProduct.id).stock).toBe(testProduct.stock - 1);
    expect(readStoredValue(STORAGE_KEYS.CART)).toEqual([]);
    expect(screen.getByRole('heading', { name: 'Compra confirmada' })).toBeTruthy();
    expect(screen.getByText(order.numero)).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Ver mis pedidos' })).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Ver mis pedidos' }));
    expect(screen.getByRole('heading', { name: 'Mis Pedidos' })).toBeTruthy();
    expect(screen.getByText(`Contacto: ${DEFAULT_USERS[2].nombre} · +56 9 1234 5678 · ${DEFAULT_USERS[2].email}`)).toBeTruthy();
  });

  // 14. Comprueba que el pedido conserve los datos de contacto y la dirección de despacho.
  it('guarda los datos y la dirección del despacho en el pedido confirmado', () => {
    window.localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(DEFAULT_USERS[2]));
    render(<App />);

    addProductToCart();
    fireEvent.click(screen.getByRole('button', { name: 'Proceder al Pago' }));
    fireEvent.change(screen.getByLabelText('Teléfono'), { target: { value: '+56 9 8765 4321' } });
    fireEvent.click(screen.getByLabelText(/Despacho a domicilio/));
    fireEvent.change(screen.getByLabelText('Dirección de despacho'), {
      target: { value: '  Av. Concha y Toro 1234, Puente Alto  ' }
    });
    fireEvent.click(screen.getByRole('button', { name: 'Confirmar Pedido' }));

    const [order] = readStoredValue(STORAGE_KEYS.ORDERS);
    expect(order.entrega).toBe('despacho');
    expect(order.direccion).toBe('Av. Concha y Toro 1234, Puente Alto');
    expect(order.contacto.telefono).toBe('+56 9 8765 4321');
    expect(screen.getByText('Av. Concha y Toro 1234, Puente Alto')).toBeTruthy();
  });

  // 15. Impide confirmar un despacho sin dirección y conserva el carrito.
  it('muestra un error y conserva el carrito si falta la dirección de despacho', () => {
    window.localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(DEFAULT_USERS[2]));
    render(<App />);

    addProductToCart();
    fireEvent.click(screen.getByRole('button', { name: 'Proceder al Pago' }));
    fireEvent.change(screen.getByLabelText('Teléfono'), { target: { value: '+56 9 1234 5678' } });
    fireEvent.click(screen.getByLabelText(/Despacho a domicilio/));
    fireEvent.change(screen.getByLabelText('Dirección de despacho'), { target: { value: '   ' } });
    fireEvent.click(screen.getByRole('button', { name: 'Confirmar Pedido' }));

    expect(screen.getByRole('alert').textContent).toMatch(/dirección.*despacho/i);
    expect(readStoredValue(STORAGE_KEYS.ORDERS)).toEqual([]);
    expect(readStoredValue(STORAGE_KEYS.CART)[0].cantidad).toBe(1);
  });

  // 16. Impide crear un pedido si faltan los datos personales requeridos.
  it('valida los datos personales requeridos antes de registrar el pedido', () => {
    window.localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(DEFAULT_USERS[2]));
    render(<App />);

    addProductToCart();
    fireEvent.click(screen.getByRole('button', { name: 'Proceder al Pago' }));
    fireEvent.click(screen.getByRole('button', { name: 'Confirmar Pedido' }));

    expect(screen.getByRole('alert').textContent).toMatch(/datos personales/i);
    expect(readStoredValue(STORAGE_KEYS.ORDERS)).toEqual([]);
    expect(readStoredValue(STORAGE_KEYS.CART)[0].cantidad).toBe(1);
  });

  // 17. Conserva el pedido y el stock cuando no hay unidades suficientes.
  it('no confirma la compra cuando el stock disponible ya no alcanza', () => {
    const unavailableProduct = { ...testProduct, stock: 1 };
    window.localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify([unavailableProduct]));
    window.localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify([{ ...testProduct, cantidad: 2 }]));
    window.localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(DEFAULT_USERS[2]));
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'Abrir carrito, 2 productos' }));
    fireEvent.click(screen.getByRole('button', { name: 'Proceder al Pago' }));
    fireEvent.change(screen.getByLabelText('Teléfono'), { target: { value: '+56 9 1234 5678' } });
    fireEvent.click(screen.getByRole('button', { name: 'Confirmar Pedido' }));

    expect(screen.getByRole('alert').textContent).toMatch(/stock/i);
    expect(screen.getByRole('button', { name: 'Confirmar Pedido' })).toBeTruthy();
    expect(readStoredValue(STORAGE_KEYS.ORDERS)).toEqual([]);
    expect(readStoredValue(STORAGE_KEYS.CART)[0].cantidad).toBe(2);
    expect(readStoredValue(STORAGE_KEYS.PRODUCTS)[0].stock).toBe(1);
  });

  // 18. Informa cuando el pedido solicitado no existe o no está disponible.
  it('muestra un resultado de error si no encuentra el pedido solicitado', () => {
    window.localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(DEFAULT_USERS[2]));
    window.history.replaceState({}, '', '/checkout/success/123456');
    render(<App />);

    expect(screen.getByRole('heading', { name: 'No encontramos este pedido' })).toBeTruthy();
    expect(screen.getByRole('alert').textContent).toMatch(/no existe o no está disponible/i);
    expect(screen.getByRole('button', { name: 'Volver a la tienda' })).toBeTruthy();
  });

  // 19. Comprueba que una oferta configurada por administración llegue al catálogo y al carrito.
  it('publica ofertas configuradas por administración con el precio rebajado', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));
    fireEvent.change(screen.getByLabelText('Correo electrónico'), { target: { value: 'admin@sonidovivo.cl' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }));
    fireEvent.click(screen.getByRole('tab', { name: 'Ofertas' }));
    fireEvent.change(screen.getByRole('spinbutton', { name: `Descuento para ${testProduct.nombre}` }), {
      target: { value: '10' }
    });
    const offerRow = screen.getByRole('row', { name: new RegExp(testProduct.nombre) });
    fireEvent.click(within(offerRow).getByRole('button', { name: 'Guardar oferta' }));

    expect(readStoredValue(STORAGE_KEYS.PRODUCTS)[0].descuento).toBe(10);
    fireEvent.click(screen.getByRole('button', { name: 'Ir a la tienda' }));
    fireEvent.click(screen.getByRole('button', { name: 'Ofertas' }));

    expect(screen.getByText('-10%')).toBeTruthy();
    expect(screen.getByText(formatCLP(116991))).toBeTruthy();
    expect(screen.getByText(formatCLP(testProduct.precio))).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: /agregar/i }));
    fireEvent.click(screen.getByRole('button', { name: 'Catálogo' }));
    fireEvent.click(screen.getByRole('button', { name: 'Abrir carrito, 1 productos' }));

    expect(within(document.getElementById('cartOffcanvas')).getAllByText(formatCLP(116991), { exact: true }).length).toBe(2);
    expect(readStoredValue(STORAGE_KEYS.CART)[0]).toEqual(jasmine.objectContaining({
      id: testProduct.id, precio: 116991, precioOriginal: testProduct.precio, cantidad: 1
    }));
  });

  // 20. Verifica que el pedido confirmado use el precio rebajado vigente.
  it('incluye el precio de oferta vigente al confirmar la compra', () => {
    const discountedProduct = { ...testProduct, descuento: 10 };
    window.localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify([discountedProduct]));
    window.localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(DEFAULT_USERS[2]));
    render(<App />);

    addProductToCart();
    fireEvent.click(screen.getByRole('button', { name: 'Proceder al Pago' }));
    fireEvent.change(screen.getByLabelText('Teléfono'), { target: { value: '+56 9 1234 5678' } });
    fireEvent.click(screen.getByRole('button', { name: 'Confirmar Pedido' }));

    const [order] = readStoredValue(STORAGE_KEYS.ORDERS);
    expect(order.items[0].precio).toBe(116991);
    expect(order.items[0].precioOriginal).toBe(testProduct.precio);
    expect(order.items[0].descuento).toBe(10);
    expect(order.total).toBe(116991);
  });

  // 21. Comprueba que el carrito y sus productos se recuperen tras remontar la aplicación.
  it('recupera los datos guardados al volver a montar la aplicación', () => {
    const { unmount } = render(<App />);
    addProductToCart();
    unmount();

    render(<App />);

    expect(screen.getByRole('button', { name: 'Abrir carrito, 1 productos' })).toBeTruthy();
    expect(screen.getAllByText(testProduct.nombre).length).toBe(2);
    expect(readStoredValue(STORAGE_KEYS.CART)[0].cantidad).toBe(1);
  });
});
