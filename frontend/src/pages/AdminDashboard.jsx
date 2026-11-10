
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, Package, ShoppingCart,
  ChartNoAxesCombined, Sprout, LogOut, Search,
  Menu, X, TrendingUp
} from 'lucide-react';
import './AdminDashboard.css';

const initialUsers = [
  { id: 1, name: 'Nimal Perera', email: 'nimal@example.com', role: 'Farmer', status: 'Active' },
  { id: 2, name: 'Kamal Silva', email: 'kamal@example.com', role: 'Buyer', status: 'Active' },
  { id: 3, name: 'Saman Kumara', email: 'saman@example.com', role: 'Farmer', status: 'Pending' },
  { id: 4, name: 'Anjali Fernando', email: 'anjali@example.com', role: 'Buyer', status: 'Active' }
];

const initialProducts = [
  { id: 1, name: 'Fresh Tomatoes', farmer: 'Nimal Perera', category: 'Vegetables', price: 180, stock: 120 },
  { id: 2, name: 'Organic Carrots', farmer: 'Saman Kumara', category: 'Vegetables', price: 250, stock: 80 },
  { id: 3, name: 'Fresh Bananas', farmer: 'Nimal Perera', category: 'Fruits', price: 200, stock: 60 }
];

const initialOrders = [
  { id: 'ORD-001', buyer: 'Kamal Silva', product: 'Fresh Tomatoes', amount: 3600, status: 'Delivered' },
  { id: 'ORD-002', buyer: 'Anjali Fernando', product: 'Organic Carrots', amount: 2500, status: 'Pending' },
  { id: 'ORD-003', buyer: 'Kamal Silva', product: 'Fresh Bananas', amount: 1200, status: 'Confirmed' }
];

const navigation = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'orders', label: 'Orders', icon: ShoppingCart },
  { id: 'reports', label: 'Reports', icon: ChartNoAxesCombined }
];

const emptyForms = {
  users: { name: '', email: '', role: 'Farmer', status: 'Active' },
  products: { name: '', farmer: '', category: 'Vegetables', price: '', stock: '' },
  orders: { buyer: '', product: '', amount: '', status: 'Pending' }
};

const fields = {
  users: [
    { key: 'name', label: 'Full Name', required: true },
    { key: 'email', label: 'Email', type: 'email', required: true },
    { key: 'role', label: 'Role', options: ['Farmer', 'Buyer'] },
    { key: 'status', label: 'Status', options: ['Active', 'Pending', 'Suspended'] }
  ],
  products: [
    { key: 'name', label: 'Product Name', required: true },
    { key: 'farmer', label: 'Farmer', required: true },
    { key: 'category', label: 'Category', options: ['Vegetables', 'Fruits', 'Grains', 'Other'] },
    { key: 'price', label: 'Price (Rs.)', type: 'number', min: 0.01, required: true },
    { key: 'stock', label: 'Stock (kg)', type: 'number', min: 0, required: true }
  ],
  orders: [
    { key: 'buyer', label: 'Buyer', required: true },
    { key: 'product', label: 'Product', required: true },
    { key: 'amount', label: 'Amount (Rs.)', type: 'number', min: 0, required: true },
    { key: 'status', label: 'Status', options: ['Pending', 'Confirmed', 'Delivered', 'Cancelled'] }
  ]
};

function Status({ value }) {
  return (
    <span className={`admin-status status-${value.toLowerCase()}`}>
      {value}
    </span>
  );
}

