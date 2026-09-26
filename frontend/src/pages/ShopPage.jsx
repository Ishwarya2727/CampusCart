import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, RotateCcw, PackageX } from 'lucide-react';
import { api } from '../services/api';
import { ProductCard } from '../components/ProductCard';

const CATEGORIES = [
  'All',
  'Stationery',
  'Bags & College Essentials',
  'Tech & Accessories',
  'Campus Wear',
  'Hostel & Lifestyle'
];

export const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters state initialized from URL query params
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [inStock, setInStock] = useState(searchParams.get('inStock') === 'true');
  const [sort, setSort] = useState(searchParams.get('sort') || 'newest');

  // Update state if URL params change externally (e.g. Navbar search)
  useEffect(() => {
    setSearch(searchParams.get('search') || '');
    if (searchParams.get('category')) {
      setCategory(searchParams.get('category'));
    }
  }, [searchParams]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (category && category !== 'All') params.append('category', category);
      if (minPrice) params.append('minPrice', minPrice);
      if (maxPrice) params.append('maxPrice', maxPrice);
      if (inStock) params.append('inStock', 'true');
      if (sort) params.append('sort', sort);

      const data = await api.get(`/products?${params.toString()}`);
      setProducts(data);
    } catch (err) {
      setError('Failed to load products. Please check server connection.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, category, minPrice, maxPrice, inStock, sort]);

  const handleResetFilters = () => {
    setSearch('');
    setCategory('All');
    setMinPrice('');
    setMaxPrice('');
    setInStock(false);
    setSort('newest');
    setSearchParams({});
  };

  return (
    <div className="container" style={{ padding: '2.5rem 1rem 4rem' }}>
      {/* Title */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '0.4rem' }}>Shop Products</h1>
        <p style={{ color: '#64748b' }}>Browse through our student catalog of essentials and accessories.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '2rem' }} className="shop-layout">
        {/* Sidebar Filters */}
        <div className="card" style={{ padding: '1.5rem', height: 'fit-content' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
              <Filter size={18} color="#4f46e5" />
              <span>Filters</span>
            </div>
            <button onClick={handleResetFilters} style={{ fontSize: '0.8rem', color: '#4f46e5', display: 'flex', alignItems: 'center', gap: '0.2rem', fontWeight: 600 }}>
              <RotateCcw size={14} /> Reset
            </button>
          </div>

          {/* Search */}
          <div className="form-group">
            <label className="form-label">Search Product</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Product name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '2.2rem' }}
              />
              <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          {/* Category */}
          <div className="form-group">
            <label className="form-label">Category</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  style={{
                    textAlign: 'left',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    fontWeight: category === cat ? 700 : 400,
                    backgroundColor: category === cat ? '#eef2ff' : 'transparent',
                    color: category === cat ? '#4f46e5' : '#475569',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="form-group">
            <label className="form-label">Price Range (₹)</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="form-input"
              />
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          {/* In Stock Only */}
          <div className="form-group" style={{ marginTop: '0.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', fontSize: '0.9rem' }}>
              <input
                type="checkbox"
                checked={inStock}
                onChange={(e) => setInStock(e.target.checked)}
                style={{ width: '16px', height: '16px', accentColor: '#4f46e5' }}
              />
              In Stock Only
            </label>
          </div>
        </div>

        {/* Main Product Grid */}
        <div>
          {/* Top Control Bar */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
            backgroundColor: '#ffffff',
            padding: '1rem 1.25rem',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            gap: '1rem'
          }}>
            <span style={{ fontSize: '0.9rem', color: '#64748b' }}>
              Showing <strong style={{ color: '#0f172a' }}>{products.length}</strong> products
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.9rem', color: '#64748b' }}>Sort By:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="form-select"
                style={{ width: 'auto', padding: '0.4rem 0.8rem', fontSize: '0.9rem' }}
              >
                <option value="newest">Newest Arrivals</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Product Grid / Loading / Empty State */}
          {loading ? (
            <div className="spinner-container">
              <div className="spinner"></div>
              <p style={{ color: '#64748b' }}>Loading products...</p>
            </div>
          ) : error ? (
            <div className="empty-state">
              <p style={{ color: '#ef4444' }}>{error}</p>
              <button onClick={fetchProducts} className="btn btn-primary mt-2">Retry</button>
            </div>
          ) : products.length === 0 ? (
            <div className="empty-state">
              <PackageX size={48} className="empty-state-icon" />
              <h3 className="empty-state-title">No products found</h3>
              <p className="empty-state-text">Try resetting your filters or searching for something else.</p>
              <button onClick={handleResetFilters} className="btn btn-secondary">Clear Filters</button>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '1.5rem'
            }}>
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 850px) {
          .shop-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};
