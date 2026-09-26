import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingBag, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const isOutOfStock = product.stock <= 0;

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Product Image Container */}
      <div style={{ position: 'relative', overflow: 'hidden', paddingTop: '75%', backgroundColor: '#f1f5f9' }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease'
          }}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80';
          }}
        />
        <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
          <span className="badge badge-primary">{product.category}</span>
        </div>
        <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
          <span className={`badge ${isOutOfStock ? 'badge-danger' : product.stock < 10 ? 'badge-warning' : 'badge-success'}`}>
            {isOutOfStock ? 'Out of Stock' : `${product.stock} In Stock`}
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.4rem' }}>
            <Star size={16} fill="#f59e0b" color="#f59e0b" />
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{product.rating || 4.5}</span>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>({product.reviewCount || 12})</span>
          </div>

          <Link to={`/product/${product._id}`}>
            <h3 style={{
              fontSize: '1rem',
              fontWeight: 600,
              color: '#0f172a',
              lineHeight: 1.4,
              marginBottom: '0.5rem',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {product.name}
            </h3>
          </Link>
        </div>

        <div style={{ marginTop: '1rem' }}>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#4f46e5', marginBottom: '0.85rem' }}>
            ₹{product.price.toLocaleString('en-IN')}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '0.5rem' }}>
            <button
              onClick={() => addToCart(product._id, 1)}
              disabled={isOutOfStock}
              className="btn btn-primary btn-sm"
              style={{ width: '100%' }}
            >
              <ShoppingBag size={16} />
              {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
            </button>
            <button
              onClick={() => navigate(`/product/${product._id}`)}
              className="btn btn-outline btn-sm"
              title="View Details"
            >
              <Eye size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
