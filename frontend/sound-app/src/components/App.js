import React, { useEffect, useState } from 'react';
import AdminDashboard from './AdminDashboard';
import AuthPages from './AuthPages';
import CheckoutResult from './CheckoutResult';
import Navbar from './navbar';
import OrdersPage from './OrdersPage';
import { CategoriesPage, CategoryProductsPage, OffersPage, ProductDetailPage } from './ProductPages';
import SellerDashboard from './SellerDashboard';
import Storefront from './Storefront';
import { CATEGORIES, ROLES, STORAGE_KEYS, categorySlug, getSalePrice, readStorage, showMessage, writeStorage } from './store';
import { AuthService } from '../services/AuthService';
import { ProductService } from '../services/ProductService';
import { UserService } from '../services/UserService';

/** Coordina rutas, sesión y estado compartido de la tienda React. */
export default function App() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState(() => readStorage(STORAGE_KEYS.ORDERS, []));
  const [cart, setCart] = useState(() => readStorage(STORAGE_KEYS.CART, []));
  const [currentUser, setCurrentUser] = useState(() => readStorage(STORAGE_KEYS.CURRENT_USER, null));
  const [path, setPath] = useState(() => normalizePath(window.location.pathname));
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    reloadProducts();
  }, []);

  useEffect(() => {
    if (currentUser?.rol === ROLES.ADMIN) {
      reloadUsers();
    }
  }, [currentUser]);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.ORDERS, orders);
  }, [orders]);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.CART, cart);
  }, [cart]);

  useEffect(() => {
    if (currentUser) {
      writeStorage(STORAGE_KEYS.CURRENT_USER, currentUser);
    } else {
      window.localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  }, [currentUser]);

  useEffect(() => {
    /** Sincroniza la página actual cuando se usan los controles atrás y adelante del navegador. */
    function handlePopState() {
      setPath(normalizePath(window.location.pathname));
    }

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (path === '/admin' && currentUser?.rol !== ROLES.ADMIN) {
      setPath('/login');
      window.history.replaceState({}, '', '/login');
    }

    if (path === '/seller' && currentUser?.rol !== ROLES.SELLER) {
      setPath('/login');
      window.history.replaceState({}, '', '/login');
    }
  }, [currentUser, path]);

  /** Cambia de vista dentro de la SPA sin recargar la página. */
  function navigate(nextPath) {
    const normalizedPath = normalizePath(nextPath);
    window.history.pushState({}, '', normalizedPath);
    setPath(normalizedPath);
    window.scrollTo(0, 0);
  }

  /** Autentica una cuenta activa y la dirige a la vista apropiada para su rol. */
  async function handleLogin(email, password) {
    try {
      const auth = await AuthService.login(email, password);
      window.localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, auth.token);
      setCurrentUser(auth.usuario);
      navigate(auth.usuario.rol === ROLES.ADMIN ? '/admin' : auth.usuario.rol === ROLES.SELLER ? '/seller' : '/');
    } catch (error) {
      showMessage({ icon: 'error', title: 'Credenciales inválidas', text: 'Revisa tu correo y contraseña, o verifica que tu cuenta esté activa.' });
    }
  }

  /** Registra una cuenta de cliente tras validar los datos y el correo único. */
  async function handleRegister(formData) {
    if (formData.password.length < 6) {
      showMessage({ icon: 'error', title: 'Contraseña muy corta', text: 'La contraseña debe tener al menos 6 caracteres.' });
      return;
    }
    try {
      await AuthService.register(formData);
      showMessage({ icon: 'success', title: 'Cuenta creada', text: 'Tu cuenta está lista. Inicia sesión para comprar.' }).then(() => navigate('/login'));
    } catch (error) {
      const message = error.response?.data?.mensaje || 'No se pudo crear la cuenta.';
      showMessage({ icon: 'error', title: 'Registro no completado', text: message });
    }
  }

  /** Cierra la sesión activa y vuelve a la tienda principal. */
  function handleLogout() {
    setCurrentUser(null);
    window.localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    navigate('/');
  }

  /** Carga el catálogo desde el microservicio de productos. */
  async function reloadProducts() {
    try {
      const loadedProducts = await ProductService.getProducts();
      setProducts(loadedProducts);
    } catch (error) {
      console.error('No se pudo cargar el catálogo desde el backend.', error);
    }
  }

  /** Carga las cuentas desde el microservicio protegido de usuarios. */
  async function reloadUsers() {
    try {
      const loadedUsers = await UserService.getUsers();
      setUsers(loadedUsers);
    } catch (error) {
      console.error('No se pudo cargar la lista de usuarios.', error);
    }
  }

  /** Añade al carrito una unidad del producto seleccionado si hay stock. */
  function handleAddToCart(productId) {
    if (!currentUser) {
      navigate('/login');
      showMessage({ icon: 'info', title: 'Inicia sesión', text: 'Necesitas una cuenta para agregar productos al carrito.' });
      return;
    }
    const selectedProduct = products.find((product) => product.id === Number(productId));
    if (!selectedProduct || selectedProduct.stock < 1) return;

    const cartItem = cart.find((item) => item.id === selectedProduct.id);
    if (cartItem && cartItem.cantidad >= selectedProduct.stock) {
      showMessage({ icon: 'warning', title: 'Límite de stock', text: 'Ya tienes todas las unidades disponibles en el carrito.' });
      return;
    }
    setCart(cartItem
      ? cart.map((item) => item.id === selectedProduct.id ? { ...item, precioOriginal: selectedProduct.precio, precio: getSalePrice(selectedProduct), cantidad: item.cantidad + 1 } : item)
      : [...cart, { ...selectedProduct, precioOriginal: selectedProduct.precio, precio: getSalePrice(selectedProduct), cantidad: 1 }]);
  }

  /** Actualiza la cantidad de un producto del carrito y evita exceder el stock. */
  function handleCartQuantity(productId, difference) {
    const selectedProduct = products.find((product) => product.id === Number(productId));
    const selectedItem = cart.find((item) => item.id === Number(productId));
    if (!selectedItem) return;

    const nextQuantity = selectedItem.cantidad + difference;
    if (nextQuantity > (selectedProduct?.stock || 0)) {
      showMessage({ icon: 'warning', title: 'Stock máximo', text: 'No hay más unidades disponibles.' });
      return;
    }

    setCart(nextQuantity > 0
      ? cart.map((item) => item.id === Number(productId) ? { ...item, cantidad: nextQuantity } : item)
      : cart.filter((item) => item.id !== Number(productId)));
  }

  /** Quita un producto del carrito. */
  function handleRemoveFromCart(productId) {
    setCart((existingCart) => existingCart.filter((item) => item.id !== Number(productId)));
  }

  /** Registra un pedido, rebaja el inventario y vacía el carrito. */
  function handleCheckout(checkoutData) {
    if (!currentUser) {
      navigate('/login');
      return { success: false, error: 'Inicia sesión para confirmar tu pedido.' };
    }
    if (!cart.length) {
      return { success: false, error: 'Agrega al menos un producto antes de confirmar tu pedido.' };
    }

    const contact = {
      nombre: checkoutData.name.trim(),
      telefono: checkoutData.phone.trim(),
      email: checkoutData.email.trim()
    };
    if (!contact.nombre || !contact.telefono || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
      return { success: false, error: 'Revisa tu nombre, teléfono y correo electrónico antes de confirmar.' };
    }
    if (checkoutData.entrega !== 'retiro' && checkoutData.entrega !== 'despacho') {
      return { success: false, error: 'Selecciona un método de entrega válido.' };
    }
    if (checkoutData.entrega === 'despacho' && !checkoutData.direccion.trim()) {
      return { success: false, error: 'Ingresa una dirección válida para el despacho.' };
    }

    const unavailableItem = cart.find((item) => {
      const product = products.find((storedProduct) => storedProduct.id === item.id);
      return !product || !Number.isInteger(item.cantidad) || item.cantidad < 1 || item.cantidad > product.stock;
    });
    if (unavailableItem) {
      return { success: false, error: `Stock insuficiente para ${unavailableItem.nombre}. Ajusta la cantidad antes de volver a confirmar.` };
    }

    const timestamp = Date.now();
    const orderItems = cart.map((item) => {
      const product = products.find((storedProduct) => storedProduct.id === item.id);
      return { id: product.id, nombre: product.nombre, precio: getSalePrice(product), precioOriginal: product.precio, descuento: Number(product.descuento) || 0, cantidad: item.cantidad };
    });
    const order = {
      id: timestamp,
      numero: `PED-${String(timestamp).slice(-6)}`,
      clienteId: currentUser.id,
      clienteNombre: currentUser.nombre,
      email: contact.email,
      contacto: contact,
      fecha: new Date().toISOString(),
      items: orderItems,
      entrega: checkoutData.entrega,
      direccion: checkoutData.entrega === 'despacho' ? checkoutData.direccion : 'Retiro en tienda: Av. Concha y Toro 1234, Puente Alto',
      total: orderItems.reduce((total, item) => total + item.precio * item.cantidad, 0),
      estado: 'En preparación'
    };

    setOrders((existingOrders) => [...existingOrders, order]);
    setProducts((existingProducts) => existingProducts.map((product) => {
      const cartItem = cart.find((item) => item.id === product.id);
      return cartItem ? { ...product, stock: product.stock - cartItem.cantidad } : product;
    }));
    setCart([]);
    navigate(`/checkout/success/${order.id}`);
    return { success: true };
  }

  /** Actualiza un pedido existente después de validar el nuevo estado. */
  function handleOrderStatus(orderId, status) {
    setOrders((existingOrders) => existingOrders.map((order) => Number(order.id) === Number(orderId) ? { ...order, estado: status } : order));
  }

  /** Guarda los cambios hechos desde los paneles de administración e inventario. */
  async function handleProductsChange(nextProducts) {
    setProducts(nextProducts);
    try {
      const deletedProducts = products.filter((product) => !nextProducts.some((nextProduct) => nextProduct.id === product.id));
      for (const deletedProduct of deletedProducts) {
        await ProductService.deleteProduct(deletedProduct.id);
      }

      for (const nextProduct of nextProducts) {
        const storedProduct = products.find((product) => product.id === nextProduct.id);
        if (!storedProduct) {
          await ProductService.createProduct(nextProduct);
        } else if (JSON.stringify(storedProduct) !== JSON.stringify(nextProduct)) {
          await ProductService.updateProduct(nextProduct.codigo, nextProduct);
        }
      }
      await reloadProducts();
    } catch (error) {
      console.error('No se pudo sincronizar el producto con el backend.', error);
      showMessage({ icon: 'error', title: 'No se pudo guardar', text: 'Revisa tu sesión y vuelve a intentarlo.' });
      await reloadProducts();
    }
  }

  /** Actualiza las cuentas administradas por el panel de usuarios. */
  async function handleUsersChange(nextUsers) {
    setUsers(nextUsers);
    try {
      const deletedUsers = users.filter((user) => !nextUsers.some((nextUser) => nextUser.id === user.id));
      for (const deletedUser of deletedUsers) {
        await UserService.deleteUser(deletedUser.id);
      }

      for (const nextUser of nextUsers) {
        const storedUser = users.find((user) => user.id === nextUser.id);
        if (!storedUser) {
          await UserService.createUser({
            nombre: nextUser.nombre,
            email: nextUser.email,
            password: nextUser.password,
            rol: nextUser.rol,
            activo: nextUser.activo
          });
        } else if (JSON.stringify(storedUser) !== JSON.stringify(nextUser)) {
          await UserService.updateUser(nextUser.id, {
            nombre: nextUser.nombre,
            email: nextUser.email,
            rol: nextUser.rol,
            activo: nextUser.activo
          });
        }
      }
      await reloadUsers();
    } catch (error) {
      console.error('No se pudo sincronizar el usuario con el backend.', error);
      showMessage({ icon: 'error', title: 'No se pudo guardar', text: 'Revisa tu sesión y vuelve a intentarlo.' });
      await reloadUsers();
    }
  }

  const showNavbar = path !== '/login' && path !== '/register';
  const page = renderPage();

  /** Selecciona el componente que corresponde a la ruta y le pasa sus datos. */
  function renderPage() {
    if (path === '/login') return <AuthPages mode="login" onLogin={handleLogin} onNavigate={navigate} />;
    if (path === '/register') return <AuthPages mode="register" onRegister={handleRegister} onNavigate={navigate} />;
    if (path === '/admin') {
      return <AdminDashboard products={products} users={users} orders={orders} currentUser={currentUser} onProductsChange={handleProductsChange} onUsersChange={handleUsersChange} onOrderStatus={handleOrderStatus} onNavigate={navigate} onLogout={handleLogout} />;
    }
    if (path === '/seller') {
      return <SellerDashboard products={products} orders={orders} onProductsChange={handleProductsChange} onOrderStatus={handleOrderStatus} onNavigate={navigate} onLogout={handleLogout} />;
    }
    if (path === '/orders') return <OrdersPage currentUser={currentUser} orders={orders} onNavigate={navigate} />;
    if (path === '/categories') return <CategoriesPage products={products} onNavigate={navigate} />;
    if (path === '/offers') return <OffersPage products={products} onAddToCart={handleAddToCart} onNavigate={navigate} />;
    const categoryMatch = path.match(/^\/categories\/([a-z0-9-]+)$/);
    if (categoryMatch) {
      const category = CATEGORIES.find((item) => categorySlug(item) === categoryMatch[1]);
      if (category) return <CategoryProductsPage category={category} products={products} onAddToCart={handleAddToCart} onNavigate={navigate} />;
      return <CategoriesPage products={products} onNavigate={navigate} />;
    }
    const productMatch = path.match(/^\/products\/(\d+)$/);
    if (productMatch) {
      const product = products.find((item) => Number(item.id) === Number(productMatch[1]));
      return <ProductDetailPage product={product} onAddToCart={handleAddToCart} onNavigate={navigate} />;
    }
    const completedOrderMatch = path.match(/^\/checkout\/success\/(\d+)$/);
    if (completedOrderMatch) {
      const completedOrder = orders.find((order) => String(order.id) === completedOrderMatch[1] && Number(order.clienteId) === Number(currentUser?.id));
      return <CheckoutResult order={completedOrder} onNavigate={navigate} />;
    }
    return <Storefront products={products} cart={cart} currentUser={currentUser} searchQuery={searchQuery} onSearch={setSearchQuery} onAddToCart={handleAddToCart} onCartQuantity={handleCartQuantity} onRemoveFromCart={handleRemoveFromCart} onCheckout={handleCheckout} onNavigate={navigate} />;
  }

  return (
    <>
      {showNavbar && <Navbar currentUser={currentUser} cart={cart} isStorefront={path === '/'} showCatalogLinks={path !== '/admin' && path !== '/seller' && path !== '/login' && path !== '/register' && path !== '/orders' && !path.startsWith('/checkout/')} searchQuery={searchQuery} onSearch={setSearchQuery} onNavigate={navigate} onLogout={handleLogout} />}
      {page}
    </>
  );
}

/** Convierte las URL antiguas y las nuevas rutas en rutas internas de la SPA. */
function normalizePath(pathname) {
  const route = pathname.replace(/\/+$/, '').toLowerCase();
  if (route.endsWith('/admin') || route.endsWith('/admin.html')) return '/admin';
  if (route.endsWith('/seller') || route.endsWith('/vendedor.html')) return '/seller';
  if (route.endsWith('/login') || route.endsWith('/login.html')) return '/login';
  if (route.endsWith('/register') || route.endsWith('/registro.html')) return '/register';
  if (route.endsWith('/orders') || route.endsWith('/mis-pedidos.html')) return '/orders';
  if (route === '/categories' || route === '/offers') return route;
  const categoryPath = route.match(/^\/categories\/([a-z0-9-]+)$/);
  if (categoryPath) return `/categories/${categoryPath[1]}`;
  const productPath = route.match(/^\/products\/(\d+)$/);
  if (productPath) return `/products/${productPath[1]}`;
  const successfulCheckout = route.match(/\/checkout\/success\/(\d+)$/);
  if (successfulCheckout) return `/checkout/success/${successfulCheckout[1]}`;
  return '/';
}
