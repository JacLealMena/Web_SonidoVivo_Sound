export const STORAGE_KEYS = {
  PRODUCTS: 'sonidoVivo_productos',
  USERS: 'sonidoVivo_usuarios',
  CART: 'sonidoVivo_cart',
  ORDERS: 'sonidoVivo_pedidos',
  CURRENT_USER: 'sonidoVivo_currentUser'
};

export const ROLES = {
  ADMIN: 'admin',
  SELLER: 'vendedor',
  CUSTOMER: 'cliente'
};

export const CATEGORIES = [
  'Guitarras Acústicas',
  'Guitarras Eléctricas',
  'Bajos Eléctricos',
  'Baterías',
  'Teclados y Pianos',
  'Amplificadores',
  'Micrófonos',
  'Pedales de Efectos',
  'Estudio y Grabación',
  'Accesorios'
];

export const DEFAULT_PRODUCTS = [
  { id: 1, codigo: 'GA001', nombre: 'Guitarra Acústica Folk Yamaha F310', categoria: CATEGORIES[0], descripcion: 'Guitarra acústica ideal para principiantes y uso diario.', precio: 129990, stock: 8, stockCritico: 3, imagen: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=600&q=80' },
  { id: 2, codigo: 'GA002', nombre: 'Guitarra Acústica Dreadnought Fender CD-60S', categoria: CATEGORIES[0], descripcion: 'Gran proyección y tono cálido para conciertos y grabación.', precio: 189990, stock: 5, stockCritico: 3, imagen: 'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?auto=format&fit=crop&w=600&q=80' },
  { id: 3, codigo: 'GA003', nombre: 'Guitarra Acústica Clásica 4/4 Yamaha C40', categoria: CATEGORIES[0], descripcion: 'Diseño clásico con excelente respuesta y comodidad.', precio: 89990, stock: 10, stockCritico: 4, imagen: 'https://images.unsplash.com/photo-1550291652-6ea9114a47b1?auto=format&fit=crop&w=600&q=80' },
  { id: 4, codigo: 'GA004', nombre: 'Guitarra Electroacústica Takamine GN20CE', categoria: CATEGORIES[0], descripcion: 'Ideal para uso profesional y presentación en vivo.', precio: 349990, stock: 3, stockCritico: 2, imagen: 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?auto=format&fit=crop&w=600&q=80' },
  { id: 5, codigo: 'GE001', nombre: 'Guitarra Eléctrica Stratocaster Squier Affinity', categoria: CATEGORIES[1], descripcion: 'Versatilidad y estilo clásico para cualquier género.', precio: 249990, stock: 5, stockCritico: 2, imagen: 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?auto=format&fit=crop&w=600&q=80' },
  { id: 6, codigo: 'GE002', nombre: 'Guitarra Eléctrica Les Paul Epiphone Std', categoria: CATEGORIES[1], descripcion: 'Sonido contundente para rock y metal.', precio: 329990, stock: 4, stockCritico: 2, imagen: 'https://images.unsplash.com/photo-1550291652-6ea9114a47b1?auto=format&fit=crop&w=600&q=80' },
  { id: 7, codigo: 'BA001', nombre: 'Bajo Eléctrico 4 Cuerdas Squier Affinity PJ', categoria: CATEGORIES[2], descripcion: 'Bajo potente con excelente respuesta en graves.', precio: 299990, stock: 5, stockCritico: 2, imagen: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=600&q=80' },
  { id: 8, codigo: 'BA002', nombre: 'Bajo Eléctrico Jazz Bass Fender Player Jazz', categoria: CATEGORIES[2], descripcion: 'Gran presencia y claridad para estudios y shows.', precio: 699990, stock: 2, stockCritico: 1, imagen: 'https://images.unsplash.com/photo-1550985616-10810250b9a2?auto=format&fit=crop&w=600&q=80' },
  { id: 9, codigo: 'BT001', nombre: 'Batería Acústica 5 Piezas Pearl Roadshow', categoria: CATEGORIES[3], descripcion: 'Kit completo ideal para ensayos y presentaciones.', precio: 599990, stock: 2, stockCritico: 1, imagen: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=600&q=80' },
  { id: 10, codigo: 'BT002', nombre: 'Batería Electrónica 8 Pads Roland TD-02KV', categoria: CATEGORIES[3], descripcion: 'Batería versátil con sonido profesional y práctica.', precio: 799990, stock: 2, stockCritico: 1, imagen: 'https://images.unsplash.com/photo-1543443374-b6fe10a6ab7b?auto=format&fit=crop&w=600&q=80' },
  { id: 11, codigo: 'TC001', nombre: 'Teclado Digital Yamaha PSR-E373', categoria: CATEGORIES[4], descripcion: 'Teclado con varios sonidos y funciones de práctica.', precio: 249990, stock: 4, stockCritico: 2, imagen: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80' },
  { id: 12, codigo: 'TC002', nombre: 'Piano Digital Yamaha P-45', categoria: CATEGORIES[4], descripcion: 'Piano digital de 88 teclas con respuesta natural.', precio: 499990, stock: 2, stockCritico: 1, imagen: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=600&q=80' },
  { id: 13, codigo: 'AM001', nombre: 'Amplificador Fender Frontman 15G', categoria: CATEGORIES[5], descripcion: 'Amplificador compacto con gran claridad y rendimiento.', precio: 99990, stock: 5, stockCritico: 2, imagen: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80' },
  { id: 14, codigo: 'AM002', nombre: 'Amplificador Marshall MG40GFX', categoria: CATEGORIES[5], descripcion: 'Potencia y efectos para estudio o escenario.', precio: 299990, stock: 3, stockCritico: 2, imagen: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80' },
  { id: 15, codigo: 'MI001', nombre: 'Micrófono Shure SM58', categoria: CATEGORIES[6], descripcion: 'Micrófono dinámico profesional para voz e instrumentos.', precio: 149990, stock: 8, stockCritico: 3, imagen: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80' },
  { id: 16, codigo: 'MI002', nombre: 'Micrófono Shure SM57', categoria: CATEGORIES[6], descripcion: 'Versátil para instrumentos y grabación de precisión.', precio: 139990, stock: 6, stockCritico: 3, imagen: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80' },
  { id: 17, codigo: 'PE001', nombre: 'Pedal Boss DS-1', categoria: CATEGORIES[7], descripcion: 'Distorsión clásica con gran respuesta y tono expresivo.', precio: 79990, stock: 7, stockCritico: 3, imagen: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80' },
  { id: 18, codigo: 'PE002', nombre: 'Pedal Boss RV-6', categoria: CATEGORIES[7], descripcion: 'Reverb con múltiples ajustes para espacios diversos.', precio: 179990, stock: 4, stockCritico: 2, imagen: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80' },
  { id: 19, codigo: 'AC001', nombre: 'Cuerdas Ernie Ball Super Slinky', categoria: CATEGORIES[9], descripcion: 'Cuerdas de guitarra con tonos brillantes y gran durabilidad.', precio: 8990, stock: 25, stockCritico: 10, imagen: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80' },
  { id: 20, codigo: 'AC002', nombre: 'Púas de Guitarra x10 Fender 351', categoria: CATEGORIES[9], descripcion: 'Set de púas de alta calidad para guitarra.', precio: 3990, stock: 50, stockCritico: 20, imagen: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80' },
  { id: 21, codigo: 'ES001', nombre: 'Interfaz Focusrite Scarlett Solo', categoria: CATEGORIES[8], descripcion: 'Interfaz USB para grabación profesional en estudio casero.', precio: 149990, stock: 4, stockCritico: 2, imagen: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80' },
  { id: 22, codigo: 'ES002', nombre: 'Auriculares Audio-Technica ATH-M50x', categoria: CATEGORIES[8], descripcion: 'Auriculares de estudio con respuesta equilibrada.', precio: 219990, stock: 4, stockCritico: 2, imagen: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80' }
];

export const DEFAULT_USERS = [
  { id: 1, nombre: 'Administrador', email: 'admin@sonidovivo.cl', password: '123456', rol: ROLES.ADMIN, activo: true },
  { id: 2, nombre: 'Vendedor Principal', email: 'vendedor@sonidovivo.cl', password: '123456', rol: ROLES.SELLER, activo: true },
  { id: 3, nombre: 'Cliente Demo', email: 'cliente@sonidovivo.cl', password: '123456', rol: ROLES.CUSTOMER, activo: true }
];

/** Lee y valida una colección persistida en el almacenamiento local. */
export function readStorage(key, fallback) {
  try {
    const storedValue = window.localStorage.getItem(key);
    return storedValue === null ? fallback : JSON.parse(storedValue);
  } catch (error) {
    console.error(`No se pudo leer "${key}" desde el almacenamiento local.`, error);
    return fallback;
  }
}

/** Persiste un valor serializable y reporta cualquier error de almacenamiento. */
export function writeStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`No se pudo guardar "${key}" en el almacenamiento local.`, error);
    window.alert('No se pudieron guardar los cambios en este navegador.');
  }
}

/** Formatea un importe en pesos chilenos sin decimales. */
export function formatCLP(amount) {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(Number(amount) || 0);
}

/** Presenta una notificación con SweetAlert2 o con el diálogo nativo disponible. */
export function showMessage(options) {
  if (window.Swal) {
    return window.Swal.fire(options);
  }

  window.alert([options.title, options.text].filter(Boolean).join('\n'));
  return Promise.resolve({ isConfirmed: true });
}

/** Solicita confirmación antes de realizar una acción destructiva. */
export function confirmAction(options) {
  if (window.Swal) {
    return window.Swal.fire({ icon: 'warning', showCancelButton: true, ...options }).then((result) => result.isConfirmed);
  }

  return Promise.resolve(window.confirm(`${options.title}\n${options.text || ''}`));
}

/** Crea un identificador que no colisiona con los elementos existentes. */
export function createId(items) {
  const existingIds = new Set(items.map((item) => Number(item.id)));
  let id = Date.now();
  while (existingIds.has(id)) id += 1;
  return id;
}
