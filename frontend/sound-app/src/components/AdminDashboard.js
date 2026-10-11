import React, { useState } from 'react';
import { CATEGORIES, ROLES, confirmAction, createId, formatCLP, showMessage } from './store';

const ORDER_STATUSES = ['En preparación', 'Despachado', 'Entregado'];
const USER_ROLES = [
  { value: ROLES.CUSTOMER, label: 'Cliente' },
  { value: ROLES.SELLER, label: 'Vendedor' },
  { value: ROLES.ADMIN, label: 'Administrador' }
];

/** Renderiza las pestañas para administrar productos, usuarios y pedidos. */
export default function AdminDashboard({ products, users, orders, currentUser, onProductsChange, onUsersChange, onOrderStatus, onNavigate, onLogout }) {
  const [activeTab, setActiveTab] = useState('products');
  const [editingProduct, setEditingProduct] = useState(null);
  const totalSales = orders.reduce((total, order) => total + Number(order.total || 0), 0);
  const activeOrders = orders.filter((order) => order.estado !== 'Entregado').length;
  const criticalProducts = products.filter((product) => Number(product.stock || 0) <= Number(product.stockCritico || 0)).length;

  /** Selecciona la pestaña del panel que se mostrará. */
  function handleTabChange(event) {
    setActiveTab(event.currentTarget.dataset.tab);
  }

  /** Abre el formulario de alta de producto vacío. */
  function handleAddProduct() {
    setEditingProduct({});
  }

  /** Abre el formulario de edición del producto seleccionado. */
  function handleEditProduct(product) {
    setEditingProduct(product);
  }

  /** Cierra el formulario de edición o creación de producto. */
  function handleCloseProductEditor() {
    setEditingProduct(null);
  }

  /** Persiste un producto nuevo o los cambios del producto elegido. */
  function handleSaveProduct(productData) {
    const isEditing = Boolean(editingProduct.id);
    const duplicateCode = products.some((product) => product.codigo.toLowerCase() === productData.codigo.toLowerCase() && product.id !== editingProduct.id);
    if (duplicateCode) {
      showMessage({ icon: 'error', title: 'Código duplicado', text: 'El código de producto debe ser único.' });
      return;
    }

    const nextProducts = isEditing
      ? products.map((product) => product.id === editingProduct.id ? { ...product, ...productData } : product)
      : [...products, { ...productData, id: createId(products) }];
    onProductsChange(nextProducts);
    setEditingProduct(null);
    showMessage({ icon: 'success', title: isEditing ? 'Producto actualizado' : 'Producto creado', timer: 1500, showConfirmButton: false });
  }

  /** Ajusta el inventario del producto sin permitir cantidades negativas. */
  function handleStockChange(productId, difference) {
    const selectedProduct = products.find((product) => product.id === productId);
    if (!selectedProduct || selectedProduct.stock + difference < 0) return;
    onProductsChange(products.map((product) => product.id === productId ? { ...product, stock: product.stock + difference } : product));
  }

  /** Elimina un producto solo después de que el administrador lo confirme. */
  function handleDeleteProduct(product) {
    confirmAction({ title: '¿Eliminar producto?', text: `Se eliminará "${product.nombre}" del catálogo.`, confirmButtonText: 'Sí, eliminar', cancelButtonText: 'Cancelar', confirmButtonColor: '#dc3545' }).then((confirmed) => {
      if (confirmed) onProductsChange(products.filter((item) => item.id !== product.id));
    });
  }

  /** Agrega una cuenta desde el formulario de administración de usuarios. */
  function handleCreateUser(userData) {
    if (users.some((user) => user.email.toLowerCase() === userData.email.toLowerCase())) {
      showMessage({ icon: 'error', title: 'Correo ya registrado', text: 'Ya existe una cuenta con ese correo.' });
      return false;
    }
    onUsersChange([...users, { ...userData, id: createId(users), activo: true }]);
    showMessage({ icon: 'success', title: 'Usuario creado', timer: 1500, showConfirmButton: false });
    return true;
  }

  /** Elimina una cuenta luego de confirmar y protege la sesión del administrador. */
  function handleDeleteUser(user) {
    if (Number(user.id) === Number(currentUser?.id)) {
      showMessage({ icon: 'error', title: 'Acción no permitida', text: 'No puedes eliminar tu propia cuenta durante la sesión.' });
      return;
    }
    confirmAction({ title: '¿Eliminar usuario?', text: `Se eliminará la cuenta de ${user.nombre} (${user.email}).`, confirmButtonText: 'Sí, eliminar', cancelButtonText: 'Cancelar', confirmButtonColor: '#dc3545' }).then((confirmed) => {
      if (confirmed) onUsersChange(users.filter((item) => item.id !== user.id));
    });
  }

  /** Cambia el rol asignado a un usuario sin permitir quitar el propio acceso admin. */
  function handleUserRoleChange(userId, event) {
    const role = event.target.value;
    if (Number(userId) === Number(currentUser?.id) && role !== ROLES.ADMIN) {
      showMessage({ icon: 'warning', title: 'No puedes cambiar tu propio rol', text: 'Mantén al menos una sesión de administrador activa.' });
      return;
    }
    onUsersChange(users.map((user) => user.id === userId ? { ...user, rol: role } : user));
  }

  /** Activa o desactiva el acceso de la cuenta seleccionada. */
  function handleUserStatusChange(userId) {
    onUsersChange(users.map((user) => user.id === userId ? { ...user, activo: !user.activo } : user));
  }

  /** Actualiza el estado operativo del pedido seleccionado. */
  function handleOrderStatusChange(orderId, event) {
    onOrderStatus(orderId, event.target.value);
  }

  /** Regresa a la tienda desde el panel de administración. */
  function handleStoreLink() {
    onNavigate('/');
  }

  /** Cierra la sesión administrativa y regresa al catálogo. */
  function handleLogout() {
    onLogout();
  }

  return (
    <main className="container my-4">
      <header className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div><h1 className="h2 fw-bold mb-1"><i className="fa-solid fa-guitar me-2 text-warning" />Panel administrativo</h1><small className="text-muted">Resumen operativo y control del negocio</small></div>
        <div className="d-flex align-items-center gap-2">
          <button className="btn btn-outline-dark btn-sm" type="button" onClick={handleStoreLink}><i className="fa-solid fa-store me-1" />Ir a la tienda</button>
          <button className="btn btn-outline-secondary btn-sm" type="button" onClick={handleLogout}><i className="fa-solid fa-right-from-bracket me-1" />Cerrar sesión</button>
          <button className="btn btn-success fw-bold" type="button" onClick={handleAddProduct}><i className="fa-solid fa-plus me-1" />Agregar Producto</button>
        </div>
      </header>

      <div className="row g-4 mb-4">
        <MetricCard title="Total de productos" value={products.length} icon="fa-boxes-stacked" />
        <MetricCard title="Ventas totales" value={formatCLP(totalSales)} icon="fa-dollar-sign" highlight />
        <MetricCard title="Pedidos registrados" value={orders.length} icon="fa-receipt" />
      </div>

      <ul className="nav nav-tabs admin-tabs mb-4" role="tablist" aria-label="Secciones administrativas">
        <TabButton tab="products" activeTab={activeTab} onSelect={handleTabChange} icon="fa-boxes-stacked">Productos</TabButton>
        <TabButton tab="users" activeTab={activeTab} onSelect={handleTabChange} icon="fa-users">Administración de Usuarios</TabButton>
        <TabButton tab="orders" activeTab={activeTab} onSelect={handleTabChange} icon="fa-truck-fast">Pedidos</TabButton>
      </ul>

      {activeTab === 'products' && (
        <section aria-label="Administración de productos">
          <div className="row g-3 mb-4">
            <InsightCard title="Ventas" value={formatCLP(totalSales)} description="Monto total acumulado" icon="fa-dollar-sign" />
            <InsightCard title="Pedidos activos" value={activeOrders} description="Operaciones en proceso" icon="fa-truck-fast" />
            <InsightCard title="Productos críticos" value={criticalProducts} description="Ítems por debajo del umbral" icon="fa-circle-exclamation" />
            <InventoryInsight products={products} />
          </div>
          <div className="card border-0 shadow-sm rounded-4 mb-5">
            <div className="card-body p-0"><div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-dark"><tr><th>ID</th><th>Imagen</th><th>Nombre</th><th>Categoría</th><th>Precio</th><th>Stock</th><th>Stock crítico</th><th className="text-center">Acciones</th></tr></thead>
                <tbody>
                  {products.map((product) => <AdminProductRow key={product.id} product={product} onEdit={handleEditProduct} onDelete={handleDeleteProduct} onStockChange={handleStockChange} />)}
                  {!products.length && <tr><td colSpan="8" className="text-center text-muted py-4">No hay productos registrados.</td></tr>}
                </tbody>
              </table>
            </div></div>
          </div>
        </section>
      )}

      {activeTab === 'users' && (
        <UsersPanel users={users} currentUser={currentUser} onCreateUser={handleCreateUser} onDeleteUser={handleDeleteUser} onRoleChange={handleUserRoleChange} onStatusChange={handleUserStatusChange} />
      )}

      {activeTab === 'orders' && (
        <OrdersPanel orders={orders} onStatusChange={handleOrderStatusChange} />
      )}

      {editingProduct && <ProductEditor key={editingProduct.id || 'new-product'} product={editingProduct} onSave={handleSaveProduct} onClose={handleCloseProductEditor} />}
    </main>
  );
}

