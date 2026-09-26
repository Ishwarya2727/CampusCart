import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, ShoppingBag, ArrowLeft, Plus, Minus, Truck, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await api.get(`/products/${id}`);
        setProduct(data);
        setQuantity(1);

        // Fetch related products in the same category
        if (data.category) {
          const all = await api.get(`/products?category=${encodeURIComponent(data.category)}`);
          setRelatedProducts(all.filter((p) => p._id !== data._id).slice(0, 4));
        }
      } catch (err) {
        setError(err.message || 'Product not found');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <div className="empty-state">
          <h3>{error || 'Product Not Found'}</h3>
          <Link to="/shop" className="btn btn-primary mt-2">Back to Shop</Link>
        </div>
      </div>
    );
  }

  const isOutOfStock = product.stock <= 0;

  const handleBuyNow = async () => {
    const success = await addToCart(product._id, quantity);
    if (success) {
      navigate('/checkout');
    }
  };

  return (
    <div className="container" style={{ padding: '2.5rem 1rem 5rem' }}>
      {/* Back button */}
      <Link to="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#64748b', marginBottom: '2rem', fontWeight: 500 }}>
        <ArrowLeft size={18} /> Back to Catalog
      </Link>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '3rem',
        marginBottom: '4rem'
      }} className="product-detail-grid">
        {/* Left: Product Image */}
        <div className="card" style={{ padding: '1rem', backgroundColor: '#ffffff', overflow: 'hidden' }}>
          <div style={{ position: 'relative', width: '100%', paddingTop: '85%', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#f8fafc' }}>
            <img
              src={product.image}
              alt={product.name}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain'
              }}
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80';
              }}
            />
          </div>
        </div>

        {/* Right: Info */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ marginBottom: '0.75rem' }}>
            <span className="badge badge-primary" style={{ marginRight: '0.5rem' }}>{product.category}</span>
            <span className={`badge ${isOutOfStock ? 'badge-danger' : product.stock < 10 ? 'badge-warning' : 'badge-success'}`}>
              {isOutOfStock ? 'Out of Stock' : `${product.stock} units left in stock`}
            </span>
          </div>

          <h1 style={{ fontSize: '2.2rem', marginBottom: '1rem', color: '#0f172a' }}>{product.name}</h1>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  fill={i < Math.floor(product.rating || 4.5) ? '#f59e0b' : '#e2e8f0'}
                  color={i < Math.floor(product.rating || 4.5) ? '#f59e0b' : '#cbd5e1'}
                />
              ))}
            </div>
            <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{product.rating || 4.5}</span>
            <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>({product.reviewCount || 12} customer reviews)</span>
          </div>

          {/* Price */}
          <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#4f46e5', marginBottom: '1.5rem' }}>
            ₹{product.price.toLocaleString('en-IN')}
          </div>

          <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem', fontSize: '1.05rem' }}>
            {product.description}
          </p>

          {/* Quantity Selector */}
          {!isOutOfStock && (
            <div style={{ marginBottom: '2rem' }}>
              <label className="form-label" style={{ marginBottom: '0.5rem', display: 'block' }}>Quantity</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="btn btn-outline"
                  style={{ width: '40px', height: '40px', padding: 0 }}
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <span style={{ width: '50px', textAlign: 'center', fontWeight: 700, fontSize: '1.1rem' }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="btn btn-outline"
                  style={{ width: '40px', height: '40px', padding: 0 }}
                  disabled={quantity >= product.stock}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
            <button
              onClick={() => addToCart(product._id, quantity)}
              disabled={isOutOfStock}
              className="btn btn-primary btn-lg"
              style={{ flex: 1, minWidth: '200px' }}
            >
              <ShoppingBag size={20} />
              Add to Cart
            </button>

            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className="btn btn-secondary btn-lg"
              style={{ flex: 1, minWidth: '200px', fontWeight: 700 }}
            >
              Buy Now
            </button>
          </div>

          {/* Features check */}
          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: '#64748b' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Truck size={18} color="#4f46e5" />
              <span>Free campus drop-off within 24 hours</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={18} color="#10b981" />
              <span>100% Genuine product warranty guaranteed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '3rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>Related Campus Essentials</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '1.5rem'
          }}>
            {relatedProducts.map((rel) => (
              <ProductCard key={rel._id} product={rel} />
            ))}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .product-detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};
