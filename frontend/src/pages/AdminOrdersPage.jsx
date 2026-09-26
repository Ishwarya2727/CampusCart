import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';

const STATUS_OPTIONS = [
  'Order Placed',
  'Confirmed',
  'Packed',
  'Shipped',
  'Out for Delivery',
  'Delivered'
];

export const AdminOrdersPage = () => {
  const { showToast } = useCart();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await api.get('/orders');
      setOrders(data);
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status: newStatus });
      showToast(`Order status updated to "${newStatus}"`);
      fetchOrders();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  return (
    <div className="container" style={{ padding: '2.5rem 1rem 5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4f46e5', fontWeight: 700, fontSize: '0.85rem' }}>
            <ShieldCheck size={16} />
            ADMIN PORTAL
          </div>
          <h1 style={{ fontSize: '2rem', marginTop: '0.2rem' }}>Order Management</h1>
        </div>

        <button onClick={fetchOrders} className="btn btn-outline btn-sm">
          <RefreshCw size={16} /> Refresh Orders
        </button>
      </div>

      {/* Admin Nav Tabs */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem', overflowX: 'auto' }}>
        <Link to="/admin" style={{ fontWeight: 500, color: '#64748b', paddingBottom: '0.75rem' }}>Overview</Link>
        <Link to="/admin/products" style={{ fontWeight: 500, color: '#64748b', paddingBottom: '0.75rem' }}>Manage Products</Link>
        <Link to="/admin/orders" style={{ fontWeight: 700, color: '#4f46e5', borderBottom: '2px solid #4f46e5', paddingBottom: '0.75rem' }}>Manage Orders</Link>
        <Link to="/admin/users" style={{ fontWeight: 500, color: '#64748b', paddingBottom: '0.75rem' }}>Registered Users</Link>
      </div>

      {loading ? (
        <div className="spinner-container"><div className="spinner"></div></div>
      ) : orders.length === 0 ? (
        <div className="empty-state">
          <p>No customer orders in database.</p>
        </div>
      ) : (
        <div className="card" style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', textTransform: 'uppercase', fontSize: '0.75rem', color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'left' }}>Order ID</th>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'left' }}>Customer Info</th>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'left' }}>Items</th>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'left' }}>Total</th>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'left' }}>Payment</th>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'left' }}>Update Order Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((ord) => (
                <tr key={ord._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '0.85rem 1rem', fontFamily: 'monospace', fontWeight: 600 }}>
                    <Link to={`/track-order/${ord._id}`} style={{ color: '#4f46e5' }}>
                      {ord._id}
                    </Link>
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <strong style={{ display: 'block', color: '#0f172a' }}>{ord.shippingAddress.fullName}</strong>
                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{ord.shippingAddress.phone}</span>
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    {ord.items.map((it, idx) => (
                      <span key={idx} style={{ display: 'block', fontSize: '0.8rem' }}>
                        {it.name} (x{it.quantity})
                      </span>
                    ))}
                  </td>
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 800, color: '#4f46e5' }}>
                    ₹{ord.totalAmount}
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <span className={`badge ${ord.paymentStatus === 'Paid' ? 'badge-success' : 'badge-warning'}`}>
                      {ord.paymentStatus}
                    </span>
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <select
                      value={ord.orderStatus}
                      onChange={(e) => handleStatusChange(ord._id, e.target.value)}
                      className="form-select"
                      style={{ padding: '0.3rem 0.6rem', fontSize: '0.85rem', fontWeight: 600, width: 'auto' }}
                    >
                      {STATUS_OPTIONS.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
