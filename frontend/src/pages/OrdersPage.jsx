import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PackageCheck, Truck, ChevronRight } from 'lucide-react';
import { api } from '../services/api';

export const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await api.get('/orders');
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2.5rem 1rem 5rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>My Orders</h1>
        <p style={{ color: '#64748b' }}>View history and track live progress of your campus purchases.</p>
      </div>

      {orders.length === 0 ? (
        <div className="empty-state">
          <PackageCheck size={56} className="empty-state-icon" />
          <h3 className="empty-state-title">No orders found</h3>
          <p className="empty-state-text">You haven't placed any orders on CampusCart yet.</p>
          <Link to="/shop" className="btn btn-primary">Start Shopping</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {orders.map((order) => (
            <div key={order._id} className="card" style={{ padding: '1.5rem' }}>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem',
                borderBottom: '1px solid #e2e8f0',
                paddingBottom: '1rem',
                marginBottom: '1rem'
              }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block' }}>
                    Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                  <span style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '0.95rem', color: '#0f172a' }}>
                    Order #{order._id}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span className={`badge ${order.orderStatus === 'Delivered' ? 'badge-success' : 'badge-primary'}`}>
                    {order.orderStatus}
                  </span>
                  <span style={{ fontWeight: 800, fontSize: '1.15rem', color: '#4f46e5' }}>
                    ₹{order.totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Items Thumbnails */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
                  {order.items.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                      <img src={item.image} alt={item.name} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                      <span style={{ fontWeight: 500 }}>{item.name} (x{item.quantity})</span>
                    </div>
                  ))}
                </div>

                <Link to={`/track-order/${order._id}`} className="btn btn-outline btn-sm">
                  <Truck size={16} /> Track Order
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
