
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sprout,
  LayoutDashboard,
  Package,
  ShoppingBasket,
  Plus,
  LogOut,
  Leaf,
  ArrowUpRight,
} from 'lucide-react';

import './FarmerDashboard.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function FarmerDashboard() {
  const navigate = useNavigate();
  const [summary, setSummary] = useState({ listingsCount: 0, totalOrders: 0, totalRevenue: 0 });
  const [listings, setListings] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const name = localStorage.getItem('name') || 'Farmer';

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/');
      return;
    }

    const fetchFarmerData = async () => {
      try {
        const [summaryRes, listingsRes, ordersRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/farmer/summary`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          fetch(`${API_BASE_URL}/api/farmer/listings`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          fetch(`${API_BASE_URL}/api/farmer/orders`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        if (!summaryRes.ok || !listingsRes.ok || !ordersRes.ok) {
          throw new Error('Failed to load farmer data');
        }

        const summaryData = await summaryRes.json();
        const listingsData = await listingsRes.json();
        const ordersData = await ordersRes.json();

        setSummary(summaryData);
        setListings(listingsData || []);
        setOrders(ordersData || []);
      } catch (error) {
        console.error('Farmer dashboard error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFarmerData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="farmer-app">
      <aside className="farmer-sidebar">
        <a href="/farmer" className="farmer-brand">
          <span className="farmer-brand-icon">
            <Sprout size={25} />
          </span>
          <span>
            <strong>AgriLink</strong>
            <small>Farm to Market</small>
          </span>
        </a>

        <p className="farmer-menu-label">WORKSPACE</p>

        <nav className="farmer-menu">
          <a className="farmer-menu-active" href="#overview">
            <LayoutDashboard size={19} />
            Dashboard
          </a>
          <a href="#listings">
            <Package size={19} />
            My Crop Listings
          </a>
          <a href="#orders">
            <ShoppingBasket size={19} />
            Orders
          </a>
        </nav>

        <div className="farmer-sidebar-bottom">
          <div className="farmer-sidebar-tip">
            <Leaf size={22} />
            <strong>Grow better, together.</strong>
            <p>Connect your harvest with your community.</p>
          </div>

          <button className="farmer-logout" onClick={handleLogout}>
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      <main className="farmer-main" id="overview">
        <header className="farmer-topbar">
          <div>
            <span className="farmer-breadcrumb">Workspace / Dashboard</span>
            <h1>Farmer Dashboard</h1>
          </div>
          <div className="farmer-profile">
            <span className="farmer-avatar">
              <Sprout size={21} />
            </span>
            <div>
              <strong>{name}</strong>
              <small>Farmer Account</small>
            </div>
          </div>
        </header>

        <section className="farmer-welcome">
          <div className="farmer-welcome-content">
            <span className="farmer-eyebrow">
              <Leaf size={15} /> YOUR FARM, YOUR FUTURE
            </span>
            <h2>Good morning, {name}!</h2>
            <p>
              Ready to share your fresh harvest with buyers across Sri Lanka?
              Manage your produce from one place.
            </p>
            <a href="#listings" className="farmer-primary-link">
              View my listings <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="farmer-welcome-art">
            <Sprout size={105} strokeWidth={1.1} />
          </div>
        </section>

        <section className="farmer-stats">
          <article className="farmer-stat-card">
            <span className="farmer-stat-icon">
              <Package size={22} />
            </span>
            <p>My Crop Listings</p>
            <h3>{loading ? '...' : summary.listingsCount}</h3>
            <small>Active crop listings available for buyers</small>
          </article>

          <article className="farmer-stat-card">
            <span className="farmer-stat-icon farmer-stat-icon-gold">
              <ShoppingBasket size={22} />
            </span>
            <p>Orders Received</p>
            <h3>{loading ? '...' : summary.totalOrders}</h3>
            <small>Recent orders from marketplace buyers</small>
          </article>

          <article className="farmer-stat-card">
            <span className="farmer-stat-icon farmer-stat-icon-blue">
              <Sprout size={22} />
            </span>
            <p>Revenue</p>
            <h3>{loading ? '...' : `Rs. ${summary.totalRevenue}`}</h3>
            <small>Estimated total value from your current orders</small>
          </article>
        </section>

        <section className="farmer-section" id="listings">
          <div className="farmer-section-heading">
            <div>
              <span className="farmer-section-kicker">YOUR PRODUCE</span>
              <h2>My Crop Listings</h2>
              <p>Manage the crops you offer to marketplace buyers.</p>
            </div>
            <button
              className="farmer-add-button"
              onClick={() =>
                window.alert(
                  'Add Crop form is ready for backend integration. The listing API is already connected.'
                )
              }
            >
              <Plus size={18} />
              Add New Crop
            </button>
          </div>

          {loading ? (
            <div className="farmer-empty-state">
              <p>Loading farmer data...</p>
            </div>
          ) : listings.length === 0 ? (
            <div className="farmer-empty-state">
              <span className="farmer-empty-icon">
                <Sprout size={32} />
              </span>
              <h3>No crop listings yet</h3>
              <p>Your harvest listings will appear here once you add products.</p>
            </div>
          ) : (
            <div className="farmer-listings-grid">
              {listings.map((crop) => (
                <article key={crop._id} className="farmer-listing-item">
                  <div className="farmer-listing-head">
                    <strong>{crop.name}</strong>
                    <span className={`farmer-status ${crop.status}`}>{crop.status}</span>
                  </div>
                  <p>{crop.category}</p>
                  <div className="farmer-listing-meta">
                    <span>{crop.quantity} {crop.unit}</span>
                    <span>Rs. {crop.pricePerUnit} / {crop.unit}</span>
                  </div>
                  <small>{crop.location}</small>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="farmer-section farmer-orders" id="orders">
          <div className="farmer-section-heading">
            <div>
              <span className="farmer-section-kicker">SALES ACTIVITY</span>
              <h2>Recent Orders</h2>
              <p>Keep track of orders from marketplace buyers.</p>
            </div>
          </div>

          {loading ? (
            <div className="farmer-order-placeholder">
              <ShoppingBasket size={23} />
              <span>
                <strong>Loading...</strong>
                <small>Fetching orders from the backend.</small>
              </span>
            </div>
          ) : orders.length === 0 ? (
            <div className="farmer-order-placeholder">
              <ShoppingBasket size={23} />
              <span>
                <strong>No orders yet</strong>
                <small>New sales will appear here once buyers place orders.</small>
              </span>
            </div>
          ) : (
            <div className="farmer-order-list">
              {orders.map((order) => (
                <div key={order._id} className="farmer-order-item">
                  <div>
                    <strong>{order.crop?.name || 'Crop'}</strong>
                    <p>{order.buyer?.name || 'Buyer'} • {order.quantity} units</p>
                  </div>
                  <div className="farmer-order-side">
                    <span className="farmer-order-status">{order.status}</span>
                    <strong>Rs. {order.total}</strong>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <footer className="farmer-footer">
          <span><Sprout size={18} /> AgriLink</span>
          <p>Growing opportunities for Sri Lankan farmers.</p>
        </footer>
      </main>
    </div>
  );
}
