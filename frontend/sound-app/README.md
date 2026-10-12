# Sonido Vivo

Tienda de instrumentos musicales implementada como una SPA de React. Los componentes y la lógica de la aplicación están en `src/components`.

## Iniciar la aplicación

Desde esta carpeta:

```bash
npm install
npm start
```

Create React App inicia el servidor de desarrollo en `http://localhost:3000`.

## Funcionalidades

- Catálogo con búsqueda, páginas de categorías, ofertas y detalle de producto, inventario y carrito.
- Checkout con validación de datos y entrega, confirmación con resumen del pedido y manejo visible de errores de stock; los pedidos y el inventario quedan actualizados al confirmar la compra.
- Registro, acceso y navegación según el rol de cliente, vendedor o administrador.
- Panel del administrador para productos, descuentos porcentuales, usuarios y pedidos.
- Panel de vendedor con inventario, alertas de stock y seguimiento de pedidos.
- Pedidos, productos, usuarios, carrito y sesión guardados en `localStorage`.

La aplicación incluye cuentas de demostración iniciales: `admin@sonidovivo.cl`, `vendedor@sonidovivo.cl` y `cliente@sonidovivo.cl`; la contraseña para cada una es `123456`.

## Validar y compilar

```bash
npm test
npm run build
```

Las pruebas unitarias del frontend usan Jasmine y Karma con jsdom.

Bootstrap, Font Awesome, SweetAlert2 y Leaflet se cargan desde sus CDNs en `public/index.html`.
