import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, Plus, Minus, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export const CartPage = () => {
  const { cart, subtotal, shipping, total, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const items = cart.items || [];
  const isEmpty = items.length === 0;

  if (!user) {
    return (
      <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <div className="empty-state">
          <ShoppingBag size={48} className="empty-state-icon" />
          <h3 className="empty-state-title">Please Log In</h3>
          <p className="empty-state-text">You need an active student account to manage your shopping cart.</p>
          <Link to="/login" className="btn btn-primary">Log In Now</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2.5rem 1rem 5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Shopping Cart</h1>
          <p style={{ color: '#64748b' }}>Manage your campus essentials before placing order.</p>
        </div>
        {!isEmpty && (
          <button onClick={clearCart} className="btn btn-outline btn-sm" style={{ color: '#ef4444' }}>
            <Trash2 size={16} /> Clear Cart
          </button>
        )}
      </div>

      {isEmpty ? (
        <div className="empty-state">
          <ShoppingBag size={64} className="empty-state-icon" />
          <h3 className="empty-state-title">Your cart is empty</h3>
          <p className="empty-state-text">Looks like you haven't added any college items to your cart yet.</p>
          <Link to="/shop" className="btn btn-primary btn-lg">Explore Shop Catalog</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '2rem' }} className="cart-layout">
          {/* Item List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {items.map((item) => {
              const product = item.product;
              if (!product) return null;

              const itemSubtotal = product.price * item.quantity;
              const isMaxStock = item.quantity >= product.stock;

              return (
                <div key={product._id} className="card" style={{ padding: '1.25rem', display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                  {/* Thumbnail */}
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '10px', backgroundColor: '#f1f5f9' }}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80';
                    }}
                  />

                  {/* Details */}
                  <div style={{ flex: 1 }}>
                    <span className="badge badge-primary" style={{ fontSize: '0.7rem', marginBottom: '0.2rem' }}>{product.category}</span>
                    <Link to={`/product/${product._id}`}>
                      <h4 style={{ fontSize: '1rem', color: '#0f172a', marginBottom: '0.25rem' }}>{product.name}</h4>
                    </Link>
                    <span style={{ fontSize: '0.9rem', color: '#64748b' }}>₹{product.price.toLocaleString('en-IN')} each</span>
                  </div>

                  {/* Quantity Controls */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <button
                      onClick={() => updateQuantity(product._id, item.quantity - 1)}
                      className="btn btn-outline"
                      style={{ width: '32px', height: '32px', padding: 0 }}
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={14} />
                    </button>
                    <span style={{ width: '36px', textAlign: 'center', fontWeight: 700 }}>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(product._id, item.quantity + 1)}
                      className="btn btn-outline"
                      style={{ width: '32px', height: '32px', padding: 0 }}
                      disabled={isMaxStock}
                      title={isMaxStock ? 'Stock limit reached' : 'Add one more'}
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  {/* Item Subtotal */}
                  <div style={{ width: '100px', textAlign: 'right', fontWeight: 700, fontSize: '1.1rem', color: '#4f46e5' }}>
                    ₹{itemSubtotal.toLocaleString('en-IN')}
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(product._id)}
                    style={{ color: '#94a3b8', padding: '0.5rem' }}
                    title="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              );
            })}

            <div style={{ marginTop: '1rem' }}>
              <Link to="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#4f46e5', fontWeight: 600 }}>
                <ArrowLeft size={16} /> Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary Box */}
          <div>
            <div className="card" style={{ padding: '1.5rem', sticky: 'top', top: '100px' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid #e2e8f0' }}>
                Order Summary
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.25rem', fontSize: '0.95rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                  <span>Campus Shipping</span>
                  <span>₹{shipping}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px dashed #e2e8f0', fontWeight: 800, fontSize: '1.25rem', color: '#0f172a' }}>
                  <span>Total Amount</span>
                  <span style={{ color: '#4f46e5' }}>₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="btn btn-primary btn-lg"
                style={{ width: '100%' }}
              >
                Proceed to Checkout
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 800px) {
          .cart-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};
