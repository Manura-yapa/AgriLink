
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

export default function FarmerDashboard() {
  const navigate = useNavigate();
  const name = localStorage.getItem('name') || 'Farmer';

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
            <h3>—</h3>
            <small>Connect your crop data to view totals</small>
          </article>

          <article className="farmer-stat-card">
            <span className="farmer-stat-icon farmer-stat-icon-gold">
              <ShoppingBasket size={22} />
            </span>
            <p>Orders Received</p>
            <h3>—</h3>
            <small>Order totals will appear when connected</small>
          </article>

          <article className="farmer-stat-card">
            <span className="farmer-stat-icon farmer-stat-icon-blue">
              <Sprout size={22} />
            </span>
            <p>Harvest Management</p>
            <h3>Ready</h3>
            <small>Keep your produce information updated</small>
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
                  'The Add Crop form will be connected after we check your existing backend API.'
                )
              }
            >
              <Plus size={18} />
              Add New Crop
            </button>
          </div>

          <div className="farmer-empty-state">
            <span className="farmer-empty-icon">
              <Sprout size={32} />
            </span>
            <h3>Your crop listings will appear here</h3>
            <p>
              We will connect this section to your existing crop API so you can
              add produce and manage your inventory.
            </p>
          </div>
        </section>

        <section className="farmer-section farmer-orders" id="orders">
          <div className="farmer-section-heading">
            <div>
              <span className="farmer-section-kicker">SALES ACTIVITY</span>
              <h2>Recent Orders</h2>
              <p>Keep track of orders from marketplace buyers.</p>
            </div>
          </div>

          <div className="farmer-order-placeholder">
            <ShoppingBasket size={23} />
            <span>
              <strong>Orders will appear here</strong>
              <small>
                This section needs your existing orders API connection.
              </small>
            </span>
          </div>
        </section>

        <footer className="farmer-footer">
          <span><Sprout size={18} /> AgriLink</span>
          <p>Growing opportunities for Sri Lankan farmers.</p>
        </footer>
      </main>
    </div>
  );
}
