import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  ShoppingBag,
  Headphones,
  Shirt,
  Home,
  ArrowRight,
  Sparkles,
  Zap,
  TrendingUp,
  Percent
} from 'lucide-react';
import { api } from '../services/api';
import { ProductCard } from '../components/ProductCard';

const CATEGORIES = [
  { name: 'Stationery', icon: BookOpen, count: 'Notebooks, Pens, Folders', bg: '#e0e7ff', color: '#4f46e5' },
  { name: 'Bags & College Essentials', icon: ShoppingBag, count: 'Backpacks, Water Bottles', bg: '#e0f2fe', color: '#0284c7' },
  { name: 'Tech & Accessories', icon: Headphones, count: 'Mouse, Earphones, Cables', bg: '#f3e8ff', color: '#9333ea' },
  { name: 'Campus Wear', icon: Shirt, count: 'Hoodies, Tees, Caps', bg: '#fce7f3', color: '#db2777' },
  { name: 'Hostel & Lifestyle', icon: Home, count: 'Study Lamps, Organizers', bg: '#dcfce7', color: '#16a34a' }
];

export const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        const products = await api.get('/products');
        setFeaturedProducts(products.slice(0, 4));
        setNewArrivals(products.slice(4, 8));
      } catch (err) {
        console.error('Failed to fetch homepage products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  return (
    <div>
      {/* HERO SECTION */}
      <section style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
        color: '#ffffff',
        padding: '5rem 0 6rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, rgba(0,0,0,0) 70%)'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '750px', textAlign: 'left' }}>
            <div className="badge badge-primary" style={{
              marginBottom: '1.25rem',
              backgroundColor: 'rgba(99, 102, 241, 0.2)',
              color: '#818cf8',
              border: '1px solid rgba(129, 140, 248, 0.3)',
              padding: '0.4rem 0.85rem'
            }}>
              <Sparkles size={14} />
              #1 Student E-Commerce Platform
            </div>

            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.15,
              marginBottom: '1.25rem',
              letterSpacing: '-1px'
            }}>
              Everything You Need for <span style={{
                background: 'linear-gradient(135deg, #818cf8, #c084fc)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Campus Life</span>
            </h1>

            <p style={{
              fontSize: '1.15rem',
              color: '#cbd5e1',
              lineHeight: 1.6,
              marginBottom: '2.25rem',
              maxWidth: '620px'
            }}>
              Shop stationery, tech accessories, campus wear and everyday college essentials in one place with fast campus delivery and student discounts.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <Link to="/shop" className="btn btn-primary btn-lg">
                Shop Now
                <ArrowRight size={20} />
              </Link>
              <a href="#categories" className="btn btn-outline btn-lg" style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: '#ffffff', borderColor: 'rgba(255,255,255,0.2)' }}>
                Explore Categories
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED CATEGORIES SECTION */}
      <section id="categories" style={{ padding: '4.5rem 0 3.5rem' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
            <div>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#4f46e5', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Browse Collection
              </span>
              <h2 style={{ fontSize: '2rem', marginTop: '0.2rem' }}>Explore Categories</h2>
            </div>
            <Link to="/shop" style={{ color: '#4f46e5', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.25rem'
          }}>
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.name}
                  onClick={() => navigate(`/shop?category=${encodeURIComponent(cat.name)}`)}
                  className="card"
                  style={{
                    padding: '1.75rem 1.25rem',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    transition: 'all 0.25s ease'
                  }}
                >
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '14px',
                    backgroundColor: cat.bg,
                    color: cat.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={26} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', color: '#0f172a' }}>{cat.name}</h3>
                    <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{cat.count}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROMOTIONAL BANNER */}
      <section style={{ padding: '0 0 4rem' }}>
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)',
            borderRadius: '20px',
            padding: '2.5rem 2rem',
            color: '#ffffff',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            boxShadow: '0 15px 30px rgba(79, 70, 229, 0.25)'
          }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(255,255,255,0.2)', padding: '0.3rem 0.75rem', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                <Percent size={16} /> Campus Discount Special
              </div>
              <h2 style={{ fontSize: '1.8rem', color: '#ffffff', marginBottom: '0.5rem' }}>
                Get Flat ₹50 Shipping On All College Orders
              </h2>
              <p style={{ color: '#e0e7ff', fontSize: '1rem', maxWidth: '550px' }}>
                Order all your semester notebooks, lab coats, fast chargers and daily hostel supplies in one cart!
              </p>
            </div>
            <Link to="/shop" className="btn btn-lg" style={{ backgroundColor: '#ffffff', color: '#4f46e5', fontWeight: 700 }}>
              Shop Essentials
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section style={{ padding: '0 0 4rem' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <TrendingUp size={24} color="#4f46e5" />
              <h2 style={{ fontSize: '1.75rem' }}>Featured Products</h2>
            </div>
            <Link to="/shop" style={{ color: '#4f46e5', fontWeight: 600 }}>See All Products</Link>
          </div>

          {loading ? (
            <div className="spinner-container">
              <div className="spinner"></div>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '1.5rem'
            }}>
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section style={{ padding: '0 0 5rem' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Zap size={24} color="#f59e0b" />
              <h2 style={{ fontSize: '1.75rem' }}>New Arrivals for Semester</h2>
            </div>
            <Link to="/shop" style={{ color: '#4f46e5', fontWeight: 600 }}>Explore All</Link>
          </div>

          {loading ? (
            <div className="spinner-container">
              <div className="spinner"></div>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '1.5rem'
            }}>
              {newArrivals.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
