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

- Catálogo con búsqueda, categorías, inventario y carrito.
- Checkout con retiro en tienda o despacho, registro de pedidos y descuento de stock.
- Registro, acceso y navegación según el rol de cliente, vendedor o administrador.
- Panel del administrador con pestañas de productos, usuarios y pedidos.
- Panel de vendedor con inventario, alertas de stock y seguimiento de pedidos.
- Pedidos, productos, usuarios, carrito y sesión guardados en `localStorage`.

La aplicación incluye cuentas de demostración iniciales: `admin@sonidovivo.cl`, `vendedor@sonidovivo.cl` y `cliente@sonidovivo.cl`; la contraseña para cada una es `123456`.

## Validar y compilar

```bash
npm test -- --watchAll=false
npm run build
```

Bootstrap, Font Awesome, SweetAlert2 y Leaflet se cargan desde sus CDNs en `public/index.html`.
