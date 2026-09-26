import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit3, Trash2, ShieldCheck, Search } from 'lucide-react';
import { api } from '../services/api';
import { Modal } from '../components/Modal';
import { useCart } from '../context/CartContext';

const CATEGORIES = [
  'Stationery',
  'Bags & College Essentials',
  'Tech & Accessories',
  'Campus Wear',
  'Hostel & Lifestyle'
];

export const AdminProductsPage = () => {
  const { showToast } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProductId, setDeletingProductId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Stationery',
    image: '',
    stock: '',
    rating: '4.5'
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await api.get('/products');
      setProducts(data);
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      category: 'Stationery',
      image: '',
      stock: '',
      rating: '4.5'
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,
      stock: product.stock,
      rating: product.rating || 4.5
    });
    setIsModalOpen(true);
  };

  const handleOpenDeleteModal = (id) => {
    setDeletingProductId(id);
    setIsDeleteModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await api.put(`/products/${editingProduct._id}`, formData);
        showToast('Product updated successfully!');
      } else {
        await api.post('/products', formData);
        showToast('New product created successfully!');
      }
      setIsModalOpen(false);
      fetchProducts();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingProductId) return;
    try {
      await api.delete(`/products/${deletingProductId}`);
      showToast('Product deleted successfully');
      setIsDeleteModalOpen(false);
      fetchProducts();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container" style={{ padding: '2.5rem 1rem 5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4f46e5', fontWeight: 700, fontSize: '0.85rem' }}>
            <ShieldCheck size={16} />
            ADMIN PORTAL
          </div>
          <h1 style={{ fontSize: '2rem', marginTop: '0.2rem' }}>Product Inventory</h1>
        </div>

        <button onClick={handleOpenAddModal} className="btn btn-primary">
          <Plus size={18} /> Add New Product
        </button>
      </div>

      {/* Admin Nav Tabs */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem', overflowX: 'auto' }}>
        <Link to="/admin" style={{ fontWeight: 500, color: '#64748b', paddingBottom: '0.75rem' }}>Overview</Link>
        <Link to="/admin/products" style={{ fontWeight: 700, color: '#4f46e5', borderBottom: '2px solid #4f46e5', paddingBottom: '0.75rem' }}>Manage Products</Link>
        <Link to="/admin/orders" style={{ fontWeight: 500, color: '#64748b', paddingBottom: '0.75rem' }}>Manage Orders</Link>
        <Link to="/admin/users" style={{ fontWeight: 500, color: '#64748b', paddingBottom: '0.75rem' }}>Registered Users</Link>
      </div>

      {/* Search Bar */}
      <div className="card" style={{ padding: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ position: 'relative', maxWidth: '400px' }}>
          <input
            type="text"
            placeholder="Search inventory by title or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '2.2rem' }}
          />
          <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="spinner-container"><div className="spinner"></div></div>
      ) : (
        <div className="card" style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', textTransform: 'uppercase', fontSize: '0.75rem', color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'left' }}>Product</th>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'left' }}>Category</th>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'left' }}>Price</th>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'left' }}>Stock</th>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p) => (
                <tr key={p._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '0.85rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img src={p.image} alt={p.name} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                    <span style={{ fontWeight: 600, color: '#0f172a' }}>{p.name}</span>
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}><span className="badge badge-primary">{p.category}</span></td>
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#4f46e5' }}>₹{p.price}</td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <span className={`badge ${p.stock <= 0 ? 'badge-danger' : 'badge-success'}`}>
                      {p.stock} units
                    </span>
                  </td>
                  <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                    <button onClick={() => handleOpenEditModal(p)} style={{ color: '#4f46e5', marginRight: '0.75rem' }} title="Edit">
                      <Edit3 size={18} />
                    </button>
                    <button onClick={() => handleOpenDeleteModal(p._id)} style={{ color: '#ef4444' }} title="Delete">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add / Edit Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingProduct ? 'Edit Product' : 'Add New Product'}>
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label className="form-label">Product Name *</label>
            <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="form-input" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Price (₹) *</label>
              <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Stock Quantity *</label>
              <input type="number" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} required className="form-input" />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Category *</label>
            <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="form-select">
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Image URL *</label>
            <input type="url" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} required className="form-input" placeholder="https://..." />
          </div>

          <div className="form-group">
            <label className="form-label">Description *</label>
            <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required rows={3} className="form-textarea" />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-outline">Cancel</button>
            <button type="submit" className="btn btn-primary">{editingProduct ? 'Save Changes' : 'Create Product'}</button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Confirm Product Deletion">
        <p style={{ marginBottom: '1.5rem', color: '#475569' }}>Are you sure you want to permanently delete this product from the CampusCart inventory?</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button onClick={() => setIsDeleteModalOpen(false)} className="btn btn-outline">Cancel</button>
          <button onClick={handleDeleteConfirm} className="btn btn-danger">Yes, Delete</button>
        </div>
      </Modal>
    </div>
  );
};
