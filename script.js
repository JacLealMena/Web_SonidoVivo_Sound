const STORAGE_KEYS = {
  PRODUCTOS: 'sonidoVivo_productos',
  USUARIOS: 'sonidoVivo_usuarios',
  CART: 'sonidoVivo_cart',
  PEDIDOS: 'sonidoVivo_pedidos',
  CURRENT_USER: 'sonidoVivo_currentUser'
};

const ROLES = {
  ADMIN: 'admin',
  VENDEDOR: 'vendedor',
  CLIENTE: 'cliente'
};

let productos = [
  { id: 1, codigo: 'GA001', nombre: 'Guitarra Acústica Folk Yamaha F310', categoria: 'Guitarras Acústicas', descripcion: 'Guitarra acústica ideal para principiantes y uso diario.', precio: 129990, stock: 8, stockCritico: 3, imagen: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=600&q=80' },
  { id: 2, codigo: 'GA002', nombre: 'Guitarra Acústica Dreadnought Fender CD-60S', categoria: 'Guitarras Acústicas', descripcion: 'Gran proyección y tono cálido para conciertos y grabación.', precio: 189990, stock: 5, stockCritico: 3, imagen: 'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?auto=format&fit=crop&w=600&q=80' },
  { id: 3, codigo: 'GA003', nombre: 'Guitarra Acústica Clásica 4/4 Yamaha C40', categoria: 'Guitarras Acústicas', descripcion: 'Diseño clásico con excelente respuesta y comodidad.', precio: 89990, stock: 10, stockCritico: 4, imagen: 'https://images.unsplash.com/photo-1550291652-6ea9114a47b1?auto=format&fit=crop&w=600&q=80' },
  { id: 4, codigo: 'GA004', nombre: 'Guitarra Electroacústica Takamine GN20CE', categoria: 'Guitarras Acústicas', descripcion: 'Ideal para uso profesional y presentación en vivo.', precio: 349990, stock: 3, stockCritico: 2, imagen: 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?auto=format&fit=crop&w=600&q=80' },
  { id: 5, codigo: 'GE001', nombre: 'Guitarra Eléctrica Stratocaster Squier Affinity', categoria: 'Guitarras Eléctricas', descripcion: 'Versatilidad y estilo clásico para cualquier género.', precio: 249990, stock: 5, stockCritico: 2, imagen: 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?auto=format&fit=crop&w=600&q=80' },
  { id: 6, codigo: 'GE002', nombre: 'Guitarra Eléctrica Les Paul Epiphone Std', categoria: 'Guitarras Eléctricas', descripcion: 'Sonido contundente para rock y metal.', precio: 329990, stock: 4, stockCritico: 2, imagen: 'https://images.unsplash.com/photo-1550291652-6ea9114a47b1?auto=format&fit=crop&w=600&q=80' },
  { id: 7, codigo: 'BA001', nombre: 'Bajo Eléctrico 4 Cuerdas Squier Affinity PJ', categoria: 'Bajos Eléctricos', descripcion: 'Bajo potente con excelente respuesta en graves.', precio: 299990, stock: 5, stockCritico: 2, imagen: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=600&q=80' },
  { id: 8, codigo: 'BA002', nombre: 'Bajo Eléctrico Jazz Bass Fender Player Jazz', categoria: 'Bajos Eléctricos', descripcion: 'Gran presencia y claridad para estudios y shows.', precio: 699990, stock: 2, stockCritico: 1, imagen: 'https://images.unsplash.com/photo-1550985616-10810250b9a2?auto=format&fit=crop&w=600&q=80' },
  { id: 9, codigo: 'BT001', nombre: 'Batería Acústica 5 Piezas Pearl Roadshow', categoria: 'Baterías', descripcion: 'Kit completo ideal para ensayos y presentaciones.', precio: 599990, stock: 2, stockCritico: 1, imagen: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=600&q=80' },
  { id: 10, codigo: 'BT002', nombre: 'Batería Electrónica 8 Pads Roland TD-02KV', categoria: 'Baterías', descripcion: 'Batería versátil con sonido profesional y práctica.', precio: 799990, stock: 2, stockCritico: 1, imagen: 'https://images.unsplash.com/photo-1543443374-b6fe10a6ab7b?auto=format&fit=crop&w=600&q=80' },
  { id: 11, codigo: 'TC001', nombre: 'Teclado Digital Yamaha PSR-E373', categoria: 'Teclados y Pianos', descripcion: 'Teclado con varios sonidos y funciones de práctica.', precio: 249990, stock: 4, stockCritico: 2, imagen: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80' },
  { id: 12, codigo: 'TC002', nombre: 'Piano Digital Yamaha P-45', categoria: 'Teclados y Pianos', descripcion: 'Piano digital de 88 teclas con respuesta natural.', precio: 499990, stock: 2, stockCritico: 1, imagen: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=600&q=80' },
  { id: 13, codigo: 'AM001', nombre: 'Amplificador Fender Frontman 15G', categoria: 'Amplificadores', descripcion: 'Amplificador compacto con gran claridad y rendimiento.', precio: 99990, stock: 5, stockCritico: 2, imagen: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80' },
  { id: 14, codigo: 'AM002', nombre: 'Amplificador Marshall MG40GFX', categoria: 'Amplificadores', descripcion: 'Potencia y efectos para estudio o escenario.', precio: 299990, stock: 3, stockCritico: 2, imagen: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80' },
  { id: 15, codigo: 'MI001', nombre: 'Micrófono Shure SM58', categoria: 'Micrófonos', descripcion: 'Micrófono dinámico profesional para voz e instrumentos.', precio: 149990, stock: 8, stockCritico: 3, imagen: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80' },
  { id: 16, codigo: 'MI002', nombre: 'Micrófono Shure SM57', categoria: 'Micrófonos', descripcion: 'Versátil para instrumentos y grabación de precisión.', precio: 139990, stock: 6, stockCritico: 3, imagen: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80' },
  { id: 17, codigo: 'PE001', nombre: 'Pedal Boss DS-1', categoria: 'Pedales de Efectos', descripcion: 'Distorsión clásica con gran respuesta y tono expresivo.', precio: 79990, stock: 7, stockCritico: 3, imagen: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80' },
  { id: 18, codigo: 'PE002', nombre: 'Pedal Boss RV-6', categoria: 'Pedales de Efectos', descripcion: 'Reverb con múltiples ajustes para espacios diversos.', precio: 179990, stock: 4, stockCritico: 2, imagen: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80' },
  { id: 19, codigo: 'AC001', nombre: 'Cuerdas Ernie Ball Super Slinky', categoria: 'Accesorios', descripcion: 'Cuerdas de guitarra con tonos brillantes y gran durabilidad.', precio: 8990, stock: 25, stockCritico: 10, imagen: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80' },
  { id: 20, codigo: 'AC002', nombre: 'Púas de Guitarra x10 Fender 351', categoria: 'Accesorios', descripcion: 'Set de púas de alta calidad para guitarra.', precio: 3990, stock: 50, stockCritico: 20, imagen: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80' },
  { id: 21, codigo: 'ES001', nombre: 'Interfaz Focusrite Scarlett Solo', categoria: 'Estudio y Grabación', descripcion: 'Interfaz USB para grabación profesional en estudio casero.', precio: 149990, stock: 4, stockCritico: 2, imagen: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80' },
  { id: 22, codigo: 'ES002', nombre: 'Auriculares Audio-Technica ATH-M50x', categoria: 'Estudio y Grabación', descripcion: 'Auriculares de estudio con respuesta equilibrada.', precio: 219990, stock: 4, stockCritico: 2, imagen: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80' }
];

let carrito = [];
let categoriaActual = 'Todos';

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    return fallback;
  }
}

function saveProducts() {
  localStorage.setItem(STORAGE_KEYS.PRODUCTOS, JSON.stringify(productos));
}

function saveCart() {
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(carrito));
}

function getCurrentUser() {
  return readStorage(STORAGE_KEYS.CURRENT_USER, null);
}

function hasRole(usuario, rolesPermitidos) {
  return !!usuario && rolesPermitidos.includes(usuario.rol);
}

function redirectByRole(usuario) {
  if (!usuario) {
    window.location.href = 'login.html';
    return;
  }

  if (usuario.rol === ROLES.ADMIN) {
    window.location.href = 'admin.html';
    return;
  }

  if (usuario.rol === ROLES.VENDEDOR) {
    window.location.href = 'vendedor.html';
    return;
  }

  window.location.href = 'index.html';
}

function seedData() {
  const storedProducts = readStorage(STORAGE_KEYS.PRODUCTOS, null);
  if (!storedProducts || !storedProducts.length) {
    saveProducts();
  } else {
    productos = storedProducts;
  }

  const usuariosIniciales = [
    { id: 1, nombre: 'Administrador', email: 'admin@sonidovivo.cl', password: '123456', rol: ROLES.ADMIN, activo: true },
    { id: 2, nombre: 'Vendedor Principal', email: 'vendedor@sonidovivo.cl', password: '123456', rol: ROLES.VENDEDOR, activo: true },
    { id: 3, nombre: 'Cliente Demo', email: 'cliente@sonidovivo.cl', password: '123456', rol: ROLES.CLIENTE, activo: true }
  ];

  const storedUsers = readStorage(STORAGE_KEYS.USUARIOS, []);
  const usuariosMap = new Map((storedUsers || []).map((usuario) => [usuario.email.toLowerCase(), usuario]));

  usuariosIniciales.forEach((usuarioBase) => {
    const emailKey = usuarioBase.email.toLowerCase();
    if (usuariosMap.has(emailKey)) {
      const actual = usuariosMap.get(emailKey);
      actual.nombre = usuarioBase.nombre;
      actual.password = usuarioBase.password;
      actual.rol = usuarioBase.rol;
      actual.activo = true;
    } else {
      storedUsers.push({ ...usuarioBase });
      usuariosMap.set(emailKey, { ...usuarioBase });
    }
  });

  localStorage.setItem(STORAGE_KEYS.USUARIOS, JSON.stringify(storedUsers));
  carrito = readStorage(STORAGE_KEYS.CART, []);
}

function ensureSecurity() {
  const usuario = getCurrentUser();
  const page = document.body && document.body.dataset.page;

  if (page === 'admin' && !hasRole(usuario, [ROLES.ADMIN])) {
    window.location.href = 'login.html';
    return;
  }

  if (page === 'seller' && !hasRole(usuario, [ROLES.VENDEDOR])) {
    window.location.href = 'login.html';
  }
}

function formatCLP(amount) {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount || 0);
}

function renderProductos(lista) {
  const grid = document.getElementById('productGrid');
  if (!grid) return;

  grid.innerHTML = '';
  if (!lista || lista.length === 0) {
    grid.innerHTML = `
      <div class="col-12 text-center py-5">
        <i class="fa-solid fa-box-open fa-3x text-muted mb-3"></i>
        <h5 class="text-muted">No se encontraron productos en esta categoría.</h5>
      </div>
    `;
    return;
  }

  lista.forEach((prod) => {
    const pocoStock = prod.stock > 0 && prod.stock <= 3;
    const sinStock = prod.stock === 0;
    const col = document.createElement('div');
    col.className = 'col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-stretch';

    col.innerHTML = `
      <div class="card h-100 shadow-sm border-0 position-relative w-100">
        ${sinStock
          ? '<span class="badge bg-danger position-absolute top-0 start-0 m-2 px-2 py-1">Agotado</span>'
          : pocoStock
            ? `<span class="badge bg-warning text-dark position-absolute top-0 start-0 m-2 px-2 py-1 shadow-sm"><i class="fa-solid fa-triangle-exclamation me-1"></i>¡Últimas ${prod.stock} un!</span>`
            : ''}
        <img src="${prod.imagen}" class="card-img-top p-3 img-fluid" alt="${prod.nombre}" style="height: 200px; object-fit: contain;">
        <div class="card-body d-flex flex-column">
          <span class="badge bg-secondary mb-2 align-self-start">${prod.categoria}</span>
          <h6 class="card-title text-dark fw-bold mb-2" style="font-size: 0.95rem;">${prod.nombre}</h6>
          <p class="card-text mb-3 small">
            ${sinStock
              ? '<span class="text-danger fw-bold">Sin stock disponible</span>'
              : pocoStock
                ? `<span class="text-warning-emphasis fw-bold"><i class="fa-solid fa-clock me-1"></i>Quedan solo ${prod.stock} unidades</span>`
                : `<span class="text-muted">Stock: ${prod.stock} un.</span>`}
          </p>
          <div class="mt-auto d-flex align-items-center justify-content-between">
            <span class="fs-5 fw-bold text-success">${formatCLP(prod.precio)}</span>
            <button class="btn btn-primary btn-sm px-3" onclick="addToCart(${prod.id})" ${sinStock ? 'disabled' : ''}>
              <i class="fa-solid fa-cart-plus me-1"></i> Agregar
            </button>
          </div>
        </div>
      </div>
    `;

    grid.appendChild(col);
  });
}

function filtrarCategoria(cat, btn) {
  categoriaActual = cat;
  if (btn) {
    document.querySelectorAll('#categoryFilters button').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
  }
  const filtrados = cat === 'Todos' ? productos : productos.filter((p) => p.categoria === cat);
  renderProductos(filtrados);
}

function filtrarProductos() {
  const query = document.getElementById('searchInput')?.value.toLowerCase() || '';
  const filtrados = productos.filter((p) =>
    (categoriaActual === 'Todos' || p.categoria === categoriaActual) &&
    p.nombre.toLowerCase().includes(query)
  );
  renderProductos(filtrados);
}

function addToCart(id) {
  const idProducto = Number(id);
  const prod = productos.find((p) => p.id === idProducto);
  if (!prod || prod.stock === 0) return;

  const itemCart = carrito.find((item) => item.id === idProducto);
  if (itemCart) {
    if (itemCart.cantidad < prod.stock) {
      itemCart.cantidad += 1;
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Límite de Stock',
        text: 'Has alcanzado la cantidad máxima disponible de este producto.',
        confirmButtonColor: '#ffc107'
      });
      return;
    }
  } else {
    carrito.push({ ...prod, cantidad: 1 });
  }

  saveCart();
  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: 'success',
    title: 'Añadido al carrito',
    showConfirmButton: false,
    timer: 1800,
    timerProgressBar: true
  });

  updateCartUI();
}

function updateCartUI() {
  const container = document.getElementById('cartItemsContainer');
  if (!container) return;

  container.innerHTML = '';
  let total = 0;
  let count = 0;

  if (carrito.length === 0) {
    container.innerHTML = '<p class="text-center text-muted py-4">El carrito está vacío</p>';
  } else {
    carrito.forEach((item) => {
      total += item.precio * item.cantidad;
      count += item.cantidad;
      container.innerHTML += `
        <div class="d-flex justify-content-between align-items-center border-bottom py-2">
          <div class="me-2">
            <h6 class="mb-0 fs-6 fw-semibold">${item.nombre}</h6>
            <small class="text-muted">${formatCLP(item.precio)} c/u</small>
            <div class="d-flex align-items-center gap-2 mt-1">
              <button class="btn btn-sm btn-outline-secondary py-0 px-2" onclick="changeQuantity(${item.id}, -1)">-</button>
              <span class="fw-bold fs-6">${item.cantidad}</span>
              <button class="btn btn-sm btn-outline-secondary py-0 px-2" onclick="changeQuantity(${item.id}, 1)">+</button>
            </div>
          </div>
          <div class="text-end">
            <span class="fw-bold d-block mb-1">${formatCLP(item.precio * item.cantidad)}</span>
            <button class="btn btn-sm btn-link text-danger p-0 border-0" onclick="removeFromCart(${item.id})" title="Eliminar producto">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </div>`;
    });
  }

  const badge = document.getElementById('cartCountBadge');
  const totalEl = document.getElementById('cartTotal');
  if (badge) badge.textContent = count;
  if (totalEl) totalEl.textContent = formatCLP(total);
  const modalTotal = document.getElementById('modalCartTotal');
  if (modalTotal) modalTotal.textContent = formatCLP(total);
  saveCart();
}

function changeQuantity(id, delta) {
  const idProducto = Number(id);
  const item = carrito.find((p) => p.id === idProducto);
  const prodOriginal = productos.find((p) => p.id === idProducto); 

  if (!item || !prodOriginal) return;

  if (delta > 0 && item.cantidad >= prodOriginal.stock) {
    Swal.fire({
      icon: 'warning',
      title: 'Stock Máximo',
      text: 'No puedes agregar más unidades de las disponibles.',
      confirmButtonColor: '#ffc107'
    });
    return;
  }

  item.cantidad += delta;
  if (item.cantidad <= 0) {
    removeFromCart(idProducto);
  } else {
    updateCartUI();
  }
}

function removeFromCart(id) {
  const idProducto = Number(id);
  carrito = carrito.filter((item) => item.id !== idProducto);
  updateCartUI();
}

function openCheckoutModal() {
  const usuarioActual = getCurrentUser();
  if (!usuarioActual) {
    Swal.fire({
      icon: 'info',
      title: 'Debes iniciar sesión',
      text: 'Necesitas tener una cuenta para confirmar tu pedido.',
      confirmButtonText: 'Iniciar sesión',
      confirmButtonColor: '#0d6efd'
    }).then(() => {
      window.location.href = 'login.html';
    });
    return;
  }

  if (carrito.length === 0) {
    Swal.fire({
      icon: 'info',
      title: 'Carrito Vacío',
      text: 'Agrega al menos un producto al carrito antes de proceder al pago.',
      confirmButtonColor: '#0d6efd'
    });
    return;
  }

  const cartOffcanvasEl = document.getElementById('cartOffcanvas');
  const cartOffcanvas = bootstrap.Offcanvas.getInstance(cartOffcanvasEl);
  if (cartOffcanvas) cartOffcanvas.hide();

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const modalTotal = document.getElementById('modalCartTotal');
  if (modalTotal) modalTotal.textContent = formatCLP(total);

  const checkoutModal = new bootstrap.Modal(document.getElementById('checkoutModal'));
  checkoutModal.show();
}

function toggleDireccion(mostrar) {
  const container = document.getElementById('direccionContainer');
  const input = document.getElementById('inputDireccion');
  if (!container || !input) return;

  if (mostrar) {
    container.classList.remove('d-none');
    input.required = true;
  } else {
    container.classList.add('d-none');
    input.required = false;
    input.value = '';
  }
}

function procesarPago(event) {
  event.preventDefault();

  const usuarioActual = getCurrentUser();
  if (!usuarioActual) {
    window.location.href = 'login.html';
    return;
  }

  if (carrito.length === 0) {
    Swal.fire({ icon: 'warning', title: 'Carrito vacío', text: 'No hay productos para confirmar.' });
    return;
  }

  const entrega = document.querySelector('input[name="tipoEntrega"]:checked')?.value || 'retiro';
  const direccion = document.getElementById('inputDireccion')?.value || '';

  for (const item of carrito) {
    const producto = productos.find((p) => p.id === item.id);
    if (!producto) {
      Swal.fire({ icon: 'error', title: 'Producto no disponible', text: `El producto ${item.nombre} ya no está disponible.` });
      return;
    }
    if (item.cantidad > producto.stock) {
      Swal.fire({
        icon: 'warning',
        title: 'Stock insuficiente',
        text: `La cantidad solicitada de ${item.nombre} supera el stock disponible.`
      });
      return;
    }
  }

  const pedido = {
    id: Date.now(),
    numero: `PED-${Date.now().toString().slice(-6)}`,
    clienteId: usuarioActual.id,
    clienteNombre: usuarioActual.nombre,
    email: usuarioActual.email,
    fecha: new Date().toISOString(),
    items: carrito.map((item) => ({ id: item.id, nombre: item.nombre, precio: item.precio, cantidad: item.cantidad })),
    entrega,
    direccion: entrega === 'despacho' ? direccion : 'Retiro en tienda: Av. Concha y Toro 1234, Puente Alto',
    total: carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0),
    estado: 'En preparación'
  };

  const pedidosGuardados = readStorage(STORAGE_KEYS.PEDIDOS, []);
  pedidosGuardados.push(pedido);
  localStorage.setItem(STORAGE_KEYS.PEDIDOS, JSON.stringify(pedidosGuardados));

  for (const item of carrito) {
    const producto = productos.find((p) => p.id === item.id);
    if (producto) {
      producto.stock -= item.cantidad;
    }
  }
  saveProducts();

  carrito = [];
  saveCart();
  updateCartUI();

  const modalEl = document.getElementById('checkoutModal');
  const modal = bootstrap.Modal.getInstance(modalEl);
  if (modal) modal.hide();

  document.getElementById('checkoutForm')?.reset();
  toggleDireccion(false);

  Swal.fire({
    icon: 'success',
    title: '¡Compra Confirmada!',
    text: `Tu pedido ${pedido.numero} fue registrado correctamente.`,
    confirmButtonText: 'Aceptar',
    confirmButtonColor: '#198754'
  }).then(() => {
    window.location.href = 'mis-pedidos.html';
  });
}

function procesarRegistro(event) {
  event.preventDefault();

  const nombre = document.getElementById('registroNombre')?.value.trim() || '';
  const email = document.getElementById('registroEmail')?.value.trim() || '';
  const password = document.getElementById('registroPassword')?.value || '';

  if (!nombre || !email || !password) {
    Swal.fire({ icon: 'error', title: 'Faltan datos', text: 'Completa todos los campos para registrarte.' });
    return;
  }

  const usuarios = readStorage(STORAGE_KEYS.USUARIOS, []);
  if (usuarios.some((usuario) => usuario.email.toLowerCase() === email.toLowerCase())) {
    Swal.fire({ icon: 'error', title: 'Correo ya registrado', text: 'Ya existe una cuenta con ese correo.' });
    return;
  }

  usuarios.push({ id: Date.now(), nombre, email, password, rol: 'cliente', activo: true });
  localStorage.setItem(STORAGE_KEYS.USUARIOS, JSON.stringify(usuarios));

  Swal.fire({
    icon: 'success',
    title: '¡Registro Exitoso!',
    text: 'Tu cuenta ha sido creada correctamente. Ahora puedes iniciar sesión.',
    confirmButtonText: 'Ir al login',
    confirmButtonColor: '#ffc107'
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = 'login.html';
    }
  });
}

function procesarLogin(event) {
  event.preventDefault();

  seedData();

  const email = document.getElementById('loginEmail')?.value.trim() || '';
  const password = document.getElementById('loginPassword')?.value || '';

  const usuarios = readStorage(STORAGE_KEYS.USUARIOS, []);
  const usuario = usuarios.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password && u.activo);

  if (!usuario) {
    Swal.fire({ icon: 'error', title: 'Credenciales inválidas', text: 'Correo o contraseña incorrectos, o la cuenta está desactivada.' });
    return;
  }

  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(usuario));
  redirectByRole(usuario);
}

function cerrarSesion() {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  window.location.href = 'login.html';
}

function renderUserMenu() {
  const container = document.getElementById('userMenuContainer');
  if (!container) return;

  const usuario = getCurrentUser();
  if (!usuario) {
    container.innerHTML = '<a class="nav-link text-white fw-semibold" href="login.html"><i class="fa-solid fa-right-to-bracket me-1"></i> Iniciar sesión</a>';
    return;
  }

  const panelLink = usuario.rol === ROLES.ADMIN
    ? '<li><a class="dropdown-item" href="admin.html">Panel Admin</a></li>'
    : usuario.rol === ROLES.VENDEDOR
      ? '<li><a class="dropdown-item" href="vendedor.html">Panel Vendedor</a></li>'
      : '<li><a class="dropdown-item" href="mis-pedidos.html">Mis pedidos</a></li>';

  container.innerHTML = `
    <div class="dropdown">
      <button class="btn btn-outline-light btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        <i class="fa-solid fa-user me-1"></i> ${usuario.nombre}
      </button>
      <ul class="dropdown-menu">
        ${panelLink}
        <li><button class="dropdown-item text-danger" type="button" onclick="cerrarSesion()">Cerrar sesión</button></li>
      </ul>
    </div>
  `;
}

function initMap() {
  const map = L.map('map').setView([-33.6117, -70.5758], 15);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
  L.marker([-33.6117, -70.5758]).addTo(map).bindPopup('Sonido Vivo').openPopup();
}

function renderVendedorDashboard() {
  const usuarioActual = getCurrentUser();
  if (!usuarioActual || usuarioActual.rol !== ROLES.VENDEDOR) {
    window.location.href = 'login.html';
    return;
  }

  renderResumenVendedor();
  renderTablaVendedor();
  renderPedidosVendedor();
}

function renderResumenVendedor() {
  const totalProductos = productos.length;
  const totalStock = productos.reduce((acc, prod) => acc + Number(prod.stock || 0), 0);
  const pedidosAbiertos = readStorage(STORAGE_KEYS.PEDIDOS, []).filter((pedido) => pedido.estado !== 'Entregado').length;
  const valorInventario = productos.reduce((acc, prod) => acc + Number(prod.precio || 0) * Number(prod.stock || 0), 0);

  document.getElementById('resumenProductosVendedor')?.replaceChildren(document.createTextNode(String(totalProductos)));
  document.getElementById('resumenStockVendedor')?.replaceChildren(document.createTextNode(String(totalStock)));
  document.getElementById('resumenPedidosVendedor')?.replaceChildren(document.createTextNode(String(pedidosAbiertos)));

  const informe = document.getElementById('vendedorInformes');
  if (!informe) return;

  const categoriaStock = Object.entries(
    productos.reduce((acc, prod) => {
      const key = prod.categoria;
      acc[key] = (acc[key] || 0) + Number(prod.stock || 0);
      return acc;
    }, {})
  ).sort((a, b) => b[1] - a[1]).slice(0, 4);

  const maxStock = categoriaStock.length ? Math.max(...categoriaStock.map(([, value]) => value)) : 1;
  const productosCriticos = productos.filter((prod) => Number(prod.stock || 0) <= Number(prod.stockCritico || 0)).slice(0, 3);

  informe.innerHTML = `
    <div class="row g-3">
      <div class="col-lg-4">
        <div class="info-panel p-3 h-100">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="text-muted text-uppercase small">Inventario</span>
            <span class="badge bg-info-subtle text-info"><i class="fa-solid fa-chart-column"></i></span>
          </div>
          <h4 class="fw-bold mb-1">${formatCLP(valorInventario)}</h4>
          <small class="text-muted">Valor estimado del stock actual</small>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="info-panel p-3 h-100">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="text-muted text-uppercase small">Atención</span>
            <span class="badge bg-warning-subtle text-warning"><i class="fa-solid fa-triangle-exclamation"></i></span>
          </div>
          <h4 class="fw-bold mb-1">${productosCriticos.length}</h4>
          <small class="text-muted">Productos con stock bajo o crítico</small>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="info-panel p-3 h-100">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="text-muted text-uppercase small">Estado</span>
            <span class="badge bg-success-subtle text-success"><i class="fa-solid fa-circle-check"></i></span>
          </div>
          <h4 class="fw-bold mb-1">${pedidosAbiertos}</h4>
          <small class="text-muted">Pedidos activos pendientes</small>
        </div>
      </div>

      <div class="col-lg-7">
        <div class="info-panel p-3 h-100">
          <h6 class="fw-bold mb-3"><i class="fa-solid fa-layer-group me-2 text-primary"></i>Distribución de stock</h6>
          <div class="d-flex flex-column gap-3">
            ${categoriaStock.map(([categoria, stock]) => `
              <div>
                <div class="d-flex justify-content-between small mb-1">
                  <span class="text-muted">${categoria}</span>
                  <span class="fw-semibold">${stock} und.</span>
                </div>
                <div class="bar-track">
                  <div class="bar-fill" style="width: ${(stock / maxStock) * 100}%"></div>
                </div>
              </div>
            `).join('') || '<p class="text-muted mb-0">Sin datos de categorías disponibles.</p>'}
          </div>
        </div>
      </div>

      <div class="col-lg-5">
        <div class="info-panel p-3 h-100">
          <h6 class="fw-bold mb-3"><i class="fa-solid fa-bell me-2 text-warning"></i>Alertas de stock</h6>
          <div class="d-flex flex-column gap-2">
            ${productosCriticos.length ? productosCriticos.map((prod) => `
              <div class="warning-item p-2">
                <strong>${prod.nombre}</strong>
                <span class="small text-muted">Stock actual: ${prod.stock} · Crítico: ${prod.stockCritico ?? 0}</span>
              </div>
            `).join('') : '<p class="text-muted mb-0">No hay alertas por stock bajo.</p>'}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderAdminInformes() {
  const panel = document.getElementById('adminInformes');
  if (!panel) return;

  const pedidos = readStorage(STORAGE_KEYS.PEDIDOS, []);
  const ventas = pedidos.reduce((acc, pedido) => acc + Number(pedido.total || 0), 0);
  const pedidosActivos = pedidos.filter((pedido) => pedido.estado !== 'Entregado').length;
  const productosCriticos = productos.filter((producto) => Number(producto.stock || 0) <= Number(producto.stockCritico || 0)).length;
  const categorias = Object.entries(
    productos.reduce((acc, prod) => {
      acc[prod.categoria] = (acc[prod.categoria] || 0) + Number(prod.stock || 0);
      return acc;
    }, {})
  ).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const maxCategorias = categorias.length ? Math.max(...categorias.map(([, value]) => value)) : 1;

  panel.innerHTML = `
    <div class="row g-3">
      <div class="col-lg-4">
        <div class="info-panel p-3 h-100">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="text-muted text-uppercase small">Ventas</span>
            <span class="badge bg-success-subtle text-success"><i class="fa-solid fa-dollar-sign"></i></span>
          </div>
          <h4 class="fw-bold mb-1 text-success">${formatCLP(ventas)}</h4>
          <small class="text-muted">Monto total acumulado</small>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="info-panel p-3 h-100">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="text-muted text-uppercase small">Pedidos activos</span>
            <span class="badge bg-primary-subtle text-primary"><i class="fa-solid fa-truck-fast"></i></span>
          </div>
          <h4 class="fw-bold mb-1">${pedidosActivos}</h4>
          <small class="text-muted">Operaciones aún en proceso</small>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="info-panel p-3 h-100">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="text-muted text-uppercase small">Productos críticos</span>
            <span class="badge bg-warning-subtle text-warning"><i class="fa-solid fa-circle-exclamation"></i></span>
          </div>
          <h4 class="fw-bold mb-1">${productosCriticos}</h4>
          <small class="text-muted">Ítems por debajo del umbral</small>
        </div>
      </div>

      <div class="col-lg-7">
        <div class="info-panel p-3 h-100">
          <h6 class="fw-bold mb-3"><i class="fa-solid fa-chart-pie me-2 text-success"></i>Stock por categoría</h6>
          <div class="d-flex flex-column gap-3">
            ${categorias.map(([categoria, stock]) => `
              <div>
                <div class="d-flex justify-content-between small mb-1">
                  <span class="text-muted">${categoria}</span>
                  <span class="fw-semibold">${stock} und.</span>
                </div>
                <div class="bar-track">
                  <div class="bar-fill" style="width: ${(stock / maxCategorias) * 100}%"></div>
                </div>
              </div>
            `).join('') || '<p class="text-muted mb-0">Sin categorías registradas.</p>'}
          </div>
        </div>
      </div>

      <div class="col-lg-5">
        <div class="info-panel p-3 h-100">
          <h6 class="fw-bold mb-3"><i class="fa-solid fa-list-check me-2 text-primary"></i>Resumen ejecutivo</h6>
          <ul class="list-unstyled mb-0 d-flex flex-column gap-2">
            <li class="small text-muted"><strong class="text-dark">${productos.length}</strong> productos en catálogo</li>
            <li class="small text-muted"><strong class="text-dark">${pedidos.length}</strong> pedidos registrados</li>
            <li class="small text-muted"><strong class="text-dark">${productos.filter((producto) => Number(producto.stock || 0) > 0).length}</strong> productos disponibles</li>
            <li class="small text-muted"><strong class="text-dark">${productos.filter((producto) => Number(producto.stock || 0) === 0).length}</strong> productos sin stock</li>
          </ul>
        </div>
      </div>
    </div>
  `;
}

function renderTablaVendedor() {
  const tbody = document.getElementById('tablaVendedorProductos');
  if (!tbody) return;

  tbody.innerHTML = productos.map((prod) => `
    <tr>
      <td>${prod.nombre}</td>
      <td>${prod.categoria}</td>
      <td>${formatCLP(prod.precio)}</td>
      <td>
        <div class="d-flex align-items-center gap-2">
          <button class="btn btn-sm btn-outline-danger py-0 px-2" onclick="actualizarStockVendedor(${prod.id}, -1)">-</button>
          <span class="fw-bold ${prod.stock === 0 ? 'text-danger' : ''}">${prod.stock}</span>
          <button class="btn btn-sm btn-outline-success py-0 px-2" onclick="actualizarStockVendedor(${prod.id}, 1)">+</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function actualizarStockVendedor(id, delta) {
  const producto = productos.find((p) => p.id === Number(id));
  if (!producto) return;

  const nuevoStock = producto.stock + delta;
  if (nuevoStock < 0) return;

  producto.stock = nuevoStock;
  saveProducts();
  renderTablaVendedor();
  renderResumenVendedor();
}

function renderPedidosVendedor() {
  const tbody = document.getElementById('tablaVendedorPedidos');
  if (!tbody) return;

  const pedidos = readStorage(STORAGE_KEYS.PEDIDOS, []);
  tbody.innerHTML = pedidos.length ? pedidos.map((pedido) => `
    <tr>
      <td>${pedido.numero}</td>
      <td>${pedido.clienteNombre}</td>
      <td>${pedido.total ? formatCLP(pedido.total) : '$0'}</td>
      <td>
        <select class="form-select form-select-sm" onchange="actualizarEstadoPedidoVendedor(${pedido.id}, this.value)">
          <option value="En preparación" ${pedido.estado === 'En preparación' ? 'selected' : ''}>En preparación</option>
          <option value="Despachado" ${pedido.estado === 'Despachado' ? 'selected' : ''}>Despachado</option>
          <option value="Entregado" ${pedido.estado === 'Entregado' ? 'selected' : ''}>Entregado</option>
        </select>
      </td>
    </tr>
  `).join('') : '<tr><td colspan="4" class="text-center text-muted">No hay pedidos registrados</td></tr>';
}

function actualizarEstadoPedidoVendedor(id, nuevoEstado) {
  const pedidos = readStorage(STORAGE_KEYS.PEDIDOS, []);
  const pedido = pedidos.find((p) => Number(p.id) === Number(id));
  if (!pedido) return;
  pedido.estado = nuevoEstado;
  localStorage.setItem(STORAGE_KEYS.PEDIDOS, JSON.stringify(pedidos));
  renderPedidosVendedor();
}

function renderAdminDashboard() {
  const usuarioActual = getCurrentUser();
  if (!usuarioActual || usuarioActual.rol !== ROLES.ADMIN) {
    window.location.href = 'login.html';
    return;
  }

  renderResumenAdmin();
  renderTablaAdmin();
  renderUsuariosAdmin();
  renderPedidosAdmin();
}

function renderResumenAdmin() {
  const totalProductos = productos.length;
  const ventas = readStorage(STORAGE_KEYS.PEDIDOS, []).reduce((acc, pedido) => acc + Number(pedido.total || 0), 0);
  const totalPedidos = readStorage(STORAGE_KEYS.PEDIDOS, []).length;

  const productosEl = document.getElementById('resumenProductos');
  const ventasEl = document.getElementById('resumenVentas');
  const pedidosEl = document.getElementById('resumenPedidos');

  if (productosEl) productosEl.textContent = totalProductos;
  if (ventasEl) ventasEl.textContent = formatCLP(ventas);
  if (pedidosEl) pedidosEl.textContent = totalPedidos;

  renderAdminInformes();
}

function renderTablaAdmin() {
  const tbody = document.getElementById('tablaAdminProductos');
  if (!tbody) return;

  tbody.innerHTML = '';
  productos.forEach((prod) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="fw-bold text-muted">#${prod.id}</td>
      <td><img src="${prod.imagen}" alt="${prod.nombre}" style="width: 45px; height: 45px; object-fit: cover;" class="rounded border"></td>
      <td class="fw-semibold">${prod.nombre}</td>
      <td><span class="badge bg-secondary">${prod.categoria}</span></td>
      <td class="fw-bold text-success">${formatCLP(prod.precio)}</td>
      <td>
        <div class="d-flex align-items-center gap-2">
          <button class="btn btn-sm btn-outline-danger py-0 px-2" onclick="modificarStockAdmin(${prod.id}, -1)">-</button>
          <span class="fw-bold ${prod.stock === 0 ? 'text-danger' : ''}">${prod.stock}</span>
          <button class="btn btn-sm btn-outline-success py-0 px-2" onclick="modificarStockAdmin(${prod.id}, 1)">+</button>
        </div>
      </td>
      <td><span class="badge ${prod.stock <= (prod.stockCritico || 0) ? 'bg-warning text-dark' : 'bg-light text-dark'}">${prod.stockCritico ?? 0}</span></td>
      <td class="text-center">
        <button class="btn btn-sm btn-outline-primary me-1" onclick="editarProductoAdmin(${prod.id})"><i class="fa-solid fa-pen"></i></button>
        <button class="btn btn-sm btn-outline-danger" onclick="eliminarProductoAdmin(${prod.id})"><i class="fa-solid fa-trash"></i></button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function modificarStockAdmin(id, delta) {
  const idProducto = Number(id);
  const prod = productos.find((p) => p.id === idProducto);
  if (!prod) return;
  if (prod.stock + delta < 0) return;
  prod.stock += delta;
  saveProducts();
  renderTablaAdmin();
  renderResumenAdmin();
}

function editarProductoAdmin(id) {
  const producto = productos.find((p) => p.id === Number(id));
  if (!producto) return;

  Swal.fire({
    title: 'Editar Producto',
    html: `
      <input id="swal-codigo" class="swal2-input" value="${producto.codigo}">
      <input id="swal-nombre" class="swal2-input" value="${producto.nombre}">
      <textarea id="swal-descripcion" class="swal2-textarea">${producto.descripcion || ''}</textarea>
      <select id="swal-categoria" class="swal2-input">
        <option value="Guitarras Acústicas" ${producto.categoria === 'Guitarras Acústicas' ? 'selected' : ''}>Guitarras Acústicas</option>
        <option value="Guitarras Eléctricas" ${producto.categoria === 'Guitarras Eléctricas' ? 'selected' : ''}>Guitarras Eléctricas</option>
        <option value="Bajos Eléctricos" ${producto.categoria === 'Bajos Eléctricos' ? 'selected' : ''}>Bajos Eléctricos</option>
        <option value="Baterías" ${producto.categoria === 'Baterías' ? 'selected' : ''}>Baterías</option>
        <option value="Teclados y Pianos" ${producto.categoria === 'Teclados y Pianos' ? 'selected' : ''}>Teclados y Pianos</option>
        <option value="Amplificadores" ${producto.categoria === 'Amplificadores' ? 'selected' : ''}>Amplificadores</option>
        <option value="Micrófonos" ${producto.categoria === 'Micrófonos' ? 'selected' : ''}>Micrófonos</option>
        <option value="Pedales de Efectos" ${producto.categoria === 'Pedales de Efectos' ? 'selected' : ''}>Pedales de Efectos</option>
        <option value="Estudio y Grabación" ${producto.categoria === 'Estudio y Grabación' ? 'selected' : ''}>Estudio y Grabación</option>
        <option value="Accesorios" ${producto.categoria === 'Accesorios' ? 'selected' : ''}>Accesorios</option>
      </select>
      <input id="swal-precio" type="number" class="swal2-input" value="${producto.precio}">
      <input id="swal-stock" type="number" class="swal2-input" value="${producto.stock}">
      <input id="swal-stockCritico" type="number" class="swal2-input" value="${producto.stockCritico ?? 0}">
      <input id="swal-imagen" class="swal2-input" value="${producto.imagen}">
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: 'Guardar cambios',
    confirmButtonColor: '#198754',
    preConfirm: () => {
      const codigo = document.getElementById('swal-codigo').value.trim();
      const nombre = document.getElementById('swal-nombre').value.trim();
      const descripcion = document.getElementById('swal-descripcion').value.trim();
      const categoria = document.getElementById('swal-categoria').value;
      const precio = Number(document.getElementById('swal-precio').value);
      const stock = Number(document.getElementById('swal-stock').value);
      const stockCritico = Number(document.getElementById('swal-stockCritico').value);
      const imagen = document.getElementById('swal-imagen').value.trim();

      if (!codigo || !nombre || Number.isNaN(precio) || Number.isNaN(stock)) {
        Swal.showValidationMessage('Completa código, nombre, precio y stock.');
        return false;
      }

      const existeDuplicado = productos.some((p) => p.codigo.toLowerCase() === codigo.toLowerCase() && p.id !== Number(id));
      if (existeDuplicado) {
        Swal.showValidationMessage('El código del producto ya existe.');
        return false;
      }

      return { codigo, nombre, descripcion, categoria, precio, stock, stockCritico, imagen };
    }
  }).then((result) => {
    if (result.isConfirmed) {
      Object.assign(producto, result.value);
      saveProducts();
      renderTablaAdmin();
      renderResumenAdmin();
      Swal.fire({ icon: 'success', title: 'Producto actualizado', timer: 1500, showConfirmButton: false });
    }
  });
}

function modalAgregarProducto() {
  Swal.fire({
    title: 'Nuevo Producto',
    html: `
      <input id="swal-codigo" class="swal2-input" placeholder="Código único">
      <input id="swal-nombre" class="swal2-input" placeholder="Nombre del producto">
      <textarea id="swal-descripcion" class="swal2-textarea" placeholder="Descripción"></textarea>
      <select id="swal-categoria" class="swal2-input">
        <option value="Guitarras Acústicas">Guitarras Acústicas</option>
        <option value="Guitarras Eléctricas">Guitarras Eléctricas</option>
        <option value="Bajos Eléctricos">Bajos Eléctricos</option>
        <option value="Baterías">Baterías</option>
        <option value="Teclados y Pianos">Teclados y Pianos</option>
        <option value="Amplificadores">Amplificadores</option>
        <option value="Micrófonos">Micrófonos</option>
        <option value="Pedales de Efectos">Pedales de Efectos</option>
        <option value="Estudio y Grabación">Estudio y Grabación</option>
        <option value="Accesorios">Accesorios</option>
      </select>
      <input id="swal-precio" type="number" class="swal2-input" placeholder="Precio ($ CLP)">
      <input id="swal-stock" type="number" class="swal2-input" placeholder="Stock inicial">
      <input id="swal-stockCritico" type="number" class="swal2-input" placeholder="Stock crítico">
      <input id="swal-imagen" class="swal2-input" placeholder="URL de la imagen">
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: 'Guardar',
    confirmButtonColor: '#198754',
    preConfirm: () => {
      const codigo = document.getElementById('swal-codigo').value.trim();
      const nombre = document.getElementById('swal-nombre').value.trim();
      const descripcion = document.getElementById('swal-descripcion').value.trim();
      const categoria = document.getElementById('swal-categoria').value;
      const precio = parseInt(document.getElementById('swal-precio').value, 10);
      const stock = parseInt(document.getElementById('swal-stock').value, 10);
      const stockCritico = parseInt(document.getElementById('swal-stockCritico').value, 10) || 1;
      const imagen = document.getElementById('swal-imagen').value.trim() || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80';

      if (!codigo || !nombre || Number.isNaN(precio) || Number.isNaN(stock)) {
        Swal.showValidationMessage('Por favor completa los campos obligatorios');
        return false;
      }
      if (productos.some((producto) => producto.codigo.toLowerCase() === codigo.toLowerCase())) {
        Swal.showValidationMessage('El código ya existe, debe ser único.');
        return false;
      }
      return { codigo, nombre, descripcion, categoria, precio, stock, stockCritico, imagen };
    }
  }).then((result) => {
    if (result.isConfirmed) {
      const nuevoId = productos.length > 0 ? Math.max(...productos.map((p) => p.id)) + 1 : 1;
      productos.push({ id: nuevoId, ...result.value });
      saveProducts();
      renderTablaAdmin();
      renderResumenAdmin();
      Swal.fire({ icon: 'success', title: '¡Producto Creado!', text: 'El producto se ha agregado al catálogo correctamente.', timer: 1800, showConfirmButton: false });
    }
  });
}

function eliminarProductoAdmin(id) {
  const idProducto = Number(id);
  const prod = productos.find((p) => p.id === idProducto);
  if (!prod) return;

  Swal.fire({
    title: '¿Estás seguro?',
    text: `Vas a eliminar "${prod.nombre}" del catálogo.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#dc3545',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      productos = productos.filter((p) => p.id !== idProducto);
      saveProducts();
      renderTablaAdmin();
      renderResumenAdmin();
      Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Producto eliminado', showConfirmButton: false, timer: 1500 });
    }
  });
}

function renderUsuariosAdmin() {
  const tbody = document.getElementById('tablaUsuariosAdmin');
  if (!tbody) return;

  const usuarios = readStorage(STORAGE_KEYS.USUARIOS, []);
  tbody.innerHTML = usuarios.map((usuario) => `
    <tr>
      <td>${usuario.nombre}</td>
      <td>${usuario.email}</td>
      <td>
        <select class="form-select form-select-sm" onchange="cambiarRolUsuario(${usuario.id}, this.value)">
          <option value="cliente" ${usuario.rol === 'cliente' ? 'selected' : ''}>Cliente</option>
          <option value="vendedor" ${usuario.rol === 'vendedor' ? 'selected' : ''}>Vendedor</option>
          <option value="admin" ${usuario.rol === 'admin' ? 'selected' : ''}>Administrador</option>
        </select>
      </td>
      <td>
        <button class="btn btn-sm ${usuario.activo ? 'btn-success' : 'btn-secondary'}" onclick="toggleUsuarioActivo(${usuario.id})">
          ${usuario.activo ? 'Activo' : 'Desactivado'}
        </button>
      </td>
    </tr>
  `).join('');
}

function cambiarRolUsuario(id, nuevoRol) {
  const usuarios = readStorage(STORAGE_KEYS.USUARIOS, []);
  const usuario = usuarios.find((u) => u.id === Number(id));
  if (!usuario) return;
  usuario.rol = nuevoRol;
  localStorage.setItem(STORAGE_KEYS.USUARIOS, JSON.stringify(usuarios));
  renderUsuariosAdmin();
}

function toggleUsuarioActivo(id) {
  const usuarios = readStorage(STORAGE_KEYS.USUARIOS, []);
  const usuario = usuarios.find((u) => u.id === Number(id));
  if (!usuario) return;
  usuario.activo = !usuario.activo;
  localStorage.setItem(STORAGE_KEYS.USUARIOS, JSON.stringify(usuarios));
  renderUsuariosAdmin();
}

function renderPedidosAdmin() {
  const tbody = document.getElementById('tablaPedidosAdmin');
  if (!tbody) return;

  const pedidos = readStorage(STORAGE_KEYS.PEDIDOS, []);
  tbody.innerHTML = pedidos.length ? pedidos.map((pedido) => `
    <tr>
      <td>${pedido.numero}</td>
      <td>${pedido.clienteNombre}</td>
      <td>
        <select class="form-select form-select-sm" onchange="actualizarEstadoPedido(${pedido.id}, this.value)">
          <option value="En preparación" ${pedido.estado === 'En preparación' ? 'selected' : ''}>En preparación</option>
          <option value="Despachado" ${pedido.estado === 'Despachado' ? 'selected' : ''}>Despachado</option>
          <option value="Entregado" ${pedido.estado === 'Entregado' ? 'selected' : ''}>Entregado</option>
        </select>
      </td>
    </tr>
  `).join('') : '<tr><td colspan="3" class="text-center text-muted">No hay pedidos registrados</td></tr>';
}

function actualizarEstadoPedido(id, nuevoEstado) {
  const pedidos = readStorage(STORAGE_KEYS.PEDIDOS, []);
  const pedido = pedidos.find((p) => Number(p.id) === Number(id));
  if (!pedido) return;
  pedido.estado = nuevoEstado;
  localStorage.setItem(STORAGE_KEYS.PEDIDOS, JSON.stringify(pedidos));
  renderPedidosAdmin();
}

function renderMisPedidos() {
  const container = document.getElementById('misPedidosContainer');
  if (!container) return;

  const usuario = getCurrentUser();
  if (!usuario) {
    container.innerHTML = '<div class="col-12"><div class="alert alert-warning">Debes iniciar sesión para ver tus pedidos.</div></div>';
    return;
  }

  const pedidos = readStorage(STORAGE_KEYS.PEDIDOS, []).filter((p) => Number(p.clienteId) === Number(usuario.id));
  if (!pedidos.length) {
    container.innerHTML = '<div class="col-12"><div class="alert alert-info">Todavía no tienes pedidos registrados.</div></div>';
    return;
  }

  container.innerHTML = pedidos.map((pedido) => `
    <div class="col-12">
      <div class="card border-0 shadow-sm rounded-4">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-3">
            <div>
              <h5 class="fw-bold mb-1">Pedido ${pedido.numero}</h5>
              <small class="text-muted">${new Date(pedido.fecha).toLocaleString('es-CL')}</small>
            </div>
            <span class="badge bg-warning text-dark fs-6">${pedido.estado}</span>
          </div>
          <div class="table-responsive">
            <table class="table table-sm align-middle">
              <thead>
                <tr><th>Producto</th><th>Cantidad</th><th>Precio</th><th>Subtotal</th></tr>
              </thead>
              <tbody>
                ${pedido.items.map((item) => `
                  <tr>
                    <td>${item.nombre}</td>
                    <td>${item.cantidad}</td>
                    <td>${formatCLP(item.precio)}</td>
                    <td>${formatCLP(item.precio * item.cantidad)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          <div class="d-flex justify-content-between align-items-center mt-3 border-top pt-3">
            <div>
              <small class="text-muted d-block">Entrega: ${pedido.entrega}</small>
              <small class="text-muted">Dirección: ${pedido.direccion}</small>
            </div>
            <h5 class="fw-bold text-success mb-0">${formatCLP(pedido.total)}</h5>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  seedData();
  ensureSecurity();
  renderUserMenu();

  if (document.getElementById('productGrid')) {
    renderProductos(productos);
  }

  if (document.getElementById('map')) {
    initMap();
  }

  if (document.getElementById('vendorDashboard')) {
    renderVendedorDashboard();
  }

  if (document.getElementById('tablaAdminProductos')) {
    renderAdminDashboard();
  }

  if (document.getElementById('misPedidosContainer')) {
    renderMisPedidos();
  }

  if (document.getElementById('cartItemsContainer')) {
    updateCartUI();
  }

  if (document.getElementById('checkoutForm')) {
    toggleDireccion(false);
  }
});
