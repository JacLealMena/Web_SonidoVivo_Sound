import React, { useEffect, useState } from 'react';
import AdminDashboard from './AdminDashboard';
import AuthPages from './AuthPages';
import Navbar from './navbar';
import OrdersPage from './OrdersPage';
import SellerDashboard from './SellerDashboard';
import Storefront from './Storefront';
import { DEFAULT_PRODUCTS, DEFAULT_USERS, ROLES, STORAGE_KEYS, createId, readStorage, showMessage, writeStorage } from './store';

/** Coordina rutas, sesión y estado compartido de la tienda React. */
export default function App() {
  const [products, setProducts] = useState(() => readStorage(STORAGE_KEYS.PRODUCTS, DEFAULT_PRODUCTS));
  const [users, setUsers] = useState(() => {
    const savedUsers = readStorage(STORAGE_KEYS.USERS, null);
    return savedUsers === null ? DEFAULT_USERS : savedUsers;
  });
  const [orders, setOrders] = useState(() => readStorage(STORAGE_KEYS.ORDERS, []));
  const [cart, setCart] = useState(() => readStorage(STORAGE_KEYS.CART, []));
  const [currentUser, setCurrentUser] = useState(() => readStorage(STORAGE_KEYS.CURRENT_USER, null));
  const [path, setPath] = useState(() => normalizePath(window.location.pathname));
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    writeStorage(STORAGE_KEYS.PRODUCTS, products);
  }, [products]);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.USERS, users);
  }, [users]);

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
  function handleLogin(email, password) {
    const matchedUser = users.find((user) => user.email.toLowerCase() === email.trim().toLowerCase() && user.password === password && user.activo);
    if (!matchedUser) {
      showMessage({ icon: 'error', title: 'Credenciales inválidas', text: 'Revisa tu correo y contraseña, o verifica que tu cuenta esté activa.' });
      return;
    }

    setCurrentUser(matchedUser);
    navigate(matchedUser.rol === ROLES.ADMIN ? '/admin' : matchedUser.rol === ROLES.SELLER ? '/seller' : '/');
  }

  /** Registra una cuenta de cliente tras validar los datos y el correo único. */
  function handleRegister(formData) {
    if (users.some((user) => user.email.toLowerCase() === formData.email.trim().toLowerCase())) {
      showMessage({ icon: 'error', title: 'Correo ya registrado', text: 'Ya existe una cuenta con ese correo.' });
      return;
    }
    if (formData.password.length < 6) {
      showMessage({ icon: 'error', title: 'Contraseña muy corta', text: 'La contraseña debe tener al menos 6 caracteres.' });
      return;
    }

    setUsers((existingUsers) => [...existingUsers, {
      id: createId(existingUsers),
      nombre: formData.nombre.trim(),
      email: formData.email.trim(),
      password: formData.password,
      rol: ROLES.CUSTOMER,
      activo: true
    }]);
    showMessage({ icon: 'success', title: 'Cuenta creada', text: 'Tu cuenta está lista. Inicia sesión para comprar.' }).then(() => navigate('/login'));
  }

  /** Cierra la sesión activa y vuelve a la tienda principal. */
  function handleLogout() {
    setCurrentUser(null);
    navigate('/');
  }

  /** Añade al carrito una unidad del producto seleccionado si hay stock. */
  function handleAddToCart(productId) {
    const selectedProduct = products.find((product) => product.id === Number(productId));
    if (!selectedProduct || selectedProduct.stock < 1) return;

    const cartItem = cart.find((item) => item.id === selectedProduct.id);
    if (cartItem && cartItem.cantidad >= selectedProduct.stock) {
      showMessage({ icon: 'warning', title: 'Límite de stock', text: 'Ya tienes todas las unidades disponibles en el carrito.' });
      return;
    }
    setCart(cartItem
      ? cart.map((item) => item.id === selectedProduct.id ? { ...item, cantidad: item.cantidad + 1 } : item)
      : [...cart, { ...selectedProduct, cantidad: 1 }]);
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
      showMessage({ icon: 'info', title: 'Inicia sesión', text: 'Necesitas una cuenta para confirmar tu pedido.' }).then(() => navigate('/login'));
      return;
    }
    if (!cart.length) {
      showMessage({ icon: 'info', title: 'Carrito vacío', text: 'Agrega al menos un producto antes de pagar.' });
      return;
    }

    const unavailableItem = cart.find((item) => {
      const product = products.find((storedProduct) => storedProduct.id === item.id);
      return !product || item.cantidad > product.stock;
    });
    if (unavailableItem) {
      showMessage({ icon: 'error', title: 'Stock insuficiente', text: `${unavailableItem.nombre} ya no tiene suficientes unidades disponibles.` });
      return;
    }

    const timestamp = Date.now();
    const order = {
      id: timestamp,
      numero: `PED-${String(timestamp).slice(-6)}`,
      clienteId: currentUser.id,
      clienteNombre: currentUser.nombre,
      email: currentUser.email,
      fecha: new Date().toISOString(),
      items: cart.map((item) => ({ id: item.id, nombre: item.nombre, precio: item.precio, cantidad: item.cantidad })),
      entrega: checkoutData.entrega,
      direccion: checkoutData.entrega === 'despacho' ? checkoutData.direccion : 'Retiro en tienda: Av. Concha y Toro 1234, Puente Alto',
      total: cart.reduce((total, item) => total + item.precio * item.cantidad, 0),
      estado: 'En preparación'
    };

    setOrders((existingOrders) => [...existingOrders, order]);
    setProducts((existingProducts) => existingProducts.map((product) => {
      const cartItem = cart.find((item) => item.id === product.id);
      return cartItem ? { ...product, stock: product.stock - cartItem.cantidad } : product;
    }));
    setCart([]);
    showMessage({ icon: 'success', title: 'Compra confirmada', text: `Tu pedido ${order.numero} fue registrado correctamente.` }).then(() => navigate('/orders'));
  }

  /** Actualiza un pedido existente después de validar el nuevo estado. */
  function handleOrderStatus(orderId, status) {
    setOrders((existingOrders) => existingOrders.map((order) => Number(order.id) === Number(orderId) ? { ...order, estado: status } : order));
  }

  /** Guarda los cambios hechos desde los paneles de administración e inventario. */
  function handleProductsChange(nextProducts) {
    setProducts(nextProducts);
  }

  /** Actualiza las cuentas administradas por el panel de usuarios. */
  function handleUsersChange(nextUsers) {
    setUsers(nextUsers);
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
    return <Storefront products={products} cart={cart} currentUser={currentUser} searchQuery={searchQuery} onSearch={setSearchQuery} onAddToCart={handleAddToCart} onCartQuantity={handleCartQuantity} onRemoveFromCart={handleRemoveFromCart} onCheckout={handleCheckout} onNavigate={navigate} />;
  }

  return (
    <>
      {showNavbar && <Navbar currentUser={currentUser} cart={cart} isStorefront={path === '/'} searchQuery={searchQuery} onSearch={setSearchQuery} onNavigate={navigate} onLogout={handleLogout} />}
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
  return '/';
}