/** Presenta una métrica principal del negocio con su icono. */
function MetricCard({ title, value, icon, highlight = false }) {
  return <div className="col-md-4"><div className="card shadow-sm border-0 rounded-4 h-100 dashboard-card"><div className="card-body"><div className="d-flex justify-content-between align-items-center mb-2"><h2 className="h6 text-muted text-uppercase mb-0">{title}</h2><span className={`badge ${highlight ? 'bg-success-subtle text-success' : 'bg-primary-subtle text-primary'}`}><i className={`fa-solid ${icon}`} /></span></div><p className={`h3 fw-bold mb-0 ${highlight ? 'text-success' : ''}`}>{value}</p></div></div></div>;
}

/** Selecciona una pestaña del panel de administración. */
function TabButton({ tab, activeTab, onSelect, icon, children }) {
  return <li className="nav-item" role="presentation"><button className={`nav-link ${activeTab === tab ? 'active' : ''}`} type="button" role="tab" aria-selected={activeTab === tab} data-tab={tab} onClick={onSelect}><i className={`fa-solid ${icon} me-1`} />{children}</button></li>;
}

/** Resume un indicador derivado de las ventas, pedidos o stock. */
function InsightCard({ title, value, description, icon }) {
  return <div className="col-lg-4"><div className="info-panel p-3 h-100"><div className="d-flex justify-content-between align-items-center mb-2"><span className="text-muted text-uppercase small">{title}</span><span className="badge bg-warning-subtle text-warning"><i className={`fa-solid ${icon}`} /></span></div><h2 className="h4 fw-bold mb-1">{value}</h2><small className="text-muted">{description}</small></div></div>;
}

