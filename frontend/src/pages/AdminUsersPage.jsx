import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, UserCheck, Mail } from 'lucide-react';
import { api } from '../services/api';

export const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await api.get('/users');
        setUsers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="container" style={{ padding: '2.5rem 1rem 5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4f46e5', fontWeight: 700, fontSize: '0.85rem' }}>
            <ShieldCheck size={16} />
            ADMIN PORTAL
          </div>
          <h1 style={{ fontSize: '2rem', marginTop: '0.2rem' }}>Registered Users</h1>
        </div>
      </div>

      {/* Admin Nav Tabs */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem', overflowX: 'auto' }}>
        <Link to="/admin" style={{ fontWeight: 500, color: '#64748b', paddingBottom: '0.75rem' }}>Overview</Link>
        <Link to="/admin/products" style={{ fontWeight: 500, color: '#64748b', paddingBottom: '0.75rem' }}>Manage Products</Link>
        <Link to="/admin/orders" style={{ fontWeight: 500, color: '#64748b', paddingBottom: '0.75rem' }}>Manage Orders</Link>
        <Link to="/admin/users" style={{ fontWeight: 700, color: '#4f46e5', borderBottom: '2px solid #4f46e5', paddingBottom: '0.75rem' }}>Registered Users</Link>
      </div>

      {loading ? (
        <div className="spinner-container"><div className="spinner"></div></div>
      ) : (
        <div className="card" style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', textTransform: 'uppercase', fontSize: '0.75rem', color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'left' }}>User Name</th>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'left' }}>Email</th>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'left' }}>Phone</th>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'left' }}>Role</th>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'left' }}>Joined Date</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 600, color: '#0f172a' }}>{u.name}</td>
                  <td style={{ padding: '0.85rem 1rem', color: '#475569' }}>{u.email}</td>
                  <td style={{ padding: '0.85rem 1rem', color: '#64748b' }}>{u.phone || 'N/A'}</td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <span className={`badge ${u.role === 'admin' ? 'badge-warning' : 'badge-primary'}`}>
                      {u.role.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: '0.85rem 1rem', color: '#94a3b8', fontSize: '0.85rem' }}>
                    {new Date(u.createdAt).toLocaleDateString()}
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
