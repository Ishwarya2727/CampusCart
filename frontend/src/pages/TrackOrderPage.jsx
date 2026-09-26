import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, PackageCheck, MapPin, CreditCard } from 'lucide-react';
import { api } from '../services/api';
import { OrderTimeline } from '../components/OrderTimeline';

export const TrackOrderPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const data = await api.get(`/orders/${id}`);
        setOrder(data);
      } catch (err) {
        setError(err.message || 'Order not found or access denied');
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <div className="empty-state">
          <h3 style={{ color: '#ef4444' }}>{error || 'Order Not Found'}</h3>
          <p style={{ margin: '1rem 0' }}>You may not have permission to view this order details.</p>
          <Link to="/orders" className="btn btn-primary">Back to My Orders</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2.5rem 1rem 5rem', maxWidth: '800px' }}>
      <Link to="/orders" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#64748b', marginBottom: '1.5rem' }}>
        <ArrowLeft size={16} /> Back to My Orders
      </Link>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Live Order Tracking</span>
          <h1 style={{ fontSize: '1.8rem', color: '#0f172a' }}>Order #{order._id}</h1>
        </div>
        <span className="badge badge-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
          Current Status: {order.orderStatus}
        </span>
      </div>

      {/* Visual Timeline Card */}
      <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>
          Tracking Progress
        </h3>
        <OrderTimeline currentStatus={order.orderStatus} />
      </div>

      {/* Order Details & Address Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="track-grid">
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#4f46e5', fontWeight: 700 }}>
            <MapPin size={20} />
            <span>Delivery Destination</span>
          </div>
          <p style={{ fontWeight: 700, color: '#0f172a', marginBottom: '0.2rem' }}>{order.shippingAddress.fullName}</p>
          <p style={{ fontSize: '0.9rem', color: '#475569' }}>{order.shippingAddress.address}</p>
          <p style={{ fontSize: '0.9rem', color: '#475569' }}>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.5rem' }}>Phone: {order.shippingAddress.phone}</p>
        </div>

        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#10b981', fontWeight: 700 }}>
            <CreditCard size={20} />
            <span>Payment Info</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '0.4rem' }}>
            Method: <strong>{order.paymentMethod}</strong>
          </p>
          <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '0.4rem' }}>
            Status: <span className={`badge ${order.paymentStatus === 'Paid' ? 'badge-success' : 'badge-warning'}`}>{order.paymentStatus}</span>
          </p>
          <p style={{ fontSize: '1.2rem', fontWeight: 800, color: '#4f46e5', marginTop: '0.75rem' }}>
            Total: ₹{order.totalAmount.toLocaleString('en-IN')}
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .track-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};