/** Muestra las categorías con mayor stock y las alertas de inventario críticas. */
function InventoryInsight({ products }) {
  const stockByCategory = Object.entries(products.reduce((totals, product) => {
    totals[product.categoria] = (totals[product.categoria] || 0) + Number(product.stock || 0);
    return totals;
  }, {})).sort((first, second) => second[1] - first[1]).slice(0, 5);
  const maximumStock = Math.max(1, ...stockByCategory.map(([, stock]) => stock));
  const criticalProducts = products.filter((product) => Number(product.stock || 0) <= Number(product.stockCritico || 0)).slice(0, 4);

  return (
    <>
      <div className="col-lg-7"><div className="info-panel p-3 h-100"><h2 className="h6 fw-bold mb-3"><i className="fa-solid fa-layer-group me-2 text-primary" />Distribución de stock</h2>
        {stockByCategory.map(([category, stock]) => <StockBar key={category} category={category} stock={stock} maxStock={maximumStock} />)}
        {!stockByCategory.length && <p className="text-muted mb-0">Sin productos disponibles.</p>}
      </div></div>
      <div className="col-lg-5"><div className="info-panel p-3 h-100"><h2 className="h6 fw-bold mb-3"><i className="fa-solid fa-bell me-2 text-warning" />Alertas de stock</h2>
        {criticalProducts.map((product) => <div className="warning-item p-2 mb-2" key={product.id}><strong className="d-block">{product.nombre}</strong><span className="small text-muted">Stock: {product.stock} · Crítico: {product.stockCritico}</span></div>)}
        {!criticalProducts.length && <p className="text-muted mb-0">No hay alertas por stock bajo.</p>}
      </div></div>
    </>
  );
}

