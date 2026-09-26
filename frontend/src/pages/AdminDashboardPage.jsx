import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Package, Users, IndianRupee, ArrowRight, ShieldCheck } from 'lucide-react';
import { api } from '../services/api';

export const AdminDashboardPage = () => {
  const [stats, setStats] = useState({
    productsCount: 0,
    ordersCount: 0,
    usersCount: 0,
    totalSales: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        setLoading(true);
        const [products, orders, users] = await Promise.all([
          api.get('/products'),
          api.get('/orders'),
          api.get('/users')
        ]);

        const sales = orders.reduce((acc, order) => acc + order.totalAmount, 0);

        setStats({
          productsCount: products.length,
          ordersCount: orders.length,
          usersCount: users.length,
          totalSales: sales
        });

        setRecentOrders(orders.slice(0, 5));
      } catch (err) {
        console.error('Failed to load admin stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminStats();
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4f46e5', fontWeight: 700, fontSize: '0.85rem' }}>
            <ShieldCheck size={16} />
            ADMINISTRATOR PORTAL
          </div>
          <h1 style={{ fontSize: '2rem', marginTop: '0.2rem' }}>Dashboard Overview</h1>
        </div>
      </div>

      {/* Admin Nav Tabs */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem', overflowX: 'auto' }}>
        <Link to="/admin" style={{ fontWeight: 700, color: '#4f46e5', borderBottom: '2px solid #4f46e5', paddingBottom: '0.75rem' }}>Overview</Link>
        <Link to="/admin/products" style={{ fontWeight: 500, color: '#64748b', paddingBottom: '0.75rem' }}>Manage Products</Link>
        <Link to="/admin/orders" style={{ fontWeight: 500, color: '#64748b', paddingBottom: '0.75rem' }}>Manage Orders</Link>
        <Link to="/admin/users" style={{ fontWeight: 500, color: '#64748b', paddingBottom: '0.75rem' }}>Registered Users</Link>
      </div>

      {/* Overview Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.5rem',
        marginBottom: '3rem'
      }}>
        {/* Total Sales */}
        <div className="card" style={{ padding: '1.5rem', backgroundColor: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>TOTAL SALES</span>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#eef2ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IndianRupee size={22} />
            </div>
          </div>
          <h2 style={{ fontSize: '1.8rem', color: '#0f172a' }}>₹{stats.totalSales.toLocaleString('en-IN')}</h2>
        </div>

        {/* Total Orders */}
        <div className="card" style={{ padding: '1.5rem', backgroundColor: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>TOTAL ORDERS</span>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#d1fae5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Package size={22} />
            </div>
          </div>
          <h2 style={{ fontSize: '1.8rem', color: '#0f172a' }}>{stats.ordersCount}</h2>
        </div>

        {/* Total Products */}
        <div className="card" style={{ padding: '1.5rem', backgroundColor: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>PRODUCTS IN CATALOG</span>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#fef3c7', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShoppingBag size={22} />
            </div>
          </div>
          <h2 style={{ fontSize: '1.8rem', color: '#0f172a' }}>{stats.productsCount}</h2>
        </div>

        {/* Total Users */}
        <div className="card" style={{ padding: '1.5rem', backgroundColor: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>REGISTERED USERS</span>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#f3e8ff', color: '#9333ea', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={22} />
            </div>
          </div>
          <h2 style={{ fontSize: '1.8rem', color: '#0f172a' }}>{stats.usersCount}</h2>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.2rem' }}>Recent Customer Orders</h3>
          <Link to="/admin/orders" style={{ color: '#4f46e5', fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
            View All Orders <ArrowRight size={16} />
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <p style={{ color: '#64748b', textAlign: 'center', padding: '2rem' }}>No orders placed yet.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', textTransform: 'uppercase', fontSize: '0.75rem', color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left' }}>Order ID</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left' }}>Customer</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left' }}>Total</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((ord) => (
                  <tr key={ord._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '0.85rem 1rem', fontFamily: 'monospace', fontWeight: 600 }}>{ord._id}</td>
                    <td style={{ padding: '0.85rem 1rem' }}>{ord.user?.name || ord.shippingAddress.fullName}</td>
                    <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#4f46e5' }}>₹{ord.totalAmount}</td>
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <span className="badge badge-primary">{ord.orderStatus}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
