const API = 'http://localhost:5000/api';

const runVerification = async () => {
  console.log('=== STARTING CAMPUSCART E2E VERIFICATION TEST ===\n');
  let passedCount = 0;
  let failedCount = 0;

  const test = async (name, fn) => {
    try {
      await fn();
      console.log(`✅ [PASS] ${name}`);
      passedCount++;
    } catch (err) {
      console.error(`❌ [FAIL] ${name}: ${err.message}`);
      failedCount++;
    }
  };

  let adminToken = '';
  let userToken = '';
  let sampleProductId = '';
  let createdOrderId = '';
  let createdProductId = '';

  // 1. Health Check
  await test('API Health Check', async () => {
    const res = await fetch(`${API}/health`);
    const data = await res.json();
    if (res.status !== 200 || data.status !== 'OK') throw new Error('Health check failed');
  });

  // 2. Admin Authentication
  await test('Admin Login', async () => {
    const res = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@campuscart.com', password: 'Admin@123' })
    });
    const data = await res.json();
    if (res.status !== 200 || !data.token || data.role !== 'admin') {
      throw new Error(`Admin login failed: ${data.message}`);
    }
    adminToken = data.token;
  });

  // 3. User Authentication
  await test('Student Login', async () => {
    const res = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'student@campuscart.com', password: 'Student@123' })
    });
    const data = await res.json();
    if (res.status !== 200 || !data.token || data.role !== 'user') {
      throw new Error(`Student login failed: ${data.message}`);
    }
    userToken = data.token;
  });

  // 4. Product Catalog Listing
  await test('Product Catalog Fetch (34 items)', async () => {
    const res = await fetch(`${API}/products`);
    const data = await res.json();
    if (res.status !== 200 || !Array.isArray(data) || data.length === 0) {
      throw new Error('Failed to fetch product catalog');
    }
    sampleProductId = data[0]._id;
  });

  // 5. Category & Search Filtering
  await test('Product Search & Filter', async () => {
    const res = await fetch(`${API}/products?category=Stationery&search=Notebook`);
    const data = await res.json();
    if (res.status !== 200 || !Array.isArray(data)) {
      throw new Error('Filtering failed');
    }
  });

  // 6. Cart Addition
  await test('Add Item to Student Cart', async () => {
    const res = await fetch(`${API}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      },
      body: JSON.stringify({ productId: sampleProductId, quantity: 2 })
    });
    const data = await res.json();
    if (res.status !== 200 || !data.items || data.items.length === 0) {
      throw new Error(`Failed to add item to cart: ${data.message}`);
    }
  });

  // 7. Get Cart Summary
  await test('Get Student Cart Summary', async () => {
    const res = await fetch(`${API}/cart`, {
      headers: { 'Authorization': `Bearer ${userToken}` }
    });
    const data = await res.json();
    if (res.status !== 200 || data.items.length === 0) {
      throw new Error('Failed to fetch cart');
    }
  });

  // 8. Order Placement & Stock Deduction
  await test('Place Student Order & Stock Deduction', async () => {
    const orderBody = {
      shippingAddress: {
        fullName: 'Alex Student',
        email: 'student@campuscart.com',
        phone: '9123456789',
        address: 'Room 204, Hostel 4',
        city: 'University City',
        state: 'Delhi',
        pincode: '110007'
      },
      paymentMethod: 'Cash on Delivery'
    };
    const res = await fetch(`${API}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      },
      body: JSON.stringify(orderBody)
    });
    const data = await res.json();
    if (res.status !== 201 || !data._id) {
      throw new Error(`Order placement failed: ${data.message}`);
    }
    createdOrderId = data._id;
  });

  // 9. Fetch Order Details & Visual Tracking
  await test('Fetch Order & Visual Tracking State', async () => {
    const res = await fetch(`${API}/orders/${createdOrderId}`, {
      headers: { 'Authorization': `Bearer ${userToken}` }
    });
    const data = await res.json();
    if (res.status !== 200 || data.orderStatus !== 'Order Placed') {
      throw new Error('Fetch order tracking details failed');
    }
  });

  // 10. Admin Order Status Update
  await test('Admin Update Order Status (Shipped -> Delivered)', async () => {
    const res = await fetch(`${API}/orders/${createdOrderId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`
      },
      body: JSON.stringify({ status: 'Shipped' })
    });
    const data = await res.json();
    if (res.status !== 200 || data.orderStatus !== 'Shipped') {
      throw new Error('Admin status update failed');
    }
  });

  // 11. Role Authorization Protection Test
  await test('Security Guard: Student cannot update order status', async () => {
    const res = await fetch(`${API}/orders/${createdOrderId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      },
      body: JSON.stringify({ status: 'Delivered' })
    });
    if (res.status !== 403) {
      throw new Error(`Security breach: Student received status code ${res.status} instead of 403`);
    }
  });

  // 12. Admin Product Management (Create)
  await test('Admin Product CRUD - Create', async () => {
    const newProduct = {
      name: 'Verification Test Calculator',
      description: 'Scientific calculator for engineering courses.',
      price: 850,
      category: 'Tech & Accessories',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c',
      stock: 15
    };
    const res = await fetch(`${API}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`
      },
      body: JSON.stringify(newProduct)
    });
    const data = await res.json();
    if (res.status !== 201 || !data._id) {
      throw new Error(`Admin product creation failed: ${data.message}`);
    }
    createdProductId = data._id;
  });

  // 13. Admin Product Management (Update)
  await test('Admin Product CRUD - Update', async () => {
    const res = await fetch(`${API}/products/${createdProductId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`
      },
      body: JSON.stringify({ price: 900, stock: 20 })
    });
    const data = await res.json();
    if (res.status !== 200 || data.price !== 900) {
      throw new Error('Admin product update failed');
    }
  });

  // 14. Admin Product Management (Delete)
  await test('Admin Product CRUD - Delete', async () => {
    const res = await fetch(`${API}/products/${createdProductId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${adminToken}`
      }
    });
    const data = await res.json();
    if (res.status !== 200 || data.message !== 'Product deleted successfully') {
      throw new Error('Admin product deletion failed');
    }
  });

  console.log(`\n==================================================`);
  console.log(`VERIFICATION SUMMARY: ${passedCount} PASSED, ${failedCount} FAILED`);
  console.log(`==================================================`);
};

runVerification();
