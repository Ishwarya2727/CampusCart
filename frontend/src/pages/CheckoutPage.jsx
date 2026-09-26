import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CreditCard, Truck, ShieldCheck, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

export const CheckoutPage = () => {
  const { cart, subtotal, shipping, total, fetchCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const items = cart.items || [];

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address?.street || '',
    city: user?.address?.city || 'University City',
    state: user?.address?.state || 'Delhi',
    pincode: user?.address?.pincode || '110007'
  });

  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (items.length === 0) {
      setError('Cart is empty. Cannot place order.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const orderData = {
        shippingAddress: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode
        },
        paymentMethod
      };

      const createdOrder = await api.post('/orders', orderData);
      await fetchCart(); // Sync empty cart
      navigate(`/order-confirmation/${createdOrder._id}`);
    } catch (err) {
      setError(err.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <div className="empty-state">
          <h3>Your cart is empty</h3>
          <p>Add some items before attempting checkout.</p>
          <Link to="/shop" className="btn btn-primary mt-2">Go to Shop</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2.5rem 1rem 5rem' }}>
      <Link to="/cart" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#64748b', marginBottom: '1.5rem' }}>
        <ArrowLeft size={16} /> Back to Cart
      </Link>

      <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Checkout & Order Review</h1>

      {error && (
        <div className="card" style={{ padding: '1rem', backgroundColor: '#fee2e2', color: '#b91c1c', border: '1px solid #fca5a5', marginBottom: '1.5rem' }}>
          {error}
        </div>
      )}

      <form onSubmit={handlePlaceOrder}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2rem' }} className="checkout-layout">
          {/* Left Column: Customer & Address Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Customer Contact */}
            <div className="card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#0f172a' }}>1. Customer Information</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="10 digit mobile"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#0f172a' }}>2. Campus Shipping Address</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label className="form-label">Street / Hostel Room No. *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="e.g. Room 302, Hostel 5, North Campus"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">State *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label className="form-label">Pincode *</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#0f172a' }}>3. Select Payment Method</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  borderRadius: '12px',
                  border: paymentMethod === 'Cash on Delivery' ? '2px solid #4f46e5' : '1px solid #e2e8f0',
                  backgroundColor: paymentMethod === 'Cash on Delivery' ? '#eef2ff' : '#ffffff',
                  cursor: 'pointer'
                }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Cash on Delivery"
                    checked={paymentMethod === 'Cash on Delivery'}
                    onChange={() => setPaymentMethod('Cash on Delivery')}
                    style={{ accentColor: '#4f46e5' }}
                  />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Truck size={22} color="#4f46e5" />
                    <div>
                      <span style={{ fontWeight: 700, display: 'block', color: '#0f172a' }}>Cash on Delivery (COD)</span>
                      <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Pay in cash upon arrival at your hostel</span>
                    </div>
                  </div>
                </label>

                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  borderRadius: '12px',
                  border: paymentMethod === 'Demo Online Payment' ? '2px solid #4f46e5' : '1px solid #e2e8f0',
                  backgroundColor: paymentMethod === 'Demo Online Payment' ? '#eef2ff' : '#ffffff',
                  cursor: 'pointer'
                }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Demo Online Payment"
                    checked={paymentMethod === 'Demo Online Payment'}
                    onChange={() => setPaymentMethod('Demo Online Payment')}
                    style={{ accentColor: '#4f46e5' }}
                  />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <CreditCard size={22} color="#10b981" />
                    <div>
                      <span style={{ fontWeight: 700, display: 'block', color: '#0f172a' }}>Demo Instant Payment (UPI / Card)</span>
                      <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Instant simulated online confirmation</span>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Items Summary */}
          <div>
            <div className="card" style={{ padding: '1.5rem', sticky: 'top', top: '100px' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid #e2e8f0' }}>
                Items ({items.length})
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '300px', overflowY: 'auto', marginBottom: '1.25rem', paddingRight: '0.5rem' }}>
                {items.map((item) => (
                  <div key={item.product._id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem' }}>
                    <img src={item.product.image} alt={item.product.name} style={{ width: '45px', height: '45px', borderRadius: '8px', objectFit: 'cover' }} />
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                      <span style={{ display: 'block', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.product.name}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                        {item.quantity} x ₹{item.product.price}
                      </span>
                    </div>
                    <span style={{ fontWeight: 700, color: '#4f46e5' }}>
                      ₹{item.product.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                  <span>Items Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                  <span>Shipping Fee</span>
                  <span>₹{shipping}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px dashed #e2e8f0', fontWeight: 800, fontSize: '1.25rem', color: '#0f172a' }}>
                  <span>Total Amount</span>
                  <span style={{ color: '#4f46e5' }}>₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary btn-lg"
                style={{ width: '100%' }}
              >
                {loading ? 'Processing Order...' : 'Place Order Now'}
              </button>
            </div>
          </div>
        </div>
      </form>

      <style>{`
        @media (max-width: 800px) {
          .checkout-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};
