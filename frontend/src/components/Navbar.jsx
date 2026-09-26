import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  ShoppingCart,
  Search,
  User,
  LogOut,
  LayoutDashboard,
  PackageCheck,
  Menu,
  X,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const { itemsCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
      setMobileMenuOpen(false);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header style={{
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '75px',
        gap: '1rem'
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #4f46e5 0%, #8b5cf6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: '0 4px 10px rgba(79, 70, 229, 0.3)'
          }}>
            <GraduationCap size={24} />
          </div>
          <div>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.5px' }}>
              Campus<span style={{ color: '#4f46e5' }}>Cart</span>
            </span>
            <span style={{ display: 'block', fontSize: '0.65rem', color: '#64748b', fontWeight: 600, marginTop: '-3px' }}>
              CAMPUS ESSENTIALS STORE
            </span>
          </div>
        </Link>

        {/* Search Bar - Desktop */}
        <form onSubmit={handleSearchSubmit} style={{
          flex: 1,
          maxWidth: '450px',
          position: 'relative',
          display: 'none'
        }} className="desktop-search">
          <input
            type="text"
            placeholder="Search stationery, headphones, hoodies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input"
            style={{
              paddingLeft: '2.5rem',
              borderRadius: '9999px',
              backgroundColor: '#f8fafc',
              fontSize: '0.9rem'
            }}
          />
          <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
        </form>

        {/* Navigation Links - Desktop */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }} className="desktop-nav">
          <Link to="/" style={{
            fontWeight: isActive('/') ? 700 : 500,
            color: isActive('/') ? '#4f46e5' : '#475569',
            fontSize: '0.95rem'
          }}>
            Home
          </Link>
          <Link to="/shop" style={{
            fontWeight: isActive('/shop') ? 700 : 500,
            color: isActive('/shop') ? '#4f46e5' : '#475569',
            fontSize: '0.95rem'
          }}>
            Shop Catalog
          </Link>

          {user && (
            <Link to="/orders" style={{
              fontWeight: isActive('/orders') ? 700 : 500,
              color: isActive('/orders') ? '#4f46e5' : '#475569',
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}>
              <PackageCheck size={18} />
              My Orders
            </Link>
          )}

          {isAdmin && (
            <Link to="/admin" className="badge badge-warning" style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem' }}>
              <LayoutDashboard size={16} />
              Admin Portal
            </Link>
          )}

          {/* Cart Icon */}
          <Link to="/cart" style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            backgroundColor: '#f1f5f9',
            color: '#0f172a'
          }}>
            <ShoppingCart size={20} />
            {itemsCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                backgroundColor: '#ef4444',
                color: '#ffffff',
                fontSize: '0.75rem',
                fontWeight: 700,
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {itemsCount}
              </span>
            )}
          </Link>

          {/* Auth Actions */}
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Link to="/profile" className="btn btn-outline btn-sm">
                <User size={16} />
                {user.name.split(' ')[0]}
              </Link>
              <button onClick={logout} className="btn btn-sm" style={{ color: '#ef4444' }} title="Logout">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Link to="/login" className="btn btn-outline btn-sm">Log In</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
            </div>
          )}
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ display: 'none' }}
          className="mobile-toggle"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* CSS style injected for desktop vs mobile layout handling */}
      <style>{`
        @media (min-width: 769px) {
          .desktop-search { display: block !important; }
          .desktop-nav { display: flex !important; }
        }
        @media (max-width: 768px) {
          .mobile-toggle { display: block !important; }
          .desktop-nav { display: none !important; }
        }
      `}</style>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: '#ffffff',
          borderTop: '1px solid #e2e8f0',
          padding: '1rem 1.25rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <form onSubmit={handleSearchSubmit} style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '2.5rem', borderRadius: '9999px' }}
            />
            <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
          </form>

          <Link to="/" onClick={() => setMobileMenuOpen(false)} style={{ padding: '0.5rem 0', fontWeight: 600 }}>Home</Link>
          <Link to="/shop" onClick={() => setMobileMenuOpen(false)} style={{ padding: '0.5rem 0', fontWeight: 600 }}>Shop Catalog</Link>
          <Link to="/cart" onClick={() => setMobileMenuOpen(false)} style={{ padding: '0.5rem 0', fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
            Cart ({itemsCount})
          </Link>

          {user && (
            <>
              <Link to="/orders" onClick={() => setMobileMenuOpen(false)} style={{ padding: '0.5rem 0', fontWeight: 600 }}>My Orders</Link>
              <Link to="/profile" onClick={() => setMobileMenuOpen(false)} style={{ padding: '0.5rem 0', fontWeight: 600 }}>My Profile</Link>
            </>
          )}

          {isAdmin && (
            <Link to="/admin" onClick={() => setMobileMenuOpen(false)} style={{ padding: '0.5rem 0', color: '#4f46e5', fontWeight: 700 }}>Admin Portal</Link>
          )}

          {user ? (
            <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="btn btn-danger btn-sm" style={{ width: '100%', marginTop: '0.5rem' }}>
              Log Out
            </button>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.5rem' }}>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="btn btn-outline btn-sm">Log In</Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="btn btn-primary btn-sm">Register</Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
