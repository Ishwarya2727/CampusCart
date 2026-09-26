import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, PackageCheck, ArrowRight, Truck } from 'lucide-react';
import { api } from '../services/api';

export const OrderConfirmationPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await api.get(`/orders/${id}`);
        setOrder(data);
      } catch (err) {
        console.error(err);
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

  return (
    <div className="container" style={{ padding: '4rem 1rem 6rem', maxWidth: '650px', textAlign: 'center' }}>
      <div className="card" style={{ padding: '2.5rem 2rem' }}>
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          backgroundColor: '#d1fae5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
          color: '#10b981'
        }}>
          <CheckCircle2 size={48} />
        </div>

        <span className="badge badge-success" style={{ marginBottom: '1rem', padding: '0.4rem 0.85rem' }}>
          Order Successfully Placed
        </span>

        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#0f172a' }}>
          Thank You For Your Order!
        </h1>
        <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
          Your order has been recorded and is currently being processed by the campus hub.
        </p>

        {order && (
          <div style={{
            backgroundColor: '#f8fafc',
            borderRadius: '12px',
            padding: '1.25rem',
            textAlign: 'left',
            marginBottom: '2rem',
            border: '1px solid #e2e8f0',
            fontSize: '0.9rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ color: '#64748b' }}>Order ID:</span>
              <strong style={{ fontFamily: 'monospace', color: '#4f46e5' }}>{order._id}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ color: '#64748b' }}>Payment Method:</span>
              <span>{order.paymentMethod} ({order.paymentStatus})</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ color: '#64748b' }}>Total Paid:</span>
              <strong style={{ color: '#0f172a' }}>₹{order.totalAmount.toLocaleString('en-IN')}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Delivery Address:</span>
              <span style={{ textAlign: 'right', maxWidth: '250px' }}>
                {order.shippingAddress.address}, {order.shippingAddress.city}
              </span>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          <Link to={`/track-order/${id}`} className="btn btn-primary btn-lg">
            <Truck size={20} />
            Track Order Progress
          </Link>
          <Link to="/shop" className="btn btn-outline btn-lg">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};