/** Dibuja un indicador proporcional de unidades por categoría. */
function StockBar({ category, stock, maxStock }) {
  return <div className="mb-3"><div className="d-flex justify-content-between small mb-1"><span className="text-muted">{category}</span><span className="fw-semibold">{stock} und.</span></div><div className="bar-track"><div className="bar-fill" style={{ width: `${(stock / maxStock) * 100}%` }} /></div></div>;
}

/** Presenta el artículo del inventario con controles administrativos. */
function AdminProductRow({ product, onEdit, onDelete, onStockChange }) {
  /** Entrega el producto actual al formulario de edición. */
  function handleEdit() {
    onEdit(product);
  }

  /** Pide confirmación para eliminar el producto actual. */
  function handleDelete() {
    onDelete(product);
  }

  /** Aplica el ajuste de inventario seleccionado en la fila. */
  function handleStockChange(event) {
    onStockChange(product.id, Number(event.currentTarget.dataset.change));
  }

  return <tr>
    <td className="fw-bold text-muted">#{product.id}</td>
    <td><img src={product.imagen} alt={product.nombre} className="rounded border" style={{ width: 45, height: 45, objectFit: 'cover' }} /></td>
    <td className="fw-semibold">{product.nombre}</td><td><span className="badge bg-secondary">{product.categoria}</span></td>
    <td className="fw-bold text-success">{formatCLP(product.precio)}</td>
    <td><div className="d-flex align-items-center gap-2"><button type="button" className="btn btn-sm btn-outline-danger py-0 px-2" data-change="-1" onClick={handleStockChange} aria-label="Reducir stock">-</button><span className={`fw-bold ${product.stock === 0 ? 'text-danger' : ''}`}>{product.stock}</span><button type="button" className="btn btn-sm btn-outline-success py-0 px-2" data-change="1" onClick={handleStockChange} aria-label="Aumentar stock">+</button></div></td>
    <td><span className={`badge ${product.stock <= (product.stockCritico || 0) ? 'bg-warning text-dark' : 'bg-light text-dark'}`}>{product.stockCritico || 0}</span></td>
    <td className="text-center"><button type="button" className="btn btn-sm btn-outline-primary me-1" onClick={handleEdit} aria-label={`Editar ${product.nombre}`}><i className="fa-solid fa-pen" /></button><button type="button" className="btn btn-sm btn-outline-danger" onClick={handleDelete} aria-label={`Eliminar ${product.nombre}`}><i className="fa-solid fa-trash" /></button></td>
  </tr>;
}

