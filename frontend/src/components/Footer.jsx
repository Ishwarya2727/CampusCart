import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ShieldCheck, Truck, Clock } from 'lucide-react';

export const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#0f172a',
      color: '#f8fafc',
      paddingTop: '3.5rem',
      paddingBottom: '2rem',
      marginTop: 'auto'
    }}>
      <div className="container">
        {/* Features Banner */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem',
          paddingBottom: '2.5rem',
          marginBottom: '2.5rem',
          borderBottom: '1px solid #334155'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#818cf8' }}>
              <Truck size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.95rem', color: '#ffffff', marginBottom: '0.2rem' }}>Fast Campus Delivery</h4>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Direct to hostel gate or campus spot</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#34d399' }}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.95rem', color: '#ffffff', marginBottom: '0.2rem' }}>Student Friendly Prices</h4>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Verified genuine quality products</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f87171' }}>
              <Clock size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.95rem', color: '#ffffff', marginBottom: '0.2rem' }}>Easy Payment Options</h4>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Cash on Delivery & Instant UPI</p>
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #4f46e5, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}>
                <GraduationCap size={20} />
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>CampusCart</span>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6 }}>
              "Everything You Need for Campus Life". Your one-stop college store for stationery, tech accessories, campus wear & hostel essentials.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 style={{ fontSize: '1rem', color: '#ffffff', marginBottom: '1rem' }}>Categories</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem', color: '#94a3b8' }}>
              <li><Link to="/shop?category=Stationery" style={{ hover: { color: '#ffffff' } }}>Stationery & Notes</Link></li>
              <li><Link to="/shop?category=Bags %26 College Essentials">Bags & Backpacks</Link></li>
              <li><Link to="/shop?category=Tech %26 Accessories">Tech Accessories</Link></li>
              <li><Link to="/shop?category=Campus Wear">Campus Wear</Link></li>
              <li><Link to="/shop?category=Hostel %26 Lifestyle">Hostel & Lifestyle</Link></li>
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h4 style={{ fontSize: '1rem', color: '#ffffff', marginBottom: '1rem' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem', color: '#94a3b8' }}>
              <li><Link to="/shop">Browse All Products</Link></li>
              <li><Link to="/cart">Shopping Cart</Link></li>
              <li><Link to="/orders">Order History & Tracking</Link></li>
              <li><Link to="/login">Student Login</Link></li>
              <li><Link to="/register">Create Account</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 style={{ fontSize: '1rem', color: '#ffffff', marginBottom: '1rem' }}>Campus Support</h4>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
              Have questions or need help with bulk campus orders?
            </p>
            <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#818cf8' }}>
              support@campuscart.edu
            </p>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.5rem' }}>
              University Campus Hub, Sector 4
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid #334155',
          paddingTop: '1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          fontSize: '0.85rem',
          color: '#64748b'
        }}>
          <p>© {new Date().getFullYear()} CampusCart. Built for student life.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Thiranex Full-Stack E-Commerce Project</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