function OrderTable({ rows, onEdit, onDelete }) {
  return (
    <div className="admin-table-wrap">
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Buyer</th>
            <th>Product</th>
            <th>Amount</th>
            <th>Status</th>
            {onEdit && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.buyer}</td>
              <td>{order.product}</td>
              <td>Rs. {Number(order.amount).toLocaleString()}</td>
              <td><Status value={order.status} /></td>
              {onEdit && (
                <td>
                  <div className="admin-crud-actions">
                    <button className="admin-action" onClick={() => onEdit(order)}>
                      Edit
                    </button>
                    <button className="admin-action danger" onClick={() => onDelete(order.id)}>
                      Delete
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 && <p>No matching orders.</p>}
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [section, setSection] = useState('overview');
  const [search, setSearch] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [users, setUsers] = useState(initialUsers);
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState(initialOrders);
  const [editor, setEditor] = useState(null);
  const [form, setForm] = useState({});

  const data = { users, products, orders };
  const setters = { users: setUsers, products: setProducts, orders: setOrders };

  const filtered = rows => rows.filter(row =>
    Object.values(row).some(value =>
      String(value).toLowerCase().includes(search.toLowerCase())
    )
  );

  const revenue = useMemo(
    () => orders
      .filter(order => order.status === 'Delivered')
      .reduce((total, order) => total + Number(order.amount), 0),
    [orders]
  );

  const cards = [
    { label: 'Total Farmers', value: users.filter(u => u.role === 'Farmer').length, icon: Sprout },
    { label: 'Total Buyers', value: users.filter(u => u.role === 'Buyer').length, icon: Users },
    { label: 'Total Products', value: products.length, icon: Package },
    { label: 'Total Orders', value: orders.length, icon: ShoppingCart }
  ];

  const selectSection = id => {
    setSection(id);
    setSearch('');
    setMobileOpen(false);
    setEditor(null);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    navigate('/');
  };

  const openAdd = () => {
    setForm({ ...emptyForms[section] });
    setEditor({ type: section, mode: 'add' });
  };

  const openEdit = record => {
    setForm({ ...record });
    setEditor({ type: section, mode: 'edit' });
  };

  const saveRecord = event => {
    event.preventDefault();
    if (!editor) return;

    const { type, mode } = editor;
    const record = { ...form };

    if (type === 'users') {
      record.name = record.name.trim();
      record.email = record.email.trim();

      if (data.users.some(user =>
        user.email.toLowerCase() === record.email.toLowerCase() &&
        user.id !== record.id
      )) {
        alert('Email already exists.');
        return;
      }
    }

    if (type === 'products') {
      record.name = record.name.trim();
      record.farmer = record.farmer.trim();
      record.price = Number(record.price);
      record.stock = Number(record.stock);

      if (record.price <= 0 || record.stock < 0) {
        alert('Enter valid price and stock.');
        return;
      }
    }

    if (type === 'orders') {
      record.buyer = record.buyer.trim();
      record.product = record.product.trim();
      record.amount = Number(record.amount);

      if (record.amount < 0) {
        alert('Enter a valid amount.');
        return;
      }
    }

    if (mode === 'edit') {
      setters[type](current =>
        current.map(item => item.id === record.id ? record : item)
      );
    } else {
      const rows = data[type];

      const newId = type === 'orders'
        ? `ORD-${String(
            Math.max(0, ...rows.map(row =>
              Number(row.id.replace('ORD-', '')) || 0
            )) + 1
          ).padStart(3, '0')}`
        : Math.max(0, ...rows.map(row => Number(row.id) || 0)) + 1;

      setters[type](current => [...current, { ...record, id: newId }]);
    }

    setEditor(null);
  };

  const deleteRecord = (type, id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;

    setters[type](current => current.filter(item => item.id !== id));
  };

  return (
    <div className="admin-shell">
      <aside className={`admin-sidebar ${mobileOpen ? 'admin-sidebar-open' : ''}`}>
        <div className="admin-logo">
          <Sprout size={30} />
          <div><strong>AgriLink</strong><small>ADMIN PORTAL</small></div>
        </div>

        <p className="admin-nav-label">MANAGEMENT</p>
        <nav aria-label="Admin navigation">
          {navigation.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`admin-nav-button ${section === id ? 'selected' : ''}`}
              onClick={() => selectSection(id)}
            >
              <Icon size={19} />{label}
            </button>
          ))}
        </nav>

        <button className="admin-logout" onClick={logout}>
          <LogOut size={19} /> Log out
        </button>
      </aside>

      {mobileOpen && (
        <button className="admin-overlay" onClick={() => setMobileOpen(false)} />
      )}

      <main className="admin-main">
        <header className="admin-header">
          <div className="admin-heading">
            <button className="admin-menu-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X /> : <Menu />}
            </button>
            <div>
              <span className="admin-eyebrow">AgriLink / Admin</span>
              <h1>{navigation.find(item => item.id === section)?.label}</h1>
            </div>
          </div>
          <div className="admin-avatar">AD</div>
        </header>

        <div className="admin-content">
          {section === 'overview' && (
            <>
              <div className="admin-welcome">
                <div>
                  <p>PLATFORM OVERVIEW</p>
                  <h2>Welcome to AgriLink Admin</h2>
                  <span>Monitor farmers, buyers, products, and orders in one place.</span>
                </div>
                <Sprout size={65} />
              </div>

              <div className="admin-stats">
                {cards.map(({ label, value, icon: Icon }) => (
                  <div className="admin-stat" key={label}>
                    <div className="admin-stat-icon"><Icon size={23} /></div>
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>

              <div className="admin-panels">
                <section className="admin-panel">
                  <h3>Recent Orders</h3>
                  <OrderTable rows={orders.slice(-3).reverse()} />
                </section>
                <section className="admin-panel">
                  <h3>Quick Summary</h3>
                  <div className="admin-summary-line">
                    <span>Completed order revenue</span>
                    <strong>Rs. {revenue.toLocaleString()}</strong>
                  </div>
                  <div className="admin-summary-line">
                    <span>Pending orders</span>
                    <strong>{orders.filter(o => o.status === 'Pending').length}</strong>
                  </div>
                  <div className="admin-summary-line">
                    <span>Pending user reviews</span>
                    <strong>{users.filter(u => u.status === 'Pending').length}</strong>
                  </div>
                </section>
              </div>
            </>
          )}

          {section !== 'overview' && (
            <div className="admin-panel">
              <div className="admin-panel-top">
                <div>
                  <h2>{section === 'reports'
                    ? 'Platform Reports'
                    : `Manage ${section.charAt(0).toUpperCase() + section.slice(1)}`}
                  </h2>
                  <p>{section === 'reports'
                    ? 'A snapshot of demo platform activity.'
                    : 'Browse and manage demo records.'}
                  </p>
                </div>

                {section !== 'reports' && (
                  <div className="admin-crud-toolbar">
                    <label className="admin-search">
                      <Search size={18} />
                      <input
                        placeholder="Search..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                      />
                    </label>
                    <button className="admin-crud-primary" onClick={openAdd}>
                      + Add {section === 'users' ? 'User' : section === 'products' ? 'Product' : 'Order'}
                    </button>
                  </div>
                )}
              </div>

              {section === 'users' && (
                <div className="admin-table-wrap">
                  <table>
                    <thead>
                      <tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                      {filtered(users).map(user => (
                        <tr key={user.id}>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.role}</td>
                          <td><Status value={user.status} /></td>
                          <td>
                            <div className="admin-crud-actions">
                              <button className="admin-action" onClick={() => openEdit(user)}>Edit</button>
                              <button className="admin-action danger" onClick={() => deleteRecord('users', user.id)}>Delete</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filtered(users).length === 0 && <p>No matching users.</p>}
                </div>
              )}

              {section === 'products' && (
                <div className="admin-table-wrap">
                  <table>
                    <thead>
                      <tr><th>Product</th><th>Farmer</th><th>Category</th><th>Price</th><th>Stock</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                      {filtered(products).map(product => (
                        <tr key={product.id}>
                          <td>{product.name}</td>
                          <td>{product.farmer}</td>
                          <td>{product.category}</td>
                          <td>Rs. {Number(product.price).toLocaleString()}</td>
                          <td>{product.stock} kg</td>
                          <td>
                            <div className="admin-crud-actions">
                              <button className="admin-action" onClick={() => openEdit(product)}>Edit</button>
                              <button className="admin-action danger" onClick={() => deleteRecord('products', product.id)}>Delete</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filtered(products).length === 0 && <p>No matching products.</p>}
                </div>
              )}

              {section === 'orders' && (
                <OrderTable
                  rows={filtered(orders)}
                  onEdit={openEdit}
                  onDelete={id => deleteRecord('orders', id)}
                />
              )}

              {section === 'reports' && (
                <div className="admin-report-grid">
                  <div className="admin-report-tile">
                    <TrendingUp /><span>Delivered Revenue</span>
                    <strong>Rs. {revenue.toLocaleString()}</strong>
                  </div>
                  <div className="admin-report-tile">
                    <Users /><span>Registered Users</span>
                    <strong>{users.length}</strong>
                  </div>
                  <div className="admin-report-tile">
                    <Package /><span>Listed Products</span>
                    <strong>{products.length}</strong>
                  </div>
                  <div className="admin-report-tile">
                    <ShoppingCart /><span>Delivered Orders</span>
                    <strong>{orders.filter(o => o.status === 'Delivered').length}</strong>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {editor && (
        <div className="admin-crud-backdrop">
          <div className="admin-crud-modal" role="dialog" aria-modal="true" aria-label="Edit record">
            <div className="admin-crud-modal-head">
              <h2>
                {editor.mode === 'add' ? 'Add' : 'Edit'}{' '}
                {editor.type === 'users' ? 'User' : editor.type === 'products' ? 'Product' : 'Order'}
              </h2>
              <button className="admin-crud-close" onClick={() => setEditor(null)}>
                <X size={20} />
              </button>
            </div>

            <form className="admin-crud-form" onSubmit={saveRecord}>
              {fields[editor.type].map(field => (
                <label className="admin-crud-field" key={field.key}>
                  <span>{field.label}</span>
                  {field.options ? (
                    <select
                      value={form[field.key] ?? ''}
                      onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                    >
                      {field.options.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type || 'text'}
                      required={field.required}
                      min={field.min}
                      step={field.type === 'number' ? '0.01' : undefined}
                      value={form[field.key] ?? ''}
                      onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                    />
                  )}
                </label>
              ))}
              {editor.type === 'products' && (
  <div className="admin-crud-field">
    <label htmlFor="product-image">
      Product Image (PNG)
    </label>

    <input
      id="product-image"
      type="file"
      accept=".png,image/png"
      onChange={(event) => {
        const file = event.target.files?.[0];

        if (!file) return;

        if (file.type !== 'image/png') {
          alert('Please select a PNG image.');
          event.target.value = '';
          return;
        }

        if (file.size > 2 * 1024 * 1024) {
          alert('Maximum image size is 2 MB.');
          event.target.value = '';
          return;
        }

        const reader = new FileReader();

        reader.onload = () => {
          setForm((current) => ({
            ...current,
            image: reader.result
          }));
        };

        reader.readAsDataURL(file);
      }}
    />

    {form.image && (
      <div className="admin-image-preview">
        <img
          src={form.image}
          alt="Product preview"
        />
      </div>
    )}
  </div>
)}
              <div className="admin-crud-footer">
                <button type="button" className="admin-crud-secondary" onClick={() => setEditor(null)}>
                  Cancel
                </button>
                <button type="submit" className="admin-crud-primary">
                  {editor.mode === 'add' ? 'Add' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