/** Administra altas, roles, estados y bajas de las cuentas del sistema. */
function UsersPanel({ users, currentUser, onCreateUser, onDeleteUser, onRoleChange, onStatusChange }) {
  const [showUserForm, setShowUserForm] = useState(false);

  /** Muestra el formulario de creación de cuenta. */
  function handleOpenUserForm() {
    setShowUserForm(true);
  }

  /** Oculta el formulario de creación sin guardar la cuenta. */
  function handleCloseUserForm() {
    setShowUserForm(false);
  }

  /** Crea la cuenta y cierra el formulario si sus datos son válidos. */
  function handleSubmitUser(userData) {
    if (userData.password.length < 6) {
      showMessage({ icon: 'error', title: 'Contraseña muy corta', text: 'La contraseña debe tener al menos 6 caracteres.' });
      return false;
    }
    const created = onCreateUser({ ...userData, email: userData.email.trim(), nombre: userData.nombre.trim() });
    if (created) setShowUserForm(false);
    return created;
  }

  /** Reenvía el cambio de rol del usuario al panel principal. */
  function handleRoleChange(userId, event) {
    onRoleChange(userId, event);
  }

  /** Invierte el estado activo del usuario seleccionado. */
  function handleStatusChange(userId) {
    onStatusChange(userId);
  }

  /** Solicita al panel principal eliminar la cuenta elegida. */
  function handleDeleteUser(user) {
    onDeleteUser(user);
  }

  return (
    <section className="card border-0 shadow-sm rounded-4 mb-5">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-3">
          <div><h2 className="h4 fw-bold mb-1"><i className="fa-solid fa-users me-2 text-primary" />Administración de Usuarios</h2><p className="text-muted mb-0">Consulta, crea y elimina usuarios del sistema.</p></div>
          <button className="btn btn-primary" type="button" onClick={handleOpenUserForm}><i className="fa-solid fa-user-plus me-1" />Crear usuario</button>
        </div>
        <div className="table-responsive"><table className="table table-hover align-middle mb-0">
          <thead className="table-light"><tr><th>Nombre</th><th>Email</th><th>Rol</th><th>Estado</th><th className="text-center">Acciones</th></tr></thead>
          <tbody>
            {users.map((user) => <AdminUserRow key={user.id} user={user} isCurrentUser={Number(currentUser?.id) === Number(user.id)} onRoleChange={handleRoleChange} onStatusChange={handleStatusChange} onDelete={handleDeleteUser} />)}
            {!users.length && <tr><td colSpan="5" className="text-center text-muted py-4">No hay usuarios registrados.</td></tr>}
          </tbody>
        </table></div>
      </div>
      {showUserForm && <UserEditor onSave={handleSubmitUser} onClose={handleCloseUserForm} />}
    </section>
  );
}

/** Presenta un usuario junto a sus permisos, estado y acción de eliminación. */
function AdminUserRow({ user, isCurrentUser, onRoleChange, onStatusChange, onDelete }) {
  /** Propaga el rol seleccionado para la cuenta. */
  function handleRoleChange(event) {
    onRoleChange(user.id, event);
  }

  /** Cambia si la cuenta puede autenticarse. */
  function handleStatusChange() {
    onStatusChange(user.id);
  }

  /** Solicita eliminar esta cuenta con confirmación. */
  function handleDelete() {
    onDelete(user);
  }

  return <tr>
    <td>{user.nombre}{isCurrentUser && <span className="badge bg-primary-subtle text-primary ms-2">Tú</span>}</td><td>{user.email}</td>
    <td><select className="form-select form-select-sm" value={user.rol} onChange={handleRoleChange}>{USER_ROLES.map((role) => <option key={role.value} value={role.value}>{role.label}</option>)}</select></td>
    <td><button className={`btn btn-sm ${user.activo ? 'btn-success' : 'btn-secondary'}`} type="button" onClick={handleStatusChange}>{user.activo ? 'Activo' : 'Desactivado'}</button></td>
    <td className="text-center"><button className="btn btn-sm btn-outline-danger" type="button" onClick={handleDelete} disabled={isCurrentUser} title={isCurrentUser ? 'No puedes eliminar tu propio usuario' : 'Eliminar usuario'}><i className="fa-solid fa-trash-can me-1" />Eliminar</button></td>
  </tr>;
}

