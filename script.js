let productos = [
  // GUITARRAS ACÚSTICAS
  { id: 1, codigo: "GA001", nombre: "Guitarra Acústica Folk Yamaha F310", categoria: "Guitarras Acústicas", precio: 129990, stock: 8, imagen: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=600&q=80" },
  { id: 2, codigo: "GA002", nombre: "Guitarra Acústica Dreadnought Fender CD-60S", categoria: "Guitarras Acústicas", precio: 189990, stock: 5, imagen: "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?auto=format&fit=crop&w=600&q=80" },
  { id: 3, codigo: "GA003", nombre: "Guitarra Acústica Clásica 4/4 Yamaha C40", categoria: "Guitarras Acústicas", precio: 89990, stock: 10, imagen: "https://images.unsplash.com/photo-1550291652-6ea9114a47b1?auto=format&fit=crop&w=600&q=80" },
  { id: 4, codigo: "GA004", nombre: "Guitarra Electroacústica Takamine GN20CE", categoria: "Guitarras Acústicas", precio: 349990, stock: 3, imagen: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?auto=format&fit=crop&w=600&q=80" },
  { id: 5, codigo: "GA005", nombre: "Guitarra 3/4 Niños Yamaha JR1", categoria: "Guitarras Acústicas", precio: 79990, stock: 6, imagen: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=600&q=80" },

  // GUITARRAS ELÉCTRICAS
  { id: 6, codigo: "GE001", nombre: "Guitarra Eléctrica Stratocaster Squier Affinity", categoria: "Guitarras Eléctricas", precio: 249990, stock: 5, imagen: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?auto=format&fit=crop&w=600&q=80" },
  { id: 7, codigo: "GE002", nombre: "Guitarra Eléctrica Les Paul Epiphone Std", categoria: "Guitarras Eléctricas", precio: 329990, stock: 4, imagen: "https://images.unsplash.com/photo-1550291652-6ea9114a47b1?auto=format&fit=crop&w=600&q=80" },
  { id: 8, codigo: "GE003", nombre: "Guitarra Eléctrica SG Epiphone SG Standard", categoria: "Guitarras Eléctricas", precio: 319990, stock: 3, imagen: "https://www.ofertitas.cl/p/audiomusica-1110985" },
  { id: 9, codigo: "GE004", nombre: "Guitarra Eléctrica Telecaster Squier Affinity", categoria: "Guitarras Eléctricas", precio: 239990, stock: 4, imagen: "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?auto=format&fit=crop&w=600&q=80" },
  { id: 10, codigo: "GE005", nombre: "Guitarra Eléctrica Semi-hollow Epiphone ES-335", categoria: "Guitarras Eléctricas", precio: 549990, stock: 2, imagen: "https://images.unsplash.com/photo-1550291652-6ea9114a47b1?auto=format&fit=crop&w=600&q=80" },

  // BAJOS ELÉCTRICOS
  { id: 11, codigo: "BA001", nombre: "Bajo Eléctrico 4 Cuerdas Squier Affinity PJ", categoria: "Bajos Eléctricos", precio: 299990, stock: 5, imagen: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=600&q=80" },
  { id: 12, codigo: "BA002", nombre: "Bajo Eléctrico Jazz Bass Fender Player Jazz", categoria: "Bajos Eléctricos", precio: 699990, stock: 2, imagen: "https://images.unsplash.com/photo-1550985616-10810250b9a2?auto=format&fit=crop&w=600&q=80" },
  { id: 13, codigo: "BA003", nombre: "Bajo Acústico 4 Cuerdas Yamaha APX700II", categoria: "Bajos Eléctricos", precio: 429990, stock: 2, imagen: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80" },

  // BATERÍAS
  { id: 14, codigo: "BT001", nombre: "Batería Acústica 5 piezas Pearl Roadshow", categoria: "Baterías", precio: 599990, stock: 2, imagen: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=600&q=80" },
  { id: 15, codigo: "BT002", nombre: "Batería Electrónica 8 pads Roland TD-02KV", categoria: "Baterías", precio: 799990, stock: 2, imagen: "https://images.unsplash.com/photo-1543443374-b6fe10a6ab7b?auto=format&fit=crop&w=600&q=80" },
  { id: 16, codigo: "BT003", nombre: "Caja Snare 14\" Pearl STE1450", categoria: "Baterías", precio: 89990, stock: 4, imagen: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=600&q=80" },
  { id: 17, codigo: "BT004", nombre: "Platillo Hi-Hat 14\" Zildjian A Series", categoria: "Baterías", precio: 149990, stock: 3, imagen: "https://images.unsplash.com/photo-1571327073757-71d13c24de30?auto=format&fit=crop&w=600&q=80" },
  { id: 18, codigo: "BT005", nombre: "Platillo Crash 16\" Zildjian A Series", categoria: "Baterías", precio: 129990, stock: 3, imagen: "https://images.unsplash.com/photo-1571327073757-71d13c24de30?auto=format&fit=crop&w=600&q=80" },

  // TECLADOS Y PIANOS
  { id: 19, codigo: "TC001", nombre: "Teclado Digital 61 teclas Yamaha PSR-E373", categoria: "Teclados y Pianos", precio: 249990, stock: 4, imagen: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80" },
  { id: 20, codigo: "TC002", nombre: "Piano Digital 88 teclas Yamaha P-45", categoria: "Teclados y Pianos", precio: 499990, stock: 2, imagen: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=600&q=80" },
  { id: 21, codigo: "TC003", nombre: "Sintetizador 49 teclas Arturia MiniLab MKII", categoria: "Teclados y Pianos", precio: 129990, stock: 5, imagen: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80" },
  { id: 22, codigo: "TC004", nombre: "Teclado MIDI 88 teclas M-Audio Hammer 88", categoria: "Teclados y Pianos", precio: 399990, stock: 2, imagen: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=600&q=80" },

  // AMPLIFICADORES
  { id: 23, codigo: "AM001", nombre: "Amplificador Guitarra 15W Fender Frontman 15G", categoria: "Amplificadores", precio: 99990, stock: 5, imagen: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80" },
  { id: 24, codigo: "AM002", nombre: "Amplificador Guitarra 40W Marshall MG40GFX", categoria: "Amplificadores", precio: 299990, stock: 3, imagen: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80" },
  { id: 25, codigo: "AM003", nombre: "Amplificador Bajo 100W Hartke HD100", categoria: "Amplificadores", precio: 449990, stock: 2, imagen: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80" },
  { id: 26, codigo: "AM004", nombre: "Amplificador Acústico 40W Fishman Loudbox Mini", categoria: "Amplificadores", precio: 499990, stock: 2, imagen: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80" },

  // MICRÓFONOS
  { id: 27, codigo: "MI001", nombre: "Micrófono Dinámico Cardioide Shure SM58", categoria: "Micrófonos", precio: 149990, stock: 8, imagen: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80" },
  { id: 28, codigo: "MI002", nombre: "Micrófono Dinámico Instrumento Shure SM57", categoria: "Micrófonos", precio: 139990, stock: 6, imagen: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80" },
  { id: 29, codigo: "MI003", nombre: "Micrófono Condensador Audio-Technica AT2020", categoria: "Micrófonos", precio: 199990, stock: 4, imagen: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80" },
  { id: 30, codigo: "MI004", nombre: "Micrófono USB de Condensador Blue Yeti", categoria: "Micrófonos", precio: 299990, stock: 5, imagen: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80" },

  // PEDALES DE EFECTOS
  { id: 31, codigo: "PE001", nombre: "Pedal Distorsión Boss DS-1", categoria: "Pedales de Efectos", precio: 79990, stock: 7, imagen: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80" },
  { id: 32, codigo: "PE002", nombre: "Pedal Reverb Boss RV-6", categoria: "Pedales de Efectos", precio: 179990, stock: 4, imagen: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80" },
  { id: 33, codigo: "PE003", nombre: "Pedal Multi-efectos Boss ME-80", categoria: "Pedales de Efectos", precio: 349990, stock: 2, imagen: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80" },
  { id: 34, codigo: "PE004", nombre: "Pedal Tuner Cromático Boss TU-3", categoria: "Pedales de Efectos", precio: 89990, stock: 8, imagen: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80" },
  { id: 35, codigo: "PE005", nombre: "Pedal Delay MXR Carbon Copy", categoria: "Pedales de Efectos", precio: 179990, stock: 4, imagen: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80" },
  { id: 36, codigo: "PE006", nombre: "Pedal Overdrive Ibanez TS9", categoria: "Pedales de Efectos", precio: 99990, stock: 6, imagen: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80" },

  // ACCESORIOS
  { id: 37, codigo: "AC001", nombre: "Cuerdas Guitarra Eléctrica Ernie Ball Super Slinky 09-42", categoria: "Accesorios", precio: 8990, stock: 25, imagen: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80" },
  { id: 38, codigo: "AC002", nombre: "Cuerdas Guitarra Acústica Ernie Ball Earthwood 12-53", categoria: "Accesorios", precio: 10990, stock: 20, imagen: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80" },
  { id: 39, codigo: "AC003", nombre: "Cuerdas Bajo Ernie Ball Regular Slinky 45-105", categoria: "Accesorios", precio: 14990, stock: 12, imagen: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80" },
  { id: 40, codigo: "AC004", nombre: "Púas de Guitarra x10 Fender 351 (0.73mm)", categoria: "Accesorios", precio: 3990, stock: 50, imagen: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80" },
  { id: 41, codigo: "AC005", nombre: "Capotraste Guitarra Dunlop Trigger", categoria: "Accesorios", precio: 12990, stock: 15, imagen: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80" },
  { id: 42, codigo: "AC006", nombre: "Afinador de Clip Snark SN-5", categoria: "Accesorios", precio: 8990, stock: 20, imagen: "http://rolandstorelondon.com/cdn/shop/files/tu-02_04_gal.jpg?v=1715017754" },
  { id: 43, codigo: "AC007", nombre: "Cable Instrumento 3m Monster S100-I-3", categoria: "Accesorios", precio: 12990, stock: 15, imagen: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80" },
  { id: 44, codigo: "AC008", nombre: "Cable Instrumento 6m Monster S100-I-6", categoria: "Accesorios", precio: 17990, stock: 10, imagen: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80" },
  { id: 45, codigo: "AC009", nombre: "Soporte Guitarra de Piso Hercules GS302B", categoria: "Accesorios", precio: 22990, stock: 12, imagen: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80" },
  { id: 46, codigo: "AC010", nombre: "Soporte Guitarra de Pared Hercules WAH-202", categoria: "Accesorios", precio: 18990, stock: 10, imagen: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80" },

  // ESTUDIO Y GRABACIÓN
  { id: 47, codigo: "ES001", nombre: "Interfaz de Audio 2x2 USB Focusrite Scarlett Solo", categoria: "Estudio y Grabación", precio: 149990, stock: 4, imagen: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80" },
  { id: 48, codigo: "ES002", nombre: "Auriculares de Estudio Audio-Technica ATH-M20x", categoria: "Estudio y Grabación", precio: 79990, stock: 6, imagen: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80" },
  { id: 49, codigo: "ES003", nombre: "Auriculares de Estudio Pro Audio-Technica ATH-M50x", categoria: "Estudio y Grabación", precio: 219990, stock: 4, imagen: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80" },
  { id: 50, codigo: "ES004", nombre: "Monitor de Estudio 5\" Yamaha HS5", categoria: "Estudio y Grabación", precio: 349990, stock: 2, imagen: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80" },
  { id: 51, codigo: "ES005", nombre: "Pop Filter para Micrófono Sennheiser MZP 40", categoria: "Estudio y Grabación", precio: 14990, stock: 8, imagen: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80" }
];

let carrito = [];
let categoriaActual = 'Todos';

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('productGrid')) renderProductos(productos);
  if (document.getElementById('map')) initMap();
});

function formatCLP(amount) {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount);
}

function renderProductos(lista) {
  const grid = document.getElementById('productGrid');
  if (!grid) return;

  grid.innerHTML = '';

  if (lista.length === 0) {
    grid.innerHTML = `
      <div class="col-12 text-center py-5">
        <i class="fa-solid fa-box-open fa-3x text-muted mb-3"></i>
        <h5 class="text-muted">No se encontraron productos en esta categoría.</h5>
      </div>
    `;
    return;
  }

  lista.forEach(prod => {
    const pocoStock = prod.stock > 0 && prod.stock <= 3;
    const sinStock = prod.stock === 0;

    const col = document.createElement('div');
    col.className = 'col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-stretch';

    col.innerHTML = `
      <div class="card h-100 shadow-sm border-0 position-relative w-100">
        
        <!-- Insignias de Alerta sobre la imagen -->
        ${sinStock 
          ? `<span class="badge bg-danger position-absolute top-0 start-0 m-2 px-2 py-1">Agotado</span>` 
          : pocoStock 
            ? `<span class="badge bg-warning text-dark position-absolute top-0 start-0 m-2 px-2 py-1 shadow-sm"><i class="fa-solid fa-triangle-exclamation me-1"></i>¡Últimas ${prod.stock} un!</span>` 
            : ''
        }

        <img src="${prod.imagen}" class="card-img-top p-3 img-fluid" alt="${prod.nombre}" style="height: 200px; object-fit: contain;">
        
        <div class="card-body d-flex flex-column">
          <span class="badge bg-secondary mb-2 align-self-start">${prod.categoria}</span>
          <h6 class="card-title text-dark fw-bold mb-2" style="font-size: 0.95rem;">${prod.nombre}</h6>
          
          <!-- Texto informativo sobre el stock -->
          <p class="card-text mb-3 small">
            ${sinStock 
              ? `<span class="text-danger fw-bold">Sin stock disponible</span>` 
              : pocoStock 
                ? `<span class="text-warning-emphasis fw-bold"><i class="fa-solid fa-clock me-1"></i>Quedan solo ${prod.stock} unidades</span>` 
                : `<span class="text-muted">Stock: ${prod.stock} un.</span>`
            }
          </p>

          <div class="mt-auto d-flex align-items-center justify-content-between">
            <span class="fs-5 fw-bold text-success">${formatCLP(prod.precio)}</span>
            <button 
              class="btn btn-primary btn-sm px-3" 
              onclick="addToCart(${prod.id})"
              ${sinStock ? 'disabled' : ''}>
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
  if(btn) {
    document.querySelectorAll('#categoryFilters button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }
  let filtrados = cat === 'Todos' ? productos : productos.filter(p => p.categoria === cat);
  renderProductos(filtrados);
}

function filtrarProductos() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const filtrados = productos.filter(p => 
    (categoriaActual === 'Todos' || p.categoria === categoriaActual) &&
    p.nombre.toLowerCase().includes(query)
  );
  renderProductos(filtrados);
}

function addToCart(id) {
  const idProducto = parseInt(id);
  const prod = productos.find(p => p.id === idProducto);
  if(!prod || prod.stock === 0) return;

  const itemCart = carrito.find(item => item.id === idProducto);
  if (itemCart) {
    if(itemCart.cantidad < prod.stock) {
      itemCart.cantidad++;
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
  let total = 0, count = 0;

  if (carrito.length === 0) {
    container.innerHTML = '<p class="text-center text-muted py-4">El carrito está vacío</p>';
  } else {
    carrito.forEach(item => {
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

  document.getElementById('cartCountBadge').textContent = count;
  document.getElementById('cartTotal').textContent = formatCLP(total);
}

function changeQuantity(id, delta) {
  const idProducto = parseInt(id);
  const item = carrito.find(p => p.id === idProducto);
  const prodOriginal = productos.find(p => p.id === idProducto);

  if (!item) return;

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
  const idProducto = parseInt(id);
  carrito = carrito.filter(item => item.id !== idProducto);
  updateCartUI();
}

function openCheckoutModal() {
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

  let total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  document.getElementById('modalCartTotal').textContent = formatCLP(total);

  const checkoutModal = new bootstrap.Modal(document.getElementById('checkoutModal'));
  checkoutModal.show();
}

function toggleDireccion(mostrar) {
  const container = document.getElementById('direccionContainer');
  const input = document.getElementById('inputDireccion');
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

  const modalEl = document.getElementById('checkoutModal');
  const modal = bootstrap.Modal.getInstance(modalEl);
  if (modal) modal.hide();

  Swal.fire({
    icon: 'success',
    title: '¡Compra Confirmada!',
    text: 'Tu pedido ha sido procesado con éxito. Enviamos un correo con los detalles.',
    confirmButtonText: 'Aceptar',
    confirmButtonColor: '#198754'
  });

  carrito = [];
  updateCartUI();
  document.getElementById('checkoutForm').reset();
  toggleDireccion(false);
}

function procesarRegistro(event) {
  event.preventDefault();
  
  Swal.fire({
    icon: 'success',
    title: '¡Registro Exitoso!',
    text: 'Tu cuenta ha sido creada correctamente. Ahora puedes realizar tus compras.',
    confirmButtonText: 'Ir a la Tienda',
    confirmButtonColor: '#ffc107'
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = 'index.html';
    }
  });
}

function initMap() {
  const map = L.map('map').setView([-33.6117, -70.5758], 15);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
  L.marker([-33.6117, -70.5758]).addTo(map).bindPopup('Sonido Vivo').openPopup();
}


document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('tablaAdminProductos')) {
    renderTablaAdmin();
  }
});

function renderTablaAdmin() {
  const tbody = document.getElementById('tablaAdminProductos');
  if (!tbody) return;

  tbody.innerHTML = '';

  productos.forEach((prod) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="fw-bold text-muted">#${prod.id}</td>
      <td>
        <img src="${prod.imagen}" alt="${prod.nombre}" style="width: 45px; height: 45px; object-fit: cover;" class="rounded border">
      </td>
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
      <td class="text-center">
        <button class="btn btn-sm btn-outline-danger" onclick="eliminarProductoAdmin(${prod.id})" title="Eliminar producto">
          <i class="fa-solid fa-trash"></i>
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function modificarStockAdmin(id, delta) {
  const idProducto = parseInt(id);
  const prod = productos.find(p => p.id === idProducto);
  if (prod) {
    if (prod.stock + delta < 0) return;
    prod.stock += delta;
    renderTablaAdmin();
  }
}

function eliminarProductoAdmin(id) {
  const idProducto = parseInt(id);
  const prod = productos.find(p => p.id === idProducto);
  
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
      productos = productos.filter(p => p.id !== idProducto);
      renderTablaAdmin();
      
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Producto eliminado',
        showConfirmButton: false,
        timer: 1500
      });
    }
  });
}

function modalAgregarProducto() {
  Swal.fire({
    title: 'Nuevo Producto',
    html: `
      <input id="swal-nombre" class="swal2-input" placeholder="Nombre del producto">
      <select id="swal-categoria" class="swal2-input">
        <option value="Guitarras">Guitarras</option>
        <option value="Bajos">Bajos</option>
        <option value="Baterías">Baterías</option>
        <option value="Teclados">Teclados</option>
        <option value="Amplificadores">Amplificadores</option>
        <option value="Accesorios">Accesorios</option>
      </select>
      <input id="swal-precio" type="number" class="swal2-input" placeholder="Precio ($ CLP)">
      <input id="swal-stock" type="number" class="swal2-input" placeholder="Stock inicial">
      <input id="swal-imagen" class="swal2-input" placeholder="URL de la imagen">
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: 'Guardar',
    confirmButtonColor: '#198754',
    preConfirm: () => {
      const nombre = document.getElementById('swal-nombre').value;
      const categoria = document.getElementById('swal-categoria').value;
      const precio = parseInt(document.getElementById('swal-precio').value);
      const stock = parseInt(document.getElementById('swal-stock').value);
      const imagen = document.getElementById('swal-imagen').value || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80';

      if (!nombre || isNaN(precio) || isNaN(stock)) {
        Swal.showValidationMessage('Por favor completa los campos obligatorios');
        return false;
      }
      return { nombre, categoria, precio, stock, imagen };
    }
  }).then((result) => {
    if (result.isConfirmed) {
      const nuevoId = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;
      productos.push({ id: nuevoId, ...result.value });
      renderTablaAdmin();
      
      Swal.fire({
        icon: 'success',
        title: '¡Producto Creado!',
        text: 'El producto se ha agregado al catálogo correctamente.',
        timer: 1800,
        showConfirmButton: false
      });
    }
  });
}