/** Captura los datos necesarios para crear una cuenta desde el panel admin. */
function UserEditor({ onSave, onClose }) {
  const [formData, setFormData] = useState({ nombre: '', email: '', password: '', rol: ROLES.CUSTOMER });

  /** Actualiza el campo que el administrador está editando. */
  function handleFieldChange(event) {
    const { name, value } = event.target;
    setFormData((previousData) => ({ ...previousData, [name]: value }));
  }

  /** Valida y envía la nueva cuenta al panel. */
  function handleSubmit(event) {
    event.preventDefault();
    if (!formData.nombre.trim() || !formData.email.trim() || !formData.password) {
      showMessage({ icon: 'error', title: 'Faltan datos', text: 'Completa todos los campos para crear el usuario.' });
      return;
    }
    onSave(formData);
  }

  return <div className="modal d-block" role="dialog" aria-modal="true" aria-labelledby="userEditorTitle" tabIndex="-1" style={{ background: 'rgba(0, 0, 0, .5)' }}>
    <div className="modal-dialog modal-dialog-centered"><div className="modal-content">
      <div className="modal-header"><h2 className="modal-title h5" id="userEditorTitle">Crear usuario</h2><button type="button" className="btn-close" onClick={onClose} aria-label="Cerrar" /></div>
      <form onSubmit={handleSubmit}>
        <div className="modal-body">
          <label className="form-label w-100">Nombre completo<input className="form-control" name="nombre" value={formData.nombre} onChange={handleFieldChange} required /></label>
          <label className="form-label w-100">Correo electrónico<input className="form-control" type="email" name="email" value={formData.email} onChange={handleFieldChange} required /></label>
          <label className="form-label w-100">Contraseña<input className="form-control" type="password" name="password" minLength="6" value={formData.password} onChange={handleFieldChange} required /></label>
          <label className="form-label w-100">Rol<select className="form-select" name="rol" value={formData.rol} onChange={handleFieldChange}>{USER_ROLES.map((role) => <option key={role.value} value={role.value}>{role.label}</option>)}</select></label>
        </div>
        <div className="modal-footer"><button type="button" className="btn btn-outline-secondary" onClick={onClose}>Cancelar</button><button type="submit" className="btn btn-primary">Crear usuario</button></div>
      </form>
    </div></div>
  </div>;
}

/** Lista pedidos para que el administrador pueda revisar y editar su estado. */
function OrdersPanel({ orders, onStatusChange }) {
  /** Actualiza el estado de un pedido desde su fila. */
  function handleStatusChange(orderId, event) {
    onStatusChange(orderId, event);
  }

  return <section className="card border-0 shadow-sm rounded-4 mb-5"><div className="card-body">
    <h2 className="h4 fw-bold mb-3"><i className="fa-solid fa-truck-fast me-2 text-warning" />Administración de Pedidos</h2>
    <div className="table-responsive"><table className="table table-hover align-middle mb-0">
      <thead className="table-light"><tr><th>ID</th><th>Cliente</th><th>Fecha</th><th>Total</th><th>Estado</th></tr></thead>
      <tbody>{orders.map((order) => <AdminOrderRow key={order.id} order={order} onStatusChange={handleStatusChange} />)}
        {!orders.length && <tr><td colSpan="5" className="text-center text-muted py-4">No hay pedidos registrados.</td></tr>}
      </tbody>
    </table></div>
  </div></section>;
}

/** Resume un pedido y ofrece el selector de estado de administración. */
function AdminOrderRow({ order, onStatusChange }) {
  /** Envía al panel el estado elegido para el pedido. */
  function handleStatusChange(event) {
    onStatusChange(order.id, event);
  }

  return <tr><td className="fw-semibold">{order.numero}</td><td>{order.clienteNombre}</td><td>{new Date(order.fecha).toLocaleDateString('es-CL')}</td><td>{formatCLP(order.total)}</td><td><select className="form-select form-select-sm" value={order.estado} onChange={handleStatusChange}>{ORDER_STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}</select></td></tr>;
}

/** Captura los campos de creación o edición de un producto del catálogo. */
function ProductEditor({ product, onSave, onClose }) {
  const [formData, setFormData] = useState({
    codigo: product.codigo || '',
    nombre: product.nombre || '',
    descripcion: product.descripcion || '',
    categoria: product.categoria || CATEGORIES[0],
    precio: product.precio ?? '',
    stock: product.stock ?? '',
    stockCritico: product.stockCritico ?? '',
    imagen: product.imagen || ''
  });

  /** Actualiza el campo del producto que se está editando. */
  function handleFieldChange(event) {
    const { name, value } = event.target;
    setFormData((previousData) => ({ ...previousData, [name]: value }));
  }

  /** Convierte y valida los valores del formulario antes de guardarlos. */
  function handleSubmit(event) {
    event.preventDefault();
    const nextProduct = { ...formData, precio: Number(formData.precio), stock: Number(formData.stock), stockCritico: Number(formData.stockCritico) || 0 };
    if (!formData.codigo.trim() || !formData.nombre.trim() || !Number.isFinite(nextProduct.precio) || nextProduct.precio < 0 || !Number.isInteger(nextProduct.stock) || nextProduct.stock < 0) {
      showMessage({ icon: 'error', title: 'Datos inválidos', text: 'Completa código, nombre, precio y stock con valores válidos.' });
      return;
    }
    onSave({ ...nextProduct, codigo: formData.codigo.trim(), nombre: formData.nombre.trim(), imagen: formData.imagen.trim() || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80' });
  }

  return <div className="modal d-block" role="dialog" aria-modal="true" aria-labelledby="productEditorTitle" tabIndex="-1" style={{ background: 'rgba(0, 0, 0, .5)' }}>
    <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable"><div className="modal-content">
      <div className="modal-header"><h2 className="modal-title h5" id="productEditorTitle">{product.id ? 'Editar producto' : 'Nuevo producto'}</h2><button type="button" className="btn-close" onClick={onClose} aria-label="Cerrar" /></div>
      <form onSubmit={handleSubmit}>
        <div className="modal-body"><div className="row g-3">
          <EditorField name="codigo" label="Código único" value={formData.codigo} onChange={handleFieldChange} />
          <EditorField name="nombre" label="Nombre" value={formData.nombre} onChange={handleFieldChange} />
          <label className="col-12">Descripción<textarea className="form-control mt-1" name="descripcion" value={formData.descripcion} onChange={handleFieldChange} rows="2" /></label>
          <label className="col-md-6">Categoría<select className="form-select mt-1" name="categoria" value={formData.categoria} onChange={handleFieldChange}>{CATEGORIES.map((category) => <option key={category}>{category}</option>)}</select></label>
          <EditorField name="precio" label="Precio (CLP)" type="number" min="0" value={formData.precio} onChange={handleFieldChange} />
          <EditorField name="stock" label="Stock" type="number" min="0" value={formData.stock} onChange={handleFieldChange} />
          <EditorField name="stockCritico" label="Stock crítico" type="number" min="0" value={formData.stockCritico} onChange={handleFieldChange} />
          <EditorField name="imagen" label="URL de imagen" type="url" value={formData.imagen} onChange={handleFieldChange} />
        </div></div>
        <div className="modal-footer"><button type="button" className="btn btn-outline-secondary" onClick={onClose}>Cancelar</button><button type="submit" className="btn btn-success">Guardar</button></div>
      </form>
    </div></div>
  </div>;
}

/** Renderiza un campo reutilizable del formulario de producto. */
function EditorField({ name, label, type = 'text', min, value, onChange }) {
  return <label className="col-md-6">{label}<input className="form-control mt-1" name={name} type={type} min={min} value={value} onChange={onChange} required={name !== 'stockCritico' && name !== 'imagen'} /></label>;
}